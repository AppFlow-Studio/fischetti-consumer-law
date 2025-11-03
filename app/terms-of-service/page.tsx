import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Scale, AlertCircle, CheckCircle, Mail, Gavel } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | Fischetti Law Group",
    description: "Terms of Service for Fischetti Law Group. Please read our terms and conditions before using our services.",
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                        <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-4">
                        Terms of Service
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
                            Welcome to Fischetti Law Group. These Terms of Service ("Terms") govern your access to and use of
                            our website and legal services. By accessing or using our website, you agree to be bound by these Terms.
                            If you do not agree to these Terms, please do not use our services.
                        </p>
                    </section>

                    {/* Acceptance of Terms */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Acceptance of Terms
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                By accessing this website, you acknowledge that you have read, understood, and agree to be bound by
                                these Terms of Service and our Privacy Policy. These Terms constitute a legally binding agreement
                                between you and Fischetti Law Group.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                If you do not agree with any part of these Terms, you must not use our website or services.
                            </p>
                        </div>
                    </section>

                    {/* Legal Services */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Scale className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Legal Services and Attorney-Client Relationship
                            </h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Attorney-Client Relationship</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    The information on this website is for general informational purposes only and does not constitute
                                    legal advice. Use of this website or communication with us through this website does not create an
                                    attorney-client relationship. An attorney-client relationship is formed only through a written
                                    engagement agreement signed by both parties.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Evaluation</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Free case consultations and evaluations are provided for informational purposes only. We make no
                                    guarantees or representations about the outcome of any case. Each case is unique, and results depend
                                    on specific facts and circumstances.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Guarantee of Results</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Past results do not guarantee future outcomes. Any testimonials or case results shown on this website
                                    are based on specific facts and circumstances and should not be construed as a guarantee of similar
                                    results in your case.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Use of Website */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Gavel className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Use of Website
                            </h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900">Permitted Use</h3>
                            <p className="text-gray-700 leading-relaxed">
                                You may use our website for lawful purposes only. You agree not to:
                            </p>
                            <ul className="mt-3 space-y-2 list-disc list-inside text-gray-700">
                                <li>Use the website in any way that violates applicable laws or regulations</li>
                                <li>Transmit any harmful, malicious, or unlawful content</li>
                                <li>Attempt to gain unauthorized access to our systems or networks</li>
                                <li>Interfere with or disrupt the website's operation or security</li>
                                <li>Use automated systems to scrape or harvest information without permission</li>
                                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            </ul>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Intellectual Property Rights
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            All content on this website, including text, graphics, logos, images, and software, is the property
                            of Fischetti Law Group or its content suppliers and is protected by United States and international
                            copyright, trademark, and other intellectual property laws.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            You may not reproduce, distribute, modify, create derivative works, publicly display, or otherwise use
                            any content from this website without our prior written consent.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Disclaimer of Warranties
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                THIS WEBSITE AND ALL INFORMATION, CONTENT, AND SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF
                                ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
                                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                We do not warrant that the website will be uninterrupted, secure, or error-free, or that any defects
                                will be corrected. We make no warranties regarding the accuracy, completeness, or reliability of any
                                information on this website.
                            </p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Limitation of Liability
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, FISCHETTI LAW GROUP SHALL NOT BE LIABLE FOR ANY INDIRECT,
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
                            INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                            RESULTING FROM:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>Your use or inability to use the website</li>
                            <li>Any unauthorized access to or use of our servers or data</li>
                            <li>Any interruption or cessation of transmission to or from the website</li>
                            <li>Any bugs, viruses, or other harmful code transmitted through the website</li>
                        </ul>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Indemnification
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Fischetti Law Group, its attorneys, employees, and
                            agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses
                            (including reasonable attorney fees) arising from your use of the website or violation of these Terms.
                        </p>
                    </section>

                    {/* Fees and Payment */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Fees and Payment Terms
                        </h2>
                        <div className="space-y-3 text-gray-700 leading-relaxed">
                            <p>
                                <strong>No Win, No Fee:</strong> Many of our cases are handled on a contingency fee basis, meaning
                                we only receive payment if we successfully recover compensation for you. Specific fee arrangements
                                will be detailed in your written engagement agreement.
                            </p>
                            <p>
                                <strong>Costs and Expenses:</strong> While we may work on a contingency basis, clients may be
                                responsible for certain costs and expenses regardless of case outcome. All fee arrangements will
                                be clearly explained and documented before representation begins.
                            </p>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Governing Law and Jurisdiction
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the State of Florida,
                            without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of
                            this website shall be subject to the exclusive jurisdiction of the state and federal courts located in
                            Florida.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Changes to Terms
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify these Terms at any time. We will notify you of any material changes by
                            posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the
                            website after any changes constitutes acceptance of the modified Terms.
                        </p>
                    </section>

                    {/* Severability */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Severability
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining
                            provisions shall continue in full force and effect.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions About These Terms?</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    If you have any questions about these Terms of Service, please contact us:
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

