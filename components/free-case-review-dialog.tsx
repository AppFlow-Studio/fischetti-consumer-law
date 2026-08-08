"use client"

import { useRef, useState, useEffect, useTransition } from "react"
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
import {
    contactSchema,
    defaultContactValues,
    caseTypes,
    urgencyLevels,
    type ContactFormData,
    type ValidatedContactFormData,
    caseTypeGuidanceMap,
    defaultCaseTypeGuidance,
    UNLISTED_CASE_TYPE,
    UNLISTED_CASE_NOTICE,
    UNLISTED_CASE_ACKNOWLEDGMENT,
    CONTACT_SOURCE_OPTIONS,
    CONTACT_SOURCE_UNKNOWN,
    requiresContactSource,
    isTcpaCaseType,
    getPracticeArea,
} from "@/components/forms/contact-schema"
import { submitContactForm } from "@/lib/actions/contact"
import { Loader2, AlertCircle } from "lucide-react"
import { PRIMARY_PHONE, PRIMARY_PHONE_E164 } from "@/lib/site"
import { getAttributionData } from "@/lib/gclid"
import { DescriptionGuidance } from "@/components/forms/description-guidance"
import { trackLeadFormStart, trackLeadFormSuccess } from "@/components/tracking/tracking-events"
import { clearPendingSubmissionId, getOrCreateSubmissionId } from "@/lib/submission-id"

type FreeCaseReviewDialogProps = {
    children?: React.ReactNode
    defaultOpen?: boolean
    respondToOpenRequest?: boolean
}

