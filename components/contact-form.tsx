"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, Clock, Mail, Phone, User, Shield, FileImage } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState, useEffect, useRef } from "react"
import BookAnAppointmentClient from "./book-an-appointment-client"
// import { sendContactEmail, sendUserEmail } from "@/lib/email/sendcontactemail"
import { motion } from 'framer-motion'
import Link from "next/link"
import { redirect } from "next/navigation"
import { BorderBeam } from "@/components/ui/border-beam";
// import { persistEC, pushEC, pushEvent } from "@/utils/enhancedConversions"
import { formatPhone, validatePhoneNumber, formatPhoneInput } from "@/lib/phone-formatter"

const formSchema = z.object({
    name: z.string().min(2, "name must be at least 2 characters"),
    middleName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string()
        .min(1, "Phone number is required")
        .refine(validatePhoneNumber, {
            message: "Please enter a valid 10-digit American phone number"
        }),
    reason: z.string().min(2),
    bestTime: z.string().min(1, "Please provide more detail about your consultation needs"),
    insuranceCardFront: z.instanceof(File).optional().or(z.null()),
    insuranceCardBack: z.instanceof(File).optional().or(z.null())
})

const TIME_SLOTS = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
]
const services = [
    { id: "service1", name: "Service 1" },
    { id: "service2", name: "Service 2" },
    { id: "service3", name: "Service 3" },
    { id: "service4", name: "Service 4" },
]

