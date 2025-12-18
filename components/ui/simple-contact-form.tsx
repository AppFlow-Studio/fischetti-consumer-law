"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, defaultContactValues, caseTypes, urgencyLevels, type ContactFormData } from "@/components/forms/contact-schema"
import { pushEnhancedConversion } from "@/lib/enhanced-conversions"

type SimpleContactFormProps = {
    onSubmitted?: () => void
    darkMode?: boolean
    useBlueTheme?: boolean // For white background forms that need blue text
}

export default function SimpleContactForm({ onSubmitted, darkMode = false, useBlueTheme = false }: SimpleContactFormProps) {
    const [submitting, setSubmitting] = useState(false)
    const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: defaultContactValues })

    async function onSubmit(values: ContactFormData) {
        setSubmitting(true)
        
        // Track form attempt
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: "lead_form_attempt",
                form_name: "free_case_review",
                page_path: window.location.pathname,
                method: "web_form"
            })
        }
        
        try {
            console.log("SimpleContactForm submitted", values)
            onSubmitted?.()
            form.reset()
            
            // Track successful submit with enhanced conversions
            pushEnhancedConversion("free_case_review", {
                email: values.email,
                phone: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
                zip: values.zip
            })
        } finally {
            setSubmitting(false)
        }
    }

    const byAgreeClass = darkMode
        ? "text-xs text-black/80 leading-relaxed"
        : useBlueTheme
        ? "text-xs text-gray-600 leading-relaxed"
        : "text-xs text-gray-200 leading-relaxed"

    const labelClass = darkMode
        ? "text-sm font-semibold text-black"
        : useBlueTheme
        ? "text-sm font-semibold text-black"
        : "text-sm font-semibold text-gray-200"

    const messageClass = darkMode
        ? "text-xs text-red-300"
        : "text-xs text-red-600"

    const inputClass = darkMode
        ? "w-full text-sm bg-white/95 border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-400"
        : "w-full text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-600"

    const selectTriggerClass = darkMode
        ? "w-full text-sm bg-white/95 border-white/20 text-gray-900 focus:bg-white focus:border-blue-400"
        : "w-full text-sm bg-white border-gray-300 text-gray-900 focus:bg-white focus:border-blue-600"

    const textareaClass = darkMode
        ? "min-h-[100px] sm:min-h-[120px] w-full resize-y text-sm bg-white/95 border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-400"
        : "min-h-[100px] sm:min-h-[120px] w-full resize-y text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-600"

    const privacyTextClass = darkMode
        ? "text-xs text-white/80 leading-relaxed"
        : useBlueTheme
        ? "text-xs text-gray-600 leading-relaxed"
        : "text-xs text-gray-200 leading-relaxed"

    const privacyLinkClass = darkMode
        ? "text-blue-600 hover:text-blue-200 underline font-medium"
        : useBlueTheme
        ? "text-blue-600 hover:text-blue-700 underline font-medium"
        : "text-blue-300 hover:text-blue-700 underline font-medium"

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <div className="grid grid-cols-1 gap-4 w-full overflow-hidden">
                    {/* First Name and Last Name - Same row on desktop, stacked on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>First name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Jane"
                                        aria-label="First name"
                                        className={inputClass}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>Last name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Doe"
                                        aria-label="Last name"
                                        className={inputClass}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                    </div>
                    
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className={labelClass}>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    aria-label="Email"
                                    className={inputClass}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className={messageClass} />
                        </FormItem>
                    )} />
                    {/* Phone and ZIP Code - Same row on desktop, stacked on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>Phone *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        aria-label="Phone"
                                        className={inputClass}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="zip" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>ZIP Code *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="12345 or 12345-6789"
                                        aria-label="ZIP Code"
                                        className={inputClass}
                                        maxLength={10}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="caseType" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>Case type *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={selectTriggerClass}>
                                            <SelectValue placeholder="Select case type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                {caseTypes.map(ct => (
                                                    <SelectItem key={ct} value={ct} className="text-sm">{ct}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="urgency" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelClass}>Urgency *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={selectTriggerClass}>
                                            <SelectValue placeholder="Select urgency" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                {urgencyLevels.map(u => (
                                                    <SelectItem key={u} value={u} className="text-sm">{u}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className={messageClass} />
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className={labelClass}>Brief details *</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your situation in a few sentences..."
                                    className={textareaClass}
                                    aria-label="Brief details"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className={messageClass} />
                        </FormItem>
                    )} />
                </div>
                <div className={byAgreeClass}>
                    By submitting, you agree to our{" "}
                    <a href="/privacy-policy" className={privacyLinkClass}>privacy policy</a>{" "}
                    and{" "}
                    <a href="/terms-of-service" className={privacyLinkClass}>disclaimer</a>.
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base py-3 shadow-lg hover:shadow-xl transition-all"
                    disabled={submitting}
                >
                    {submitting ? "Submitting…" : "Submit Free Case Review"}
                </Button>
            </form>
        </Form>
    )
}


