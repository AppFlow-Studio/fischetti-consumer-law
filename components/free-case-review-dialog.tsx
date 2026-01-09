"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useUIState } from "@/providers/ui-state-provider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, defaultContactValues, caseTypes, urgencyLevels, type ContactFormData } from "@/components/forms/contact-schema"
import { submitContactForm } from "@/lib/actions/contact"
import { Loader2, AlertCircle } from "lucide-react"
import { formatUserDataForGTM } from "@/lib/enhanced-conversions"

type FreeCaseReviewDialogProps = {
    children: React.ReactNode
    defaultOpen?: boolean
}

export default function FreeCaseReviewDialog({ children, defaultOpen = false }: FreeCaseReviewDialogProps) {
    const [open, setOpen] = useState(defaultOpen)
    const [errorMessage, setErrorMessage] = useState("")
    const [isPending, startTransition] = useTransition()
    const { setIsDialogOpen } = useUIState()
    const router = useRouter()
    const form = useForm<ContactFormData>({ 
        resolver: zodResolver(contactSchema), 
        defaultValues: defaultContactValues 
    })

    useEffect(() => {
        setIsDialogOpen(open)
    }, [open, setIsDialogOpen])

    const onSubmit = async (values: ContactFormData) => {
        setErrorMessage("")
        // Track form attempt
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: "lead_form_attempt",
                form_name: "free_case_review_dialog",
                page_path: window.location.pathname,
                method: "web_form"
            })
        }
        
        startTransition(async () => {
            try {
                const result = await submitContactForm(values)

                // Handle geo-blocking redirect
                if (result.blocked && result.redirect) {
                    setOpen(false)
                    window.location.href = result.redirect
                    return
                }

                if (!result.success) {
                    setErrorMessage(result.message)
                    return
                }
                // const result = await response.json()
            
            // Format user data for enhanced conversions
            const formattedUserData = formatUserDataForGTM({
                email: values.email,
                phone: values.phone,
                firstName: values.firstName,
                lastName: values.lastName,
                zip: values.zip
            })
            
            // Track successful submit with FLAT user keys for GTM DLV compatibility
            // Plus nested user_data for Google Ads Enhanced Conversions
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || []
                
                // Push lead_form_submit with both flat keys and nested user_data
                window.dataLayer.push({
                    event: "lead_form_submit",
                    form_name: "free_case_review_dialog",
                    page_path: window.location.pathname,
                    method: "web_form",
                    // Flat keys for typical GTM DLV mapping
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
                    form_name: "free_case_review_dialog",
                    page_path: window.location.pathname,
                    method: "web_form",
                    case_type: values.caseType,
                    urgency: values.urgency
                })
            }

                setOpen(false)
                form.reset()
                
                // Redirect to thank you page
                router.push(`/thank-you?name=${encodeURIComponent(values.firstName)}`)
            } catch (error) {
                console.error("Form submission error:", error)
                setErrorMessage("An unexpected error occurred. Please try again or call us directly.")}
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-lg rounded-2xl border-0 bg-white/95 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="px-1">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">Free Case Review</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600 mt-1">
                        Tell us about your consumer law issue. We&apos;ll review and reach out within 24 hours. Prefer to talk now? Call <a href="tel:8336453247" className="text-blue-600 underline">(833) 645-3247</a>.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4 px-1">
                        
                        {/* Error Banner */}
                        {errorMessage && (
                            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-red-800 font-medium text-xs">{errorMessage}</p>
                                    <p className="text-red-600 text-xs mt-0.5">
                                        Or call: <a href="tel:8336453247" className="font-semibold underline">(833) 645-3247</a>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">First name *</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Jane" 
                                            className="w-full text-sm py-2 sm:py-2.5" 
                                            disabled={isPending}
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="lastName" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Last name *</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Doe" 
                                            className="w-full text-sm py-2 sm:py-2.5" 
                                            disabled={isPending}
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        </div>

                        {/* Email Field - Full Width */}
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Email *</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        placeholder="jane@example.com" 
                                        className="w-full text-sm py-2 sm:py-2.5" 
                                        disabled={isPending}
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        {/* Phone and ZIP Code - Same row on desktop, stacked on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Phone *</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="tel" 
                                            placeholder="(833) 645-3247" 
                                            className="w-full text-sm py-2 sm:py-2.5" 
                                            disabled={isPending}
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="zip" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">ZIP Code *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="12345 or 12345-6789"
                                            className="w-full text-sm py-2 sm:py-2.5"
                                            maxLength={10}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="caseType" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Case type *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                                        <SelectTrigger className="w-full text-sm py-2 sm:py-2.5"><SelectValue placeholder="Select case type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {caseTypes.map(ct => (<SelectItem key={ct} value={ct} className="text-sm">{ct}</SelectItem>))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="urgency" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Urgency *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                                        <SelectTrigger className="w-full text-sm py-2 sm:py-2.5"><SelectValue placeholder="Select urgency" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {urgencyLevels.map(u => (<SelectItem key={u} value={u} className="text-sm">{u}</SelectItem>))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Brief details *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe what happened in a few sentences…"
                                        className="min-h-[80px] sm:min-h-[110px] w-full resize-y text-sm"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">Minimum 10 characters</span>
                                    <span className={`text-xs ${field.value.length >= 10 ? 'text-gray-500' : 'text-amber-600'}`}>
                                        {field.value.length}/10
                                    </span>
                                </div>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        <DialogFooter className="mt-4 sm:mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                className="w-full sm:w-auto order-2 sm:order-1"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </span>
                                ) : (
                                    "Request Free Review"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
