import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Scale, FileWarning, Info, Gavel, Mail } from "lucide-react";
import { SITE_NAME, SITE_URL, PRIMARY_PHONE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
    title: "Legal Disclaimer | Consumer Law Florida",
    description: "Legal disclaimer for Consumer Law Florida. Important information about our website content and consumer protection legal services.",
    pathname: "/legal-disclaimer",
    type: "website",
});

export default function LegalDisclaimerPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                        <AlertTriangle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-[--font-playfair-display] text-gray-900 mb-4">
                        Legal Disclaimer
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
                            The information contained on this website is provided for general informational purposes only and should not
                            be construed as legal advice. Please read this disclaimer carefully before using this website or relying on
                            any information provided herein.
                        </p>
                    </section>

                    {/* No Attorney-Client Relationship */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Scale className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                No Attorney-Client Relationship
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                The use of this website, including the submission of contact forms or emails, does not create an
                                attorney-client relationship between you and Fischetti Law Group. An attorney-client relationship is
                                established only through a written engagement agreement signed by both parties.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Any information you submit through this website may not be treated as confidential or privileged until
                                such time as an attorney-client relationship has been formally established. Please do not send us any
                                confidential information until we have confirmed in writing that we represent you.
                            </p>
                        </div>
                    </section>

                    {/* Not Legal Advice */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileWarning className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Not Legal Advice
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                The content on this website, including articles, case results, testimonials, and other information, is
                                provided for general informational purposes only and does not constitute legal advice. Legal advice must
                                be tailored to the specific circumstances of each case, and laws vary by jurisdiction.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You should not act or refrain from acting on the basis of any information contained on this website
                                without first seeking appropriate legal or other professional advice. If you have a specific legal
                                question or need legal representation, please contact us directly to schedule a consultation.
                            </p>
                        </div>
                    </section>

                    {/* No Guarantee of Results */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                No Guarantee of Results
                            </h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                Past results do not guarantee future outcomes. Each case is unique and depends on its specific facts,
                                circumstances, and applicable law. The outcome of your case will depend on many factors, including the
                                specific facts of your situation, the applicable law, and the decisions of courts, juries, or
                                arbitrators.
                            </p>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Results and Testimonials</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Any case results, testimonials, or endorsements displayed on this website are based on specific
                                    facts and circumstances and should not be construed as a guarantee, warranty, or prediction
                                    regarding the outcome of your case. Results may vary and are not typical for all cases.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Consultations</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Free consultations are provided for informational purposes only and do not guarantee that we
                                    will take your case or that we will achieve any particular result. We reserve the right to
                                    decline representation for any reason.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Jurisdiction and Licensing */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Gavel className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Jurisdiction and Licensing
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Fischetti Law Group is licensed to practice law in the State of Florida. Our attorneys are not
                                licensed to practice law in any other state unless specifically stated. We do not seek to represent
                                anyone in any jurisdiction where this website does not comply with applicable laws and ethical rules.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                This website is not intended to solicit clients for matters outside of Florida, though we may work
                                with co-counsel or refer cases to qualified attorneys in other jurisdictions when appropriate.
                            </p>
                        </div>
                    </section>

                    {/* Advertising Disclaimer */}
                    <section>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Info className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900">
                                Advertising Disclaimer
                            </h2>
                        </div>
                        <div className="ml-14 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                This website may be considered attorney advertising in some jurisdictions. The hiring of an attorney
                                is an important decision that should not be based solely upon advertisements, website content, or
                                testimonials.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Before making your choice of attorney, you should give this matter careful thought. The selection
                                of an attorney is an important decision. Free background information about our attorneys is available
                                upon request.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Prior results do not guarantee a similar outcome.</strong> The results obtained in any case
                                depend on a variety of factors unique to that case, and past results do not predict or guarantee
                                future success.
                            </p>
                        </div>
                    </section>

                    {/* Statute of Limitations */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Statute of Limitations
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Important: There are strict time limits (called "statutes of limitations") that apply to legal claims.
                            If you fail to file a lawsuit or take other required action within the applicable statute of limitations
                            period, you may lose your right to pursue your claim forever.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Do not delay in seeking legal advice. The statute of limitations varies depending on the type of claim
                            and other factors. Contact us immediately if you believe you may have a legal claim to ensure you do not
                            miss any applicable deadlines.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Third-Party Links and Resources
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            This website may contain links to third-party websites or resources. These links are provided for your
                            convenience only. We do not endorse, and are not responsible for, the content, products, services, or
                            privacy practices of any third-party websites. Your use of third-party websites is at your own risk.
                        </p>
                    </section>

                    {/* Accuracy of Information */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Accuracy of Information
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            While we strive to keep the information on this website accurate and up-to-date, we make no
                            representations or warranties of any kind, express or implied, about the completeness, accuracy,
                            reliability, suitability, or availability of the information contained on this website. The law
                            changes frequently, and information on this website may become outdated.
                        </p>
                    </section>

                    {/* No Warranties */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            No Warranties
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            THIS WEBSITE AND ALL INFORMATION, CONTENT, AND MATERIALS ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
                            KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>Warranties of merchantability or fitness for a particular purpose</li>
                            <li>Warranties that the website will be uninterrupted, secure, or error-free</li>
                            <li>Warranties regarding the accuracy, completeness, or reliability of any information</li>
                            <li>Warranties that any defects will be corrected</li>
                        </ul>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Limitation of Liability
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, FISCHETTI LAW GROUP SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT,
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                            <li>Your use of or inability to use this website</li>
                            <li>Any errors or omissions in the content of this website</li>
                            <li>Any reliance on information contained on this website</li>
                            <li>Any unauthorized access to or use of our servers or data</li>
                            <li>Any interruption or cessation of transmission to or from the website</li>
                        </ul>
                    </section>

                    {/* Changes to Disclaimer */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-[--font-playfair-display] text-gray-900 mb-4">
                            Changes to This Disclaimer
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify this Legal Disclaimer at any time. We will notify you of any material
                            changes by posting the updated disclaimer on this page and updating the "Last updated" date. Your continued
                            use of this website after any changes constitutes acceptance of the modified disclaimer.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-start gap-4">
                            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Questions About This Disclaimer?</h2>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    If you have questions about this Legal Disclaimer or need legal advice, please contact us:
                                </p>
                                <div className="space-y-2 text-gray-700">
                                    <p><strong>Fischetti Law Group</strong></p>
                                    <p>Email: <a href="mailto:info@consumerlawflorida.com" className="text-blue-600 hover:underline">info@consumerlawflorida.com</a></p>
                                    <p>Phone: <a href={`tel:${PRIMARY_PHONE.replace(/\D/g, "")}`} className="text-blue-600 hover:underline">{PRIMARY_PHONE}</a></p>
                                    <p className="text-sm text-gray-600 mt-3">
                                        <strong>Important:</strong> Please do not send confidential information via email until
                                        we have confirmed in writing that we represent you.
                                    </p>
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