export default function FreeCaseReviewDialog({ children, defaultOpen = false, respondToOpenRequest = false }: FreeCaseReviewDialogProps) {
    const [open, setOpen] = useState(defaultOpen)
    const [errorMessage, setErrorMessage] = useState("")
    const [isPending, startTransition] = useTransition()
    const submissionInFlight = useRef(false)
    const { setIsDialogOpen, openDialogRequest, setOpenDialogRequest } = useUIState()
    const router = useRouter()
    const form = useForm<ContactFormData, unknown, ValidatedContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: defaultContactValues
    })

    const watchedCaseType = form.watch("caseType")
    const watchedCallerIdentification = form.watch("callerIdentification")
    const outsidePracticeAcknowledged = form.watch("outsidePracticeAcknowledged")
    const guidance = caseTypeGuidanceMap[watchedCaseType] ?? defaultCaseTypeGuidance
    const isUnlistedCaseType = watchedCaseType === UNLISTED_CASE_TYPE
    const showCallerIdentification = requiresContactSource(watchedCaseType)
    const showContactingCompany = isTcpaCaseType(watchedCaseType)
    const isSubmitDisabled = isPending || (isUnlistedCaseType && !outsidePracticeAcknowledged)

    useEffect(() => {
        setIsDialogOpen(open)
    }, [open, setIsDialogOpen])

    useEffect(() => {
        if (respondToOpenRequest && openDialogRequest) {
            setOpen(true)
            setOpenDialogRequest(false)
        }
    }, [respondToOpenRequest, openDialogRequest, setOpenDialogRequest])

    const onSubmit = async (values: ValidatedContactFormData) => {
        if (submissionInFlight.current) return
        submissionInFlight.current = true
        setErrorMessage("")
        trackLeadFormStart("free_case_review_dialog")

        startTransition(async () => {
            const submissionScope = "free-case-review-dialog"
            const submissionId = getOrCreateSubmissionId(submissionScope)
            try {
                const attribution = getAttributionData()
                const result = await submitContactForm({
                    ...values,
                    ...attribution,
                    form_source: submissionScope,
                    submission_id: submissionId,
                })

                // Handle geo-blocking redirect
                if (result.blocked && result.redirect) {
                    setOpen(false)
                    window.location.href = result.redirect
                    return
                }

                if (!result.success) {
                    submissionInFlight.current = false
                    setErrorMessage(result.message)
                    return
                }
                if (!result.leadId || !result.submissionId) {
                    throw new Error("Successful submission response omitted persisted identifiers")
                }
                await trackLeadFormSuccess("free_case_review_dialog", {
                    leadId: result.leadId,
                    submissionId: result.submissionId,
                    practiceArea: getPracticeArea(values.caseType),
                    enhancedConversion: {
                        email: values.email,
                        phone: values.phone,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        zip: values.zip,
                    },
                })

                clearPendingSubmissionId(submissionScope, submissionId)
                setOpen(false)
                form.reset()

                const lawKey = values.caseType.startsWith("FCRA") ? "fcra"
                    : values.caseType.startsWith("FDCPA") ? "fdcpa"
                    : values.caseType.startsWith("TCPA") ? "tcpa"
                    : "other"
                router.push(`/thank-you?law=${lawKey}`)
            } catch {
                submissionInFlight.current = false
                console.error("Form submission failed")
                setErrorMessage("An unexpected error occurred. Please try again or call us directly.")
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent className="w-[95vw] max-w-lg rounded-2xl border-0 bg-white/95 backdrop-blur-md shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="px-1">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">Free Case Review</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600 mt-1">
                        Tell us about your consumer law issue. We&apos;ll review and reach out within 24 hours. Prefer to talk now? Call <a href={`tel:${PRIMARY_PHONE_E164}`} className="text-blue-600 underline">{PRIMARY_PHONE}</a>.
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
                                        Or call: <a href={`tel:${PRIMARY_PHONE_E164}`} className="font-semibold underline">{PRIMARY_PHONE}</a>
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
                                            className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
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
                                            className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
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
                                        className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
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
                                            placeholder={PRIMARY_PHONE} 
                                            className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
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
                                            className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
                                            maxLength={10}
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        </div>

                        {/* Case Type with law-family tip */}
                        <FormField control={form.control} name="caseType" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Case type *</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            if (value !== UNLISTED_CASE_TYPE) {
                                                form.setValue("outsidePracticeAcknowledged", false, { shouldValidate: true })
                                            }
                                        }}
                                        value={field.value}
                                        disabled={isPending}
                                    >
                                        <SelectTrigger className="data-[size=default]:h-11 sm:data-[size=default]:h-10 w-full text-sm py-2 sm:py-2.5" aria-label="Case type"><SelectValue placeholder="Select case type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {caseTypes.map(ct => (<SelectItem key={ct} value={ct} className="text-sm">{ct}</SelectItem>))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {guidance.caseTypeTip && (
                                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                                        {guidance.caseTypeTip}
                                    </p>
                                )}
                                {isUnlistedCaseType && (
                                    <div className="mt-2 space-y-3">
                                        <div
                                            role="note"
                                            aria-live="polite"
                                            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900"
                                        >
                                            {UNLISTED_CASE_NOTICE}
                                        </div>
                                        <FormField control={form.control} name="outsidePracticeAcknowledged" render={({ field: acknowledgmentField }) => (
                                            <FormItem className="w-full">
                                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white/70 p-3">
                                                    <FormControl>
                                                        <input
                                                            id="outside-practice-acknowledgment-dialog"
                                                            type="checkbox"
                                                            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                            checked={acknowledgmentField.value}
                                                            onChange={(event) => acknowledgmentField.onChange(event.target.checked)}
                                                            onBlur={acknowledgmentField.onBlur}
                                                            name={acknowledgmentField.name}
                                                            ref={acknowledgmentField.ref}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <label
                                                        htmlFor="outside-practice-acknowledgment-dialog"
                                                        className="text-sm leading-relaxed text-gray-700"
                                                    >
                                                        {UNLISTED_CASE_ACKNOWLEDGMENT}
                                                    </label>
                                                </div>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )} />
                                    </div>
                                )}
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="urgency" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Urgency *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                                        <SelectTrigger className="data-[size=default]:h-11 sm:data-[size=default]:h-10 w-full text-sm py-2 sm:py-2.5" aria-label="Urgency"><SelectValue placeholder="Select urgency" /></SelectTrigger>
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

                        {showCallerIdentification && (
                            <FormField control={form.control} name="callerIdentification" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">
                                        Do you know who is calling, texting, or contacting you? *
                                    </FormLabel>
                                    <p className="text-[11px] text-slate-500 leading-snug">
                                        This helps us determine whether there may be a company we can hold accountable. If you are not sure, you can still submit your case.
                                    </p>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value || ""} disabled={isPending}>
                                            <SelectTrigger className="data-[size=default]:h-11 sm:data-[size=default]:h-10 w-full text-sm py-2 sm:py-2.5" aria-label="Caller or company identification">
                                                <SelectValue placeholder="Select the best answer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {CONTACT_SOURCE_OPTIONS.map((option) => (
                                                        <SelectItem key={option} value={option} className="text-sm">
                                                            {option}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    {watchedCallerIdentification === CONTACT_SOURCE_UNKNOWN && (
                                        <p role="note" className="text-[11px] text-slate-500 leading-snug">
                                            Please include any phone numbers, screenshots, voicemails, company names, or messages you have. These details help us review your case.
                                        </p>
                                    )}
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        )}

                        {showContactingCompany && (
                            <FormField control={form.control} name="contactingCompany" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">
                                        Company, caller, or text sender
                                    </FormLabel>
                                    <p className="text-[11px] text-slate-500 leading-snug">
                                        Optional — enter the company or name shown in the call, text, or voicemail if you know it.
                                    </p>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            autoComplete="organization"
                                            maxLength={200}
                                            placeholder="Company or sender name (if known)"
                                            className="h-11 sm:h-10 w-full text-sm py-2 sm:py-2.5"
                                            disabled={isPending}
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        )}

                        {/* Brief Details — dynamic placeholder + animated helper guidance */}
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Briefly describe what happened *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={guidance.placeholder}
                                        className="min-h-[80px] sm:min-h-[110px] w-full resize-y text-sm"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <DescriptionGuidance
                                    helperText={guidance.helperText}
                                    caseTypeKey={watchedCaseType}
                                    charLength={field.value.length}
                                />
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
                                className="h-11 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                                disabled={isSubmitDisabled}
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
