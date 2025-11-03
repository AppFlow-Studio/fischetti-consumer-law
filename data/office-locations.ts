export type OfficeLocation = {
    name: string
    address: string
    phone: string
    hours: string
    isMain?: boolean
    lat: number
    lng: number
}

export const officeLocations: OfficeLocation[] = [
    {
        name: "Orlando",
        address: "111 N Orange Ave suite 800, Orlando, FL 32801",
        phone: "(833) 645-3247",
        hours: "24 Hours",
        lat: 28.5438,
        lng: -81.378768,
    },
    {
        name: "Port St. Lucie",
        address: "130 S Indian River Dr Ste 202, Fort Pierce, FL 34950",
        phone: "(833) 645-3247",
        hours: "24 Hours",
        lat: 27.448077,
        lng: -80.322843,
    },
    {
        name: "Boynton Beach",
        address: "7593 Boynton Beach Blvd #110, Boynton Beach, FL 33437",
        phone: "(833) 645-3247",
        hours: "24 Hours",
        isMain: true,
        lat: 26.527281,
        lng: -80.100683,
    },
]


