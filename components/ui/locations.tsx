// NO "use client" directive — this is a Server Component wrapper.
// LocationsStatic renders all office addresses in the first-wave HTML (indexed by Googlebot).
// LocationsAnimated handles all Framer Motion animations after hydration.

import LocationsStatic from "./locations-static"
import LocationsAnimated from "./locations-animated"

export default function LocationsSection() {
  return (
    <section className="w-full py-16 scroll-mt-8" id="locations">
      {/* SSR layer: office entities in initial HTML — Googlebot first-wave indexed */}
      <LocationsStatic />
      {/* Client layer: animations, map overlay, interactive pin elements */}
      <LocationsAnimated />
    </section>
  )
}
