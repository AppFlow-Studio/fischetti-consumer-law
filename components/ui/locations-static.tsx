// NO "use client" directive — this is a Server Component.
// All office addresses are rendered in the first-wave HTML response.
// Googlebot indexes every address, phone number, and hours entry on the first crawl.
// NOTE: officeSchemas JSON-LD is already injected in layout.tsx — do NOT re-inject here.

import { officeLocations } from "@/data/office-locations"

export default function LocationsStatic() {
  return (
    // sr-only block gives Googlebot address entities in the first-wave HTML.
    // aria-hidden="false" keeps it accessible; no heading tag to avoid duplicate H2.
    <div className="sr-only" aria-hidden="false">
      <p>Our Florida Offices</p>
      {officeLocations.map((location) => (
        <address key={location.name}>
          <strong>{location.name}</strong>
          <br />
          {location.address}
          <br />
          <a href={`tel:${location.phone.replace(/\D/g, "")}`}>{location.phone}</a>
          <br />
          Hours: {location.hours}
        </address>
      ))}
    </div>
  )
}
