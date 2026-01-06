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
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Scale, Trophy, Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

import { contactSchema, type ContactFormData, caseTypes, urgencyLevels, defaultContactValues } from "@/components/forms/contact-schema"
import { ShineBorder } from "./shine-border"
import SimpleContactForm from "./simple-contact-form"
import { BorderBeam } from "./border-beam"

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
                            We&apos;ve received your case details and will contact you within 24 hours.
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
                                Don&apos;t let unfair business practices go unpunished. Our experienced team
                                is ready to fight for your rights and recover what you&apos;re owed.
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
                                    <span>7593 Boynton Beach Blvd, Suite 110, Boynton Beach, FL <span className="text-gray-400 text-sm">(Main Office)</span></span>
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
                        className="w-full relative"
                    >
                        <div className="shadow-2xl w-full relative rounded-2xl  ">
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
                                        scale="200"
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
                                    backdropFilter: 'brightness(1.1) blur(2px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-3xl"
                                    style={{
                                        boxShadow: 'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)',
                                    }}
                                />
                            </div>

                            <div className="relative z-20 rounded-2xl p-6 md:p-8 bg-linear-to-br from-teal-50 to-blue-50">
                                <BorderBeam colorFrom="#2563eb" colorTo="#3b82f6" duration={20} className="rounded-2xl" />

                                <div className="flex items-center gap-3 mb-4 bg-transparent">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Free Case Review</h2>
                                        <p className="text-sm text-gray-600">Get started in minutes</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Tell us about your situation. Our experienced consumer law attorneys will review your case at no cost. <strong className="text-white">No fees unless we win.</strong>
                                </p>

                                <SimpleContactForm />

                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        <span>Prefer to talk? Call <a href="tel:8336453247" className="text-blue-600 hover:underline font-semibold">(833) 645-3247</a></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
