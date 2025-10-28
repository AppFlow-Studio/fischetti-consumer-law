"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const contactSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    caseType: z.string().min(1, "Please select a case type"),
    description: z.string().min(10, "Please provide more details about your case"),
    urgency: z.string().min(1, "Please select urgency level"),
    agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms")
})

type ContactFormData = z.infer<typeof contactSchema>

const caseTypes = [
    "FCRA Violations",
    "FDCPA Defense",
    "TCPA Violations",
    "Privacy & Data Breach",
    "VPPA Violations",
    "Fair Housing Act",
    "Mass Arbitration",
    "Other"
]

const urgencyLevels = [
    "Immediate - Need help now",
    "Urgent - Within a week",
    "Moderate - Within a month",
    "Not urgent - Just exploring options"
]

export default function ContactFormSection() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            caseType: "",
            description: "",
            urgency: "",
            agreeToTerms: false
        }
    })

    const onSubmit = (data: ContactFormData) => {
        console.log("Form submitted:", data)
        setIsSubmitted(true)
        // Here you would typically send the data to your backend
    }

    if (isSubmitted) {
        return (
            <section className="w-full bg-gradient-to-br from-blue-50 to-teal-50 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Thank You for Reaching Out!
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We've received your case details and will contact you within 24 hours.
                            Our team is reviewing your information to provide the best possible assistance.
                        </p>
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                        >
                            Submit Another Case
                        </Button>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full bg-gradient-to-br from-blue-50 to-teal-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side - Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Get Your <span className="text-blue-600">Free Case Review</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Don't let unfair business practices go unpunished. Our experienced team
                                is ready to fight for your rights and recover what you're owed.
                            </p>
                        </div>

                        {/* Trust Indicators */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-green-600 font-bold text-lg">✓</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Consultation</h3>
                                    <p className="text-gray-600">
                                        No upfront costs. We only get paid when you win your case.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 font-bold text-lg">⚖️</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Legal Team</h3>
                                    <p className="text-gray-600">
                                        Over 20 years of experience fighting consumer rights violations.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-purple-600 font-bold text-lg">🏆</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h3>
                                    <p className="text-gray-600">
                                        $30M+ recovered for clients across Florida.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <span>(305) 555-0123</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <span>info@fischettilaw.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <span>Miami, FL</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                    <span>Available 24/7</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader className="text-center pb-6">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Tell Us About Your Case
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    All information is confidential and protected by attorney-client privilege
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Contact Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email *</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="john@example.com" {...field} />
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
                                                        <FormLabel>Phone *</FormLabel>
                                                        <FormControl>
                                                            <Input type="tel" placeholder="(305) 555-0123" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Case Type */}
                                        <FormField
                                            control={form.control}
                                            name="caseType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type of Case *</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        >
                                                            <option value="">Select a case type</option>
                                                            {caseTypes.map((type) => (
                                                                <option key={type} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Urgency */}
                                        <FormField
                                            control={form.control}
                                            name="urgency"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>How urgent is your case? *</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            {...field}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        >
                                                            <option value="">Select urgency level</option>
                                                            {urgencyLevels.map((level) => (
                                                                <option key={level} value={level}>
                                                                    {level}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Description */}
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Case Details *</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Please describe your situation in detail. Include dates, companies involved, and any documentation you have..."
                                                            className="min-h-[120px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Terms Agreement */}
                                        <FormField
                                            control={form.control}
                                            name="agreeToTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <input
                                                            type="checkbox"
                                                            checked={field.value}
                                                            onChange={field.onChange}
                                                            className="mt-1"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-sm text-gray-600">
                                                            I agree to the{" "}
                                                            <a href="#terms" className="text-blue-600 hover:underline">
                                                                Terms of Service
                                                            </a>{" "}
                                                            and{" "}
                                                            <a href="#privacy" className="text-blue-600 hover:underline">
                                                                Privacy Policy
                                                            </a>
                                                        </FormLabel>
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                                        >
                                            <Send className="w-5 h-5 mr-2" />
                                            Get Free Case Review
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
