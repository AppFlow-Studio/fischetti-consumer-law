"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, defaultContactValues, caseTypes, urgencyLevels, type ContactFormData } from "@/components/forms/contact-schema"
import { submitContactForm } from "@/lib/actions/contact"
import { Loader2, AlertCircle } from "lucide-react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { formatUserDataForGTM } from "@/lib/enhanced-conversions"
import { getAttributionData } from "@/lib/gclid"

type SimpleContactFormProps = {
    onSubmitted?: () => void
    useBlueTheme?: boolean // For white background forms that need blue text
    id?: string // Added new id prop
}

type FormStatus = "idle" | "submitting" | "success" | "error"

export default function SimpleContactForm({ onSubmitted, useBlueTheme = false, id = "case-review-form" }: SimpleContactFormProps) {
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    const [submitting, setSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const form = useForm<ContactFormData>({ 
        resolver: zodResolver(contactSchema), 
        defaultValues: defaultContactValues 
    })

    const isSubmitting = status === "submitting" || isPending

    async function onSubmit(values: ContactFormData) {
        setStatus("submitting")
        setErrorMessage("")
        
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
        
        startTransition(async () => {
            try {
                const attribution = getAttributionData()
                const result = await submitContactForm({
                    ...values,
                    ...attribution,
                    form_source: "free-case-review",
                })

                // Handle geo-blocking redirect
                if (result.blocked && result.redirect) {
                    window.location.href = result.redirect
                    return
                }

                if (!result.success) {
                    setStatus("error")
                    setErrorMessage(result.message)
                    return
                }
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
                    user_data: result?.enhancedConversionData || formattedUserData
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
                onSubmitted?.()
                form.reset()
                
                // Redirect to thank you page with optional name personalization
                router.push(`/thank-you?name=${encodeURIComponent(values.firstName)}`)
            } catch (error) {
                console.error("Form submission error:", error)
                setStatus("error")
                setErrorMessage("An unexpected error occurred. Please try again or call us directly.")
        }
        })
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

    // if (submitSuccess) {
    //     return (
    //         <div className="w-full p-6 bg-green-50 border border-green-200 rounded-xl">
    //             <p className="text-green-800 font-semibold text-center">
    //                 Thank you! Your form has been submitted successfully. We&apos;ll get back to you within 24 hours.
    //             </p>
    //         </div>
    //     )
    // }

    return (
        <Form {...form}>
            <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2.5 sm:space-y-4">
                {/* Error Banner */}
                {status === "error" && errorMessage && (
                    <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-red-800 font-medium text-sm">{errorMessage}</p>
                            <p className="text-red-600 text-xs mt-1">
                                Or call us directly:{" "}
                                <a href={`tel:${PRIMARY_PHONE_E164}`} className="font-semibold underline">{PRIMARY_PHONE}</a>
                            </p>
                        </div>
                    </div>
                )}

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
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                    disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
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
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
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
                                    disabled={isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">Minimum 10 characters</span>
                                <span className={`text-xs ${field.value.length >= 10 ? 'text-gray-500' : 'text-amber-600'}`}>
                                    {field.value.length}/10
                                </span>
                            </div>
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </span>
                    ) : (
                        "Submit Free Case Review"
                    )}
                </Button>
            </form>
        </Form>
    )
}
