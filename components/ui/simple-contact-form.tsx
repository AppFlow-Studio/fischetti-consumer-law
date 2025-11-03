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

type SimpleContactFormProps = {
    onSubmitted?: () => void
}

export default function SimpleContactForm({ onSubmitted }: SimpleContactFormProps) {
    const [submitting, setSubmitting] = useState(false)
    const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: defaultContactValues })

    async function onSubmit(values: ContactFormData) {
        setSubmitting(true)
        try {
            console.log("SimpleContactForm submitted", values)
            onSubmitted?.()
            form.reset()
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                <div className="grid grid-cols-1 gap-3 w-full overflow-hidden">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem className="w-full ">
                            <FormControl>
                                <Input
                                    placeholder="First name"
                                    aria-label="First name"
                                    className="w-full text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    placeholder="Last name"
                                    aria-label="Last name"
                                    className="w-full text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    className="w-full text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    type="tel"
                                    placeholder="Phone"
                                    aria-label="Phone"
                                    className="w-full text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="caseType" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="text-xs sm:text-sm text-gray-700 font-medium">Case type *</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full text-sm">
                                        <SelectValue placeholder="Select case type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {caseTypes.map(ct => (
                                                <SelectItem key={ct} value={ct} className="text-sm">{ct}</SelectItem>
                                            ))}
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
                                    <SelectTrigger className="w-full text-sm">
                                        <SelectValue placeholder="Select urgency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {urgencyLevels.map(u => (
                                                <SelectItem key={u} value={u} className="text-sm">{u}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Brief details"
                                    className="min-h-[80px] sm:min-h-[100px] w-full resize-y text-sm"
                                    aria-label="Brief details"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )} />
                </div>
                <div className="text-xs text-gray-600 leading-relaxed">
                    By submitting, you agree to our{" "}
                    <a href="/privacy-policy" className="text-blue-600 hover:underline">privacy policy</a>{" "}
                    and{" "}
                    <a href="/terms-of-service" className="text-blue-600 hover:underline">disclaimer</a>.
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                    disabled={submitting}
                >
                    {submitting ? "Submitting…" : "Submit"}
                </Button>
            </form>
        </Form>
    )
}


