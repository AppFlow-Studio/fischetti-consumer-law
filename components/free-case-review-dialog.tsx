"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, defaultContactValues, caseTypes, urgencyLevels, type ContactFormData } from "@/components/forms/contact-schema"

type FreeCaseReviewDialogProps = {
    children: React.ReactNode
    defaultOpen?: boolean
}

export default function FreeCaseReviewDialog({ children, defaultOpen = false }: FreeCaseReviewDialogProps) {
    const [open, setOpen] = useState(defaultOpen)
    const [submitting, setSubmitting] = useState(false)
    const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: defaultContactValues })

    const onSubmit = async (values: ContactFormData) => {
        setSubmitting(true)
        try {
            console.log("Free Case Review:", values)
            setTimeout(() => setOpen(false), 300)
            form.reset()
        } finally {
            setSubmitting(false)
        }
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
                        Tell us about your consumer law issue. We'll review and reach out within 24 hours. Prefer to talk now? Call <a href="tel:8336453247" className="text-blue-600 underline">(833) 645-3247</a>.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 px-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">First name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jane" className="w-full text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="lastName" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Last name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" className="w-full text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Email *</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="jane@example.com" className="w-full text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Phone *</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="(833) 645-3247" className="w-full text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="caseType" render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Case type *</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full text-sm"><SelectValue placeholder="Select case type" /></SelectTrigger>
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
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full text-sm"><SelectValue placeholder="Select urgency" /></SelectTrigger>
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
                                        className="min-h-[90px] sm:min-h-[110px] w-full resize-y text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )} />

                        <DialogFooter className="mt-4 sm:mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                className="w-full sm:w-auto order-2 sm:order-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2"
                                disabled={submitting}
                            >
                                {submitting ? "Submitting…" : "Request Free Review"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}


