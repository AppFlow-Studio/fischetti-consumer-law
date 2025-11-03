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
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Scale, Trophy, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

import { contactSchema, type ContactFormData, caseTypes, urgencyLevels, defaultContactValues } from "@/components/forms/contact-schema"
import { ShineBorder } from "./shine-border"

export default function ContactFormSection() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: defaultContactValues
    })

    const onSubmit = (data: ContactFormData) => {
        console.log("Form submitted:", data)
        setIsSubmitted(true)
        // Here you would typically send the data to your backend
    }

    if (isSubmitted) {
        return (
            <section className="w-full bg-linear-to-br from-blue-50 to-teal-50 py-20">
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
        <section className="w-full bg-linear-to-br from-blue-50 to-teal-50 py-20">
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side - Information */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8 w-full"
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
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <CheckCircle className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Consultation</h3>
                                    <p className="text-gray-600">
                                        No upfront costs. We only get paid when you win your case.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <Scale className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Legal Team</h3>
                                    <p className="text-gray-600">
                                        Over 20 years of experience fighting consumer rights violations.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <Trophy className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h3>
                                    <p className="text-gray-600">
                                        $30M+ recovered for clients across Florida.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                    <Users className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">15,000+ Cases Served</h3>
                                    <p className="text-gray-600">
                                        Trusted by thousands of clients statewide.
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
                                    <span>(833) 645-3247</span>
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
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm w-full">
                            <ShineBorder shineColor={["#2563eb", "#3b82f6", "#60a5fa"]} />

                            <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
                                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Tell Us About Your Case
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base text-gray-600 mt-2">
                                    All information is confidential and protected by attorney-client privilege
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-4 sm:px-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                        {/* Name Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel className="text-sm font-medium">First Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="John" className="w-full" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel className="text-sm font-medium">Last Name *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Doe" className="w-full" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Contact Fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel className="text-sm font-medium">Email *</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="john@example.com" className="w-full" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel className="text-sm font-medium">Phone *</FormLabel>
                                                        <FormControl>
                                                            <Input type="tel" placeholder="(833) 645-3247" className="w-full" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Case Type */}
                                        <FormField
                                            control={form.control}
                                            name="caseType"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel className="text-sm font-medium">Type of Case *</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            {...field}
                                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                        >
                                                            <option value="">Select a case type</option>
                                                            {caseTypes.map((type) => (
                                                                <option key={type} value={type}>
                                                                    {type}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Urgency */}
                                        <FormField
                                            control={form.control}
                                            name="urgency"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel className="text-sm font-medium">How urgent is your case? *</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            {...field}
                                                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                        >
                                                            <option value="">Select urgency level</option>
                                                            {urgencyLevels.map((level) => (
                                                                <option key={level} value={level}>
                                                                    {level}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Description */}
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel className="text-sm font-medium">Case Details *</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Please describe your situation in detail. Include dates, companies involved, and any documentation you have..."
                                                            className="w-full min-h-[100px] sm:min-h-[120px] resize-y"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Terms Agreement */}
                                        <FormField
                                            control={form.control}
                                            name="agreeToTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                                    <FormControl>
                                                        <input
                                                            type="checkbox"
                                                            checked={field.value}
                                                            onChange={field.onChange}
                                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none flex-1">
                                                        <FormLabel className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                                                            I agree to the{" "}
                                                            <a href="/terms-of-service" className="text-blue-600 hover:underline">
                                                                Terms of Service
                                                            </a>{" "}
                                                            and{" "}
                                                            <a href="/privacy-policy" className="text-blue-600 hover:underline">
                                                                Privacy Policy
                                                            </a>
                                                        </FormLabel>
                                                        <FormMessage className="text-xs" />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02]"
                                        >
                                            <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