interface ContactFormProp {
    backgroundcolor: string
    header?: string
    buttonText?: string
}
export function ContactForm({ backgroundcolor = 'white', header = 'Book an Appointment', buttonText = 'Book an Appointment' }: ContactFormProp) {
    const [openContactForm, setOpenContactForm] = useState(false)
    const [openAppointmentConfirm, setAppointmentConfirm] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            reason: "",
            bestTime: ""
        },
    })

    // Handle scroll indicator visibility
    useEffect(() => {
        if (!openContactForm) {
            return
        }

        // Wait a bit for the form to render
        setTimeout(() => {
            const form = formRef.current

            if (!form) {
                return
            }

            setupScrollDetection(form)
        }, 200)
    }, [openContactForm])

    const setupScrollDetection = (form) => {
        const handleScroll = (event) => {
            const { scrollTop, scrollHeight, clientHeight } = event.target
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
            const hasScrollableContent = scrollHeight > clientHeight

            setShowScrollIndicator(hasScrollableContent && !isAtBottom)
        }

        // Try multiple potential scroll targets
        const targets = [
            form,
            form.parentElement,
            form.closest('[data-radix-scroll-area-viewport]'),
            form.closest('.overflow-y-auto'),
            document.querySelector('[data-radix-scroll-area-viewport]'),
            document.querySelector('.overflow-y-auto')
        ].filter(Boolean)

        targets.forEach(target => {
            if (target) {
                target.addEventListener('scroll', handleScroll)
            }
        })

        // Check initial state
        setTimeout(() => {
            const { scrollTop, scrollHeight, clientHeight } = form
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
            const hasScrollableContent = scrollHeight > clientHeight
            setShowScrollIndicator(hasScrollableContent && !isAtBottom)
        }, 100)

        return () => {
            targets.forEach(target => {
                if (target) {
                    target.removeEventListener('scroll', handleScroll)
                }
            })
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setDisabled(true)
        if (values.middleName && values.middleName !== '') {
            return
        }
        // Handle file uploads - create FormData for files
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('reason', values.reason)
        formData.append('bestTime', values.bestTime)

        // Add insurance card files if they exist
        if (values.insuranceCardFront) {
            formData.append('insuranceCardFront', values.insuranceCardFront)
        }
        if (values.insuranceCardBack) {
            formData.append('insuranceCardBack', values.insuranceCardBack)
        }

        // Log the files for debugging
        console.log('Insurance Card Front:', values.insuranceCardFront)
        console.log('Insurance Card Back:', values.insuranceCardBack)

        // const data = await sendContactEmail({
        //     name: values.name,
        //     email: values.email,
        //     phone: values.phone,
        //     reason: values.reason,
        //     bestTime: values.bestTime,
        //     insuranceCardFront: values.insuranceCardFront || undefined,
        //     insuranceCardBack: values.insuranceCardBack || undefined
        // })
        // await sendUserEmail({ name: values.name, email: values.email, phone: values.phone })

        // // Enhanced Conversions
        // persistEC({ email: values.email, phone: values.phone, firstName: values.name, lastName: '' });
        // pushEC({ email: values.email, phone: values.phone, firstName: values.name, lastName: '' });
        // pushEvent('lead_form_submit', { form_name: 'ContactForm' });

        setDisabled(false)
        // if (data) {
        //     setOpenContactForm(false)
        //     //setAppointmentConfirm(true) 
        //     redirect('/thank-you')
        //     form.reset()
        //     setDisabled(false)
        // }
    }

    return (
        <div className="relative w-full p-4 rounded-3xl overflow-hidden ">
            {/* SVG Filter Definition */}
            <svg style={{ display: 'none' }}>
                <filter id="displacementFilter">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.01"
                        numOctaves="2"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="500"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            {/* Liquid Glass Background */}
            <div
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                style={{
                    filter: 'drop-shadow(-8px -10px 46px #0000005f)',
                    backdropFilter: 'brightness(1.1) blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
            >
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Form {...form}>
                    <form className="sm:space-y-8 space-y-4">
                        {/* Contact Fields */}
                        <div className="w-full flex flex-col sm:space-y-6 space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1">
                                {header && <h2
                                    style={{
                                        fontFamily: 'var(--font-public-sans)',
                                        fontWeight: 500,
                                    }}
                                    className='text-white text-2xl'>
                                    {header}
                                </h2>}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-white font-semibold ">
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-white sm:text-md text-sm'
                                                >
                                                    Name
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className=" flex  ">
                                                    <Input placeholder="Name" startIcon={User} className="sm:h-12 h-10 text-lg border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* HONEYPOT FIELD - Hidden from users but visible to bots */}
                                <FormField
                                    control={form.control}
                                    name="middleName"
                                    render={({ field }) => (
                                        <FormItem className="hidden-honeypot">
                                            <FormLabel>Middle Name (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your middle name"
                                                    {...field}
                                                    tabIndex={-1}
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-white sm:text-md text-sm'
                                            >
                                                Email
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className=" flex  ">
                                                <Input placeholder="Example@gmail.com" startIcon={Mail} className="sm:h-12 h-10 text-lg  border-[#DCDEE1] bg-[#FAFAFA]" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-white sm:text-md text-sm'
                                            >
                                                Phone Number
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className=" flex  ">
                                                <Input
                                                    placeholder="(123) 456-7890"
                                                    startIcon={Phone}
                                                    className="sm:h-12 h-10 text-lg  border-[#DCDEE1] bg-[#FAFAFA]"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const formatted = formatPhoneInput(e.target.value);
                                                        field.onChange(formatted);
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bestTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-public-sans)',
                                                    fontWeight: 500,
                                                }}
                                                className='text-white sm:text-md text-sm'
                                            >
                                                Best Time To Contact
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value} >
                                                <SelectTrigger
                                                    className="w-full !sm:h-12 h-10 px-6 bg-[#f0f5ff]  border rounded-sm"
                                                >
                                                    <SelectValue placeholder="Select Best Time To Contact" className=" font-[var(--font-inter)] sm:h-12 h-10 text-lg data-[placeholder]:text-red-500" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {["As Soon As Possible", "Morning", "Afternoon", "Evening"].map((service) => (
                                                            <SelectItem key={service} value={service}>
                                                                {service}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full self-center flex items-center justify-center" onClick={() => setOpenContactForm(true)}><BookAnAppointmentClient buttonText={buttonText} /></div>

                        <Dialog open={openContactForm} onOpenChange={() => setOpenContactForm(false)}>
                            <DialogContent className="rounded-[20px] max-h-[90vh] sm:min-w-3xl overflow-hidden flex flex-col" >
                                <DialogTitle>Book Your Appointment</DialogTitle>
                                <Form {...form}>
                                    <form
                                        ref={formRef}
                                        className="sm:space-y-6 space-y-2 p-1 overflow-y-auto flex-1 pr-2 relative"
                                        onSubmit={form.handleSubmit(onSubmit, () => { console.log('error') })}
                                    >
                                        <div className="w-full  space-y-6"
                                        >

                                            {/* Name Fields */}
                                            <div className="grid grid-cols-1  gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="name"

                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm text-white font-semibold ">Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Name" startIcon={User} className="h-10 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>

                                            {/* Contact Fields */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                <span
                                                                    style={{
                                                                        fontFamily: 'var(--font-public-sans)',
                                                                        fontWeight: 500,
                                                                    }}
                                                                    className='text-white sm:text-md text-sm'
                                                                >
                                                                    Email Address
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter your email" startIcon={Mail} className="h-10 text-lg border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                <span
                                                                    style={{
                                                                        fontFamily: 'var(--font-public-sans)',
                                                                        fontWeight: 500,
                                                                    }}
                                                                    className='text-white sm:text-md text-sm'
                                                                >
                                                                    Phone Number
                                                                </span>

                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="(123) 456-7890"
                                                                    startIcon={Phone}
                                                                    className="h-10 text-lg  border-[#DCDEE1] bg-[#FAFAFA]"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        const formatted = formatPhoneInput(e.target.value);
                                                                        field.onChange(formatted);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="bestTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            <span
                                                                style={{
                                                                    fontFamily: 'var(--font-public-sans)',
                                                                    fontWeight: 500,
                                                                }}
                                                                className='text-white sm:text-md text-sm'
                                                            >
                                                                Best Time To Contact
                                                            </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} value={field.value} >
                                                                <SelectTrigger
                                                                    className="w-full h-10 px-6 bg-[#f0f5ff]  border rounded-sm"
                                                                >
                                                                    <SelectValue placeholder="Select Best Time To Contact" className=" font-[var(--font-inter)] h-10 text-lg data-[placeholder]:text-red-500" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {["As Soon As Possible", "Morning", "Afternoon", "Evening"].map((service) => (
                                                                            <SelectItem key={service} value={service}>
                                                                                {service}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            {/* Reason Field */}
                                            <FormField
                                                control={form.control}
                                                name="reason"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm text-white font-semibold">Consultation Reason</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Consultation Reason" className="min-h-[200px] text-lg resize-none  border-[#DCDEE1]  bg-[#FAFAFA]" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Insurance Card Upload Section */}
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Shield className="h-5 w-5 text-green-600" />
                                                    <span className="text-sm font-medium text-green-700">HIPAA Compliant & Secure</span>
                                                </div>

                                                <div className='flex md:flex-row flex-col sm:gap-x-4 gap-y-4'>
                                                    {/* Front of Insurance Card */}
                                                    <FormField
                                                        control={form.control}
                                                        name="insuranceCardFront"
                                                        render={({ field: { onChange, value, ...field } }) => (
                                                            <FormItem className='sm:w-1/2 w-full'>
                                                                <FormLabel className="text-sm text-white font-semibold">
                                                                    Front of Insurance Card
                                                                    <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*,.pdf"
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0] || null;
                                                                                onChange(file);
                                                                            }}
                                                                            className="hidden"
                                                                            id="insurance-front-doctor"
                                                                            {...field}
                                                                        />
                                                                        <label
                                                                            htmlFor="insurance-front-doctor"
                                                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                                                                        >
                                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                <FileImage className="w-8 h-8 mb-2 text-white" />
                                                                                <p className="mb-2 text-sm text-white">
                                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                                </p>
                                                                                <p className="text-xs text-white">PNG, JPG, PDF (MAX. 10MB)</p>
                                                                                {value && (
                                                                                    <p className="text-xs text-green-600 mt-1 font-medium">
                                                                                        ✓ {value.name}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {/* Back of Insurance Card */}
                                                    <FormField
                                                        control={form.control}
                                                        name="insuranceCardBack"
                                                        render={({ field: { onChange, value, ...field } }) => (
                                                            <FormItem className='sm:w-1/2 w-full'>
                                                                <FormLabel className="text-sm text-white font-semibold">
                                                                    Back of Insurance Card
                                                                    <span className="text-xs text-gray-500 font-normal ml-1">(Optional)</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*,.pdf"
                                                                            onChange={(e) => {
                                                                                const file = e.target.files?.[0] || null;
                                                                                onChange(file);
                                                                            }}
                                                                            className="hidden"
                                                                            id="insurance-back-doctor"
                                                                            {...field}
                                                                        />
                                                                        <label
                                                                            htmlFor="insurance-back-doctor"
                                                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DCDEE1] rounded-lg cursor-pointer bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                                                                        >
                                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                                <FileImage className="w-8 h-8 mb-2 text-white" />
                                                                                <p className="mb-2 text-sm text-white">
                                                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                                                </p>
                                                                                <p className="text-xs text-white">PNG, JPG, PDF (MAX. 10MB)</p>
                                                                                {value && (
                                                                                    <p className="text-xs text-green-600 mt-1 font-medium">
                                                                                        ✓ {value.name}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* HIPAA Compliance Notice */}
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                    <div className="flex items-start gap-3">
                                                        <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <div className="text-sm">
                                                            <p className="font-medium text-green-800 mb-1">Your information is secure and protected</p>
                                                            <p className="text-green-700">
                                                                All uploaded documents are encrypted and stored securely in compliance with HIPAA regulations.
                                                                Your personal health information is protected and will only be used for your medical care.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="w-full self-center flex items-center justify-center"
                                                disabled={disabled}
                                                onClick={
                                                    form.handleSubmit(onSubmit, () => { console.log('error') })
                                                }
                                            >
                                                {disabled ? (
                                                    <div className="max-h-[56px] group h-full px-[32px] py-[16px] hover:bg-[#252932] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-not-allowed">
                                                        <span className="text-white">Sending...</span>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    </div>
                                                ) : (
                                                    <BookAnAppointmentClient />
                                                )}
                                            </button>

                                            <div>
                                                <p
                                                    style={{
                                                        fontFamily: 'var(--font-public-sans)',
                                                        fontWeight: 500,
                                                    }}
                                                    className='text-white sm:text-md text-sm'
                                                >By submitting, you agree to our <Link href="/privacy-policy" className="text-[#2358AC] underline">privacy policy and disclaimer.</Link> Someone from our team may contact you via phone, email and/or text.</p>
                                            </div>

                                            {/* Scroll indicator - only show when not at bottom */}
                                            <div className={`fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-50 transition-opacity duration-300 ${showScrollIndicator ? 'opacity-100' : 'opacity-0'}`}>
                                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                                    <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                                                        <span>Scroll for more</span>
                                                        <ChevronDown className="w-4 h-4 animate-bounce" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </div>
            <BorderBeam duration={8} size={200} borderWidth={2} colorFrom="#0A50EC" colorTo="#ffffff" />
            <Dialog open={openAppointmentConfirm} onOpenChange={() => setAppointmentConfirm(!openAppointmentConfirm)} >
                <DialogContent className=" rounded-[20px] p-[32px] " >
                    <DialogTitle>

                    </DialogTitle>
                    <div className="bg-white flex flex-col space-y-[20px] items-center justify-center">
                        <div className=" relative h-[100px] self-center flex w-full">

                            <motion.div className="z-1 relative justify-center items-center flex w-full"
                                animate={{
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
                                    <circle opacity="0.1" cx="54" cy="54" r="54" fill="#4CC2FF" />
                                </svg>
                                <motion.div className=" absolute top-1.5 z-2"
                                    animate={{
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
                                        <circle opacity="0.2" cx="43" cy="43" r="43" fill="#4CC2FF" />
                                    </svg>
                                </motion.div>
                                <motion.div className=" absolute top-4.5 z-3 "
                                    animate={{
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                                        <circle cx="32" cy="32" r="32" fill="#4CC2FF" />
                                    </svg>
                                </motion.div>
                                <motion.div className="absolute top-9.5 z-4"
                                    animate={{
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1194 0.95737C11.4704 0.416553 10.5277 0.416554 9.87875 0.957371L7.72754 2.75005L4.49907 2.75005C3.53258 2.75005 2.74908 3.53355 2.74907 4.50005L2.74907 7.72851L0.956394 9.87973C0.415578 10.5287 0.415577 11.4714 0.956394 12.1204L2.74907 14.2716L2.74908 17.5001C2.74908 18.4666 3.53258 19.2501 4.49908 19.2501L7.72754 19.25L9.87875 21.0427C10.5277 21.5835 11.4704 21.5835 12.1194 21.0427L14.2706 19.25H17.4991C18.4656 19.25 19.2491 18.4665 19.2491 17.5L19.2491 14.2716L21.0417 12.1204C21.5826 11.4714 21.5826 10.5287 21.0418 9.87973L19.2491 7.72851L19.2491 4.50005C19.2491 3.53355 18.4656 2.75005 17.4991 2.75005L14.2706 2.75005L12.1194 0.95737ZM14.4611 9.38694C14.9509 9.13182 15.1412 8.52792 14.8861 8.03809C14.6309 7.54826 14.027 7.35799 13.5372 7.61311C12.1092 8.35684 10.9442 9.7806 10.1744 10.9032C10.1078 11.0004 10.0434 11.0964 9.98137 11.1907C9.84153 11.4033 9.71366 11.6073 9.59878 11.7971C9.51302 11.7245 9.42957 11.6575 9.35034 11.5963C9.32499 11.5767 9.30008 11.5577 9.27566 11.5393C9.06035 11.3772 8.86673 11.2494 8.72532 11.1612C8.65433 11.1169 8.59572 11.0821 8.55316 11.0575C8.53187 11.0451 8.51453 11.0353 8.50161 11.0281L8.48557 11.0191L8.48012 11.0161L8.47806 11.015L8.47644 11.0141C7.99113 10.7505 7.38401 10.9303 7.1204 11.4156C6.85685 11.9008 7.03677 12.5079 7.52183 12.7716L7.52391 12.7728L7.55058 12.788C7.576 12.8028 7.61582 12.8263 7.6667 12.8581C7.76905 12.9219 7.91292 13.0168 8.07261 13.1371C8.40619 13.3882 8.74611 13.7036 8.9523 14.0319C9.14601 14.3403 9.4921 14.519 9.85574 14.4984C10.2193 14.4778 10.543 14.2609 10.7007 13.9328L10.7032 13.9276L10.7159 13.9018C10.7276 13.878 10.746 13.8413 10.7707 13.7932C10.8202 13.6969 10.8947 13.5553 10.992 13.3804C11.187 13.0294 11.4706 12.5494 11.8239 12.0343C12.5541 10.9694 13.489 9.89321 14.4611 9.38694Z" fill="#FAFAFA" />
                                    </svg>
                                </motion.div>
                            </motion.div>

                        </div>

                        <div className=" flex flex-col space-y-[10px] items-center justify-center">
                            <h3
                                style={{
                                    fontFamily: 'var(--font-public-sans)',
                                    fontWeight: 500,
                                }}
                                className='text-[black] text-2xl'
                            >
                                Your Appointment Request Is Confirmed
                            </h3>
                            <p
                                style={{
                                    fontFamily: 'var(--font-public-sans)',
                                    fontWeight: 500,
                                }}
                                className='text-white sm:text-md text-sm text-center'
                            >
                                You're one step closer to pain relief and improved mobility!<br />
                                Please check your email for details. Our team will contact you shortly.<br />
                                Thank you for choosing Mountain Spine & Orthopedic Center!
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                setAppointmentConfirm(false)
                            }}
                            className=" max-h-[56px] h-full px-[32px] py-[16px] rounded-[62px] relative flex bg-[#0A50EC] text-white text-[14px] font-semibold w-full justify-center items-center hover:cursor-pointer"
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-public-sans)",
                                    fontWeight: 500, fontSize: "16px",
                                    lineHeight: "24px",
                                    letterSpacing: "0.02em"
                                }}
                            >Done</span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* CSS for honeypot field */}
            <style jsx global>{`
                .hidden-honeypot {
                    position: absolute !important;
                    left: -9999px !important;
                    width: 1px !important;
                    height: 1px !important;
                    overflow: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
            `}</style>
        </div>
    )
}