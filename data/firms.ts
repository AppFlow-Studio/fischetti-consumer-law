import { SERVE_STATEMENT } from "@/lib/site"

export type Firm = {
    slug: "orlando" | "port-st-lucie" | "boynton-beach"
    cityDisplay: string
    seoCity: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: "FL"
    zip: string
    phone: string
    hoursText: string
    servingText: string
    serviceAreaSummary: string
    primaryServices: string[]
    nearbyAreas: string[]
    description: string
    introBlurb: string
}

export const firms: Firm[] = [
    {
        slug: "orlando",
        cityDisplay: "Orlando",
        seoCity: "Orlando",
        addressLine1: "111 N Orange Ave",
        addressLine2: "suite 800",
        city: "Orlando",
        state: "FL",
        zip: "32801",
        phone: "(833) 645-3247",
        hoursText: "Available 24/7",
        servingText: SERVE_STATEMENT,
        serviceAreaSummary: SERVE_STATEMENT,
        primaryServices: ["FCRA", "FDCPA", "TCPA", "Privacy & Data Breach", "VPPA", "FHA", "Mass Arbitration"],
        nearbyAreas: ["Downtown Orlando", "Winter Park", "Kissimmee", "Lake Nona"],
        description: "Our Orlando office supports clients throughout Central Florida who are dealing with unfair or illegal consumer practices. Whether you are facing credit report inaccuracies, background check errors, debt collection harassment, or unwanted robocalls and text messages, our team can review your case and explain your legal options. We represent Orlando-area clients in consumer protection cases under federal laws such as the Fair Credit Reporting Act (FCRA), Fair Debt Collection Practices Act (FDCPA), Telephone Consumer Protection Act (TCPA), Video Privacy Protection Act (VPPA), and Fair Housing Act (FHA). All consultations are handled remotely for convenience and privacy.",
        introBlurb: "Consumer Law Florida helps Orlando residents fight back against unfair credit reporting, illegal debt collection practices, robocalls and spam texts, privacy violations, and housing discrimination. We serve clients statewide in Florida through phone and video consultations, so you can get legal help without taking time off work or traveling to an office.",
    },
    {
        slug: "port-st-lucie",
        cityDisplay: "Port St. Lucie",
        seoCity: "Port St. Lucie",
        addressLine1: "130 S Indian River Dr",
        addressLine2: "Ste 202",
        city: "Fort Pierce",
        state: "FL",
        zip: "34950",
        phone: "(833) 645-3247",
        hoursText: "Available 24/7",
        servingText: SERVE_STATEMENT,
        serviceAreaSummary: SERVE_STATEMENT,
        primaryServices: ["FCRA", "FDCPA", "TCPA", "Privacy & Data Breach", "VPPA", "FHA", "Mass Arbitration"],
        nearbyAreas: ["Fort Pierce", "Stuart", "Vero Beach", "Jensen Beach"],
        description: "From our Port St. Lucie area office, we assist clients across the Treasure Coast and surrounding regions with consumer rights violations. Many clients contact us after discovering errors on their credit reports, being denied employment due to inaccurate background checks, or receiving persistent robocalls and spam texts. Consumer Law Florida helps Port St. Lucie clients pursue compensation for violations involving credit bureaus, debt collectors, telemarketers, and companies that mishandle personal data. Our statewide practice model allows you to get legal help quickly without unnecessary in-person meetings.",
        introBlurb: "Consumer Law Florida helps Port St. Lucie clients take action when companies violate consumer protection laws—whether that means inaccurate credit reporting, abusive debt collection, unwanted robocalls, privacy violations, or housing discrimination. We work with clients statewide in Florida through phone and video consultations, so getting help is simple and fast.",
    },
    {
        slug: "boynton-beach",
        cityDisplay: "Boynton Beach",
        seoCity: "Boynton Beach",
        addressLine1: "7593 Boynton Beach Blvd",
        addressLine2: "#110",
        city: "Boynton Beach",
        state: "FL",
        zip: "33437",
        phone: "(833) 645-3247",
        hoursText: "Available 24/7",
        servingText: SERVE_STATEMENT,
        serviceAreaSummary: SERVE_STATEMENT,
        primaryServices: ["FCRA", "FDCPA", "TCPA", "Privacy & Data Breach", "VPPA", "FHA", "Mass Arbitration"],
        nearbyAreas: ["Delray Beach", "Boca Raton", "West Palm Beach", "Lake Worth"],
        description: "Our Boynton Beach location supports clients throughout South Florida who need help enforcing their consumer rights. If you are experiencing debt collection harassment, identity theft after a data breach, tracking pixel privacy violations, or housing discrimination, our attorneys can help determine whether you have a valid claim. We represent Boynton Beach clients in individual and mass consumer actions and handle cases entirely through phone and video consultations. This approach allows us to serve clients efficiently while focusing on results.",
        introBlurb: "Consumer Law Florida represents Boynton Beach clients in consumer protection matters involving credit reporting errors, debt collection harassment, robocalls and spam texts, privacy violations, and housing discrimination. We serve clients statewide in Florida through phone and video consultations, making it easy to get answers quickly and take action when your rights are violated.",
    },
]

export const firmsBySlug = new Map(firms.map(f => [f.slug, f]))
