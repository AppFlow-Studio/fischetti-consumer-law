import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | Fischetti Law Group",
    description: "Privacy Policy for Fischetti Law Group. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-8">
                    {/* Introduction */}
                    <section className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            At Fischetti Law Group, we are committed to protecting your privacy and personal information.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                            visit our website, use our services, or communicate with us.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Information We Collect
                            </h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We may collect personal information that you voluntarily provide when you:
                                </p>
                                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                                    <li>Request a free case consultation or legal review</li>
                                    <li>Contact us via phone, email, or contact forms</li>
                                    <li>Subscribe to our newsletter or updates</li>
                                    <li>Complete online forms on our website</li>
                                </ul>
                                <p className="mt-3 text-gray-700 leading-relaxed">
                                    This information may include your name, email address, phone number, mailing address,
                                    case details, and any other information you choose to provide.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    When you visit our website, we may automatically collect certain information about your device,
                                    including:
                                </p>
                                <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                                    <li>IP address and browser type</li>
                                    <li>Pages visited and time spent on pages</li>
                                    <li>Referring website addresses</li>
                                    <li>Device and operating system information</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                How We Use Your Information
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <ul className="space-y-3 list-disc list-inside text-gray-700">
                                <li>To provide, maintain, and improve our legal services</li>
                                <li>To respond to your inquiries and provide case consultations</li>
                                <li>To send you information about our services, updates, and legal resources</li>
                                <li>To comply with legal obligations and protect our legal rights</li>
                                <li>To analyze website usage and improve user experience</li>
                                <li>To prevent fraud and ensure website security</li>
                            </ul>
                        </div>
                    </section>

                    {/* Information Sharing */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Information Sharing and Disclosure
                            </h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your
                                information only in the following circumstances:
                            </p>
                            <ul className="space-y-3 list-disc list-inside text-gray-700">
                                <li>
                                    <strong>Service Providers:</strong> We may share information with trusted service providers
                                    who assist us in operating our website and conducting our business, provided they agree to
                                    keep your information confidential.
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> We may disclose your information if required by law,
                                    court order, or government regulation, or to protect our rights and safety.
                                </li>
                                <li>
                                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                                    your information may be transferred as part of that transaction.
                                </li>
                                <li>
                                    <strong>With Your Consent:</strong> We may share your information with your explicit consent
                                    or at your direction.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Data Security
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal
                            information against unauthorized access, alteration, disclosure, or destruction. However, no method
                            of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Your Privacy Rights
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Depending on your location, you may have certain rights regarding your personal information, including:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>The right to access and receive a copy of your personal information</li>
                            <li>The right to rectify inaccurate or incomplete information</li>
                            <li>The right to request deletion of your personal information</li>
                            <li>The right to object to processing of your personal information</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent at any time</li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Cookies and Tracking Technologies
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies and similar tracking technologies to collect and store information about your preferences
                            and website activity. You can control cookie preferences through your browser settings, though this may
                            affect website functionality.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Children's Privacy
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect
                            personal information from children. If you believe we have collected information from a child,
                            please contact us immediately.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Changes to This Privacy Policy
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes
                            by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage
                            you to review this Privacy Policy periodically.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    If you have questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Fischetti Law Group</strong></p>
                                    <p>Email: <a href="mailto:info@fischettilaw.com" className="text-blue-600 hover:underline">info@fischettilaw.com</a></p>
                                    <p>Phone: <a href="tel:8336453247" className="text-blue-600 hover:underline">(833) 645-3247</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

