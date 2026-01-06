"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, defaultContactValues, caseTypes, urgencyLevels, type ContactFormData } from "@/components/forms/contact-schema"
import { formatUserDataForGTM } from "@/lib/enhanced-conversions"

type SimpleContactFormProps = {
    onSubmitted?: () => void
    useBlueTheme?: boolean // For white background forms that need blue text
}

export default function SimpleContactForm({ onSubmitted, useBlueTheme = false }: SimpleContactFormProps) {
    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const form = useForm<ContactFormData>({ 
        resolver: zodResolver(contactSchema), 
        defaultValues: defaultContactValues 
    })

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
            // Submit to API
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            // Handle geo-blocking
            if (response.status === 403) {
                const data = await response.json()
                if (data.blocked) {
                    window.location.href = data.redirect || "/unavailable"
                    return
                }
            }

            if (!response.ok) {
                throw new Error("Form submission failed")
            }

            const result = await response.json()
            
            // Format user data for enhanced conversions
            const formattedUserData = formatUserDataForGTM({
                email: values.email,
                phone: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
                zip: values.zip
            })
            
            // Track successful submit with FLAT user keys for GTM DLV compatibility
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || []
                
                // Push lead_form_submit with flat keys and nested user_data
                window.dataLayer.push({
                    event: "lead_form_submit",
                    form_name: "free_case_review",
                    page_path: window.location.pathname,
                    method: "web_form",
                    // Flat keys for GTM DLV mapping
                    user_email: formattedUserData.email,
                    user_phone: formattedUserData.phone_number,
                    user_first_name: formattedUserData.address.first_name,
                    user_last_name: formattedUserData.address.last_name,
                    user_zip: formattedUserData.address.postal_code,
                    // Nested user_data for Google Ads Enhanced Conversions
                    user_data: result.enhancedConversionData || formattedUserData
                })
                
                // Push qualify_lead event (GA4-safe, no PII)
                window.dataLayer.push({
                    event: "qualify_lead",
                    form_name: "free_case_review",
                    page_path: window.location.pathname,
                    method: "web_form",
                    case_type: values.caseType,
                    urgency: values.urgency
                })
            }

            console.log("SimpleContactForm submitted successfully", values)
            setSubmitSuccess(true)
            onSubmitted?.()
            form.reset()
            
            // Reset success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000)
        } catch (error) {
            console.error("Form submission error:", error)
            // You could add error state handling here
        } finally {
            setSubmitting(false)
        }
    }

    // Always use white background styling with mobile optimizations
    const byAgreeClass = useBlueTheme
        ? "text-[11px] sm:text-xs text-gray-600 leading-relaxed"
        : "text-[11px] sm:text-xs text-gray-600 leading-relaxed"

    const labelClass = useBlueTheme
        ? "text-xs sm:text-sm font-semibold text-black"
        : "text-xs sm:text-sm font-semibold text-black"

    const messageClass = "text-xs text-red-600"

    const inputClass = "w-full text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-600 py-2 sm:py-2.5"

    const selectTriggerClass = "w-full text-sm bg-white border-gray-300 text-gray-900 focus:bg-white focus:border-blue-600 py-2 sm:py-2.5"

    const textareaClass = "min-h-[80px] sm:min-h-[120px] w-full resize-y text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-600"


    const privacyLinkClass = useBlueTheme
        ? "text-blue-600 hover:text-blue-700 underline font-medium"
        : "text-blue-600 hover:text-blue-700 underline font-medium"

    if (submitSuccess) {
        return (
            <div className="w-full p-6 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold text-center">
                    Thank you! Your form has been submitted successfully. We&apos;ll get back to you within 24 hours.
                </p>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form id="consultation" onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2.5 sm:space-y-4">
                <div className="grid grid-cols-1 gap-2.5 sm:gap-4 w-full overflow-hidden">
                    {/* First Name and Last Name - Same row on desktop, stacked on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all"
                    disabled={submitting}
                >
                    {submitting ? "Submitting…" : "Submit Free Case Review"}
                </Button>
            </form>
        </Form>
    )
}


