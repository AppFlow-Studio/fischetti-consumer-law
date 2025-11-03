'use client'

//Map component Component from library
import React, { useState, useCallback, useEffect, useRef } from 'react';
// Make sure to import MarkerF and useLoadScript if needed
import { GoogleMap, Libraries, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { officeLocations } from '@/data/office-locations';
import Link from 'next/link';
//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '680px',
    borderRadius: '24px',
};
const defaultMapZoom = 8
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true
};


// Assume icons are defined here or imported. IMPORTANT: Accessing window.google requires the library to be loaded.

export default function officeLocationsMap({ startingClinic }: {
    startingClinic?: { id: number, name: string, lat: number, lng: number, address: string },
}) {
    // Load Google Maps API
    const libraries: Libraries = ['places', 'drawing', 'geometry', 'marker'];
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
        libraries: libraries,
    });
    // Optional: State to hold map instance
    const [map, setMap] = useState(null);
    // No selection state – overlays always visible as part of marker icons
    const [selectedClinc, setSeletecedClinic] = useState<{ id: number, name: string, lat: number, lng: number, address: string } | undefined>(undefined)

    const [mapCenter, setMapCenter] = useState(startingClinic ? { lat: startingClinic.lat, lng: startingClinic.lng } : { lat: 27.448077, lng: -80.322843 })
    const isInitialMount = useRef(true); // <-- Add this ref, initially true
    useEffect(() => {
        if (startingClinic) {
            setSeletecedClinic(startingClinic)
            setMapCenter({ lat: startingClinic.lat, lng: startingClinic.lng })
        }
    }, [startingClinic])
    const onLoad = useCallback(function callback(mapInstance) {
        // You can save the map instance if you need to interact with it
        setMap(mapInstance);
        // Example: Adjust bounds to fit markers after load (optional)
        // const bounds = new window.google.maps.LatLngBounds();
        // officeLocations.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        // mapInstance.fitBounds(bounds);
    }, []);

    const onUnmount = useCallback(function callback(mapInstance) {
        setMap(null);
    }, []);

    // Cache for generated selected icons to avoid recalculating SVG/URI/Icon object repeatedly
    const selectedIconCache = {};

    // --- Function to generate the SELECTED marker SVG ---
    const createSelectedIcon = (labelText: string) => {
        // if (selectedIconCache[clinicName]) {
        //   return selectedIconCache[clinicName];
        // }

        // --- Define the TARGET DISPLAY SIZE for the selected marker ---
        // Adjust these values to make it look good relative to the 60x40 default marker
        const targetScaledWidth = 300; // Make it wider for text
        const targetScaledHeight = 80;  // Slightly taller than default? Adjust as needed.

        // --- Internal SVG element dimensions (can be simpler now) ---
        // --- Internal SVG element dimensions (INCREASED as requested) ---
        const internalIconWidth = 30;   // Allocated space for the pin graphic
        const internalIconHeight = 35;  // Allocated space for the pin graphic
        const internalPaddingX = 35;    // INCREASED horizontal padding
        const internalPaddingY = 60;    // INCREASED vertical padding
        const internalFontSize = 34;    // INCREASED font size
        const fontFamily = 'Reem Kufi, sans-serif'; // SET Font Family
        const fontWeight = '600';     // Example: slightly bolder

        // Estimate text width based on internal font size
        const estimatedTextWidth = labelText.length * (internalFontSize * 0.55);
        const internalContentWidth = internalIconWidth + internalPaddingX + estimatedTextWidth;

        // Calculate internal SVG dimensions (these define the viewBox)
        const internalSvgWidth = internalContentWidth + internalPaddingX * 2;
        const internalSvgHeight = internalIconHeight + internalPaddingY * 2;

        // Simple white pin path (adjust 'd' if needed)
        const iconPath = `<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99996 17.75C7.33396 17.75 6.70296 17.496 6.22296 17.035C5.97982 16.7996 5.73291 16.5642 5.48317 16.3261L5.45894 16.303L5.45888 16.3029C2.48689 13.4739 -1.21203 9.95298 0.841952 5.01602C2.02695 2.16502 4.90396 0.25 7.99996 0.25C11.096 0.25 13.9739 2.16502 15.1589 5.01602C17.2199 9.9708 13.4903 13.5087 10.4943 16.3506L10.494 16.351C10.251 16.581 10.011 16.809 9.77696 17.034C9.29696 17.496 8.66596 17.75 7.99996 17.75ZM7.99996 1.75C5.50196 1.75 3.18196 3.29399 2.22696 5.59199C0.569017 9.57686 3.58078 12.4438 6.49269 15.2157L6.49298 15.216C6.75498 15.465 7.01295 15.711 7.26495 15.955C7.46195 16.144 7.72396 16.25 7.99996 16.25C8.27596 16.25 8.53797 16.145 8.73697 15.954C8.92005 15.7779 9.1067 15.6006 9.2951 15.4216L9.29511 15.4216L9.46197 15.263C12.401 12.476 15.439 9.59399 13.775 5.59199C12.819 3.29399 10.498 1.75 7.99996 1.75ZM8 11.25C6.208 11.25 4.75 9.792 4.75 8C4.75 6.208 6.208 4.75 8 4.75C9.792 4.75 11.25 6.208 11.25 8C11.25 9.792 9.792 11.25 8 11.25ZM8 6.25C7.035 6.25 6.25 7.035 6.25 8C6.25 8.965 7.035 9.75 8 9.75C8.965 9.75 9.75 8.965 9.75 8C9.75 7.035 8.965 6.25 8 6.25ZM1.25 19C1.25 20.889 4.749 21.75 8 21.75C11.251 21.75 14.75 20.889 14.75 19C14.75 18.586 14.411 18.25 14 18.25C13.589 18.25 13.255 18.581 13.25 18.991C13.132 19.342 11.36 20.25 8 20.25C4.64 20.25 2.868 19.343 2.75 18.991C2.745 18.581 2.414 18.25 2 18.25C1.586 18.25 1.25 18.586 1.25 19Z" fill="white"/>`;

        // Generate SVG string using INTERNAL dimensions for viewBox and element positioning
        const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${internalSvgWidth}" height="${internalSvgHeight}" viewBox="0 0 ${internalSvgWidth} ${internalSvgHeight}">
        {/* Background fills the internal viewBox */}
        <rect x="0" y="0" width="${internalSvgWidth}" height="${internalSvgHeight}" rx="${internalSvgHeight / 2}" fill="#252932"/>
        {/* Icon positioned using internal padding */}
        <g transform="translate(${internalPaddingX / 5}, ${internalPaddingY / 1.2}) scale(1.5)">
          {/* Render icon using its internal base size */}
          <svg width="${internalIconWidth}" height="${internalIconHeight}" x="${internalPaddingX - 5}" viewBox="0 0 ${20} ${20}"> ${iconPath} </svg>
        </g>
        {/* Text positioned using internal padding/sizes */}
        <text
          x="${internalPaddingX + 5 + internalIconWidth + internalPaddingX}"
          y="${internalSvgHeight / 2}"
          dy=".3em"
          fill="white"
          font-size="${internalFontSize}"
          font-family="${fontFamily}"
          font-weight="${fontWeight}"
          text-anchor="start">
          ${labelText.replace(' & ', ' and ')}
        </text>
      </svg>
    `;

        const iconObject = {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString),
            // *** Set scaledSize explicitly to the TARGET dimensions ***
            scaledSize: new window.google.maps.Size(targetScaledWidth, targetScaledHeight),
            // *** Anchor point relative to the TARGET scaledSize ***
            // Center anchor is often easiest when scaling this way:
            anchor: new window.google.maps.Point(targetScaledWidth / 2, targetScaledHeight / 2),
            // Or if you want to anchor bottom-center of where the pin *would be* if scaled:
            // anchor: new window.google.maps.Point((internalPaddingX + internalIconWidth / 2) * (targetScaledWidth / internalSvgWidth), targetScaledHeight), // More complex calculation
        };

        selectedIconCache[name] = iconObject;
        return iconObject;
    };


    const defaultSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32" fill="none">
      <rect x="0" y="0" width="48" height="32" rx="16" fill="white"/>
      <g transform="translate(16, 5)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99996 17.75C7.33396 17.75 6.70296 17.496 6.22296 17.035C5.97982 16.7996 5.73291 16.5642 5.48317 16.3261L5.45894 16.303L5.45888 16.3029C2.48689 13.4739 -1.21203 9.95298 0.841952 5.01602C2.02695 2.16502 4.90396 0.25 7.99996 0.25C11.096 0.25 13.9739 2.16502 15.1589 5.01602C17.2199 9.9708 13.4903 13.5087 10.4943 16.3506L10.494 16.351C10.251 16.581 10.011 16.809 9.77696 17.034C9.29696 17.496 8.66596 17.75 7.99996 17.75ZM7.99996 1.75C5.50196 1.75 3.18196 3.29399 2.22696 5.59199C0.569017 9.57686 3.58078 12.4438 6.49269 15.2157L6.49298 15.216C6.75498 15.465 7.01295 15.711 7.26495 15.955C7.46195 16.144 7.72396 16.25 7.99996 16.25C8.27596 16.25 8.53797 16.145 8.73697 15.954C8.92005 15.7779 9.1067 15.6006 9.2951 15.4216L9.29511 15.4216L9.46197 15.263C12.401 12.476 15.439 9.59399 13.775 5.59199C12.819 3.29399 10.498 1.75 7.99996 1.75ZM8 11.25C6.208 11.25 4.75 9.792 4.75 8C4.75 6.208 6.208 4.75 8 4.75C9.792 4.75 11.25 6.208 11.25 8C11.25 9.792 9.792 11.25 8 11.25ZM8 6.25C7.035 6.25 6.25 7.035 6.25 8C6.25 8.965 7.035 9.75 8 9.75C8.965 9.75 9.75 8.965 9.75 8C9.75 7.035 8.965 6.25 8 6.25ZM1.25 19C1.25 20.889 4.749 21.75 8 21.75C11.251 21.75 14.75 20.889 14.75 19C14.75 18.586 14.411 18.25 14 18.25C13.589 18.25 13.255 18.581 13.25 18.991C13.132 19.342 11.36 20.25 8 20.25C4.64 20.25 2.868 19.343 2.75 18.991C2.745 18.581 2.414 18.25 2 18.25C1.586 18.25 1.25 18.586 1.25 19Z" fill="#2358AC"/>
      </g>
    </svg>
 `;


    const defaultMarkerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(defaultSvg),
        scaledSize: new window.google.maps.Size(60, 40), // Display size
        anchor: new window.google.maps.Point(30, 20),    // Anchor at center
    };


    // --- Marker Click Handler ---
    // No press functionality

    // No overlay click
    // No dropdown change logic
    // Combined useEffect to avoid infinite loops
    useEffect(() => {
        if (isInitialMount.current && startingClinic) {
            setMapCenter({ lat: startingClinic.lat, lng: startingClinic.lng })
            isInitialMount.current = false
        }
    }, [startingClinic])
    return (
        <section className="bg-[#FAFCFF] w-full h-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_4rem),linear-gradient(to_left,transparent,black_4rem),linear-gradient(to_bottom,transparent,black_4rem),linear-gradient(to_top,transparent,black_4rem)]">
            {/* This outer div needs to contain both map and overlay */}
            <div className="max-w-[1440px] w-full mx-auto h-[680px] relative "> {/* Added position: relative */}

                {/* The Overlay Card */}
                {/* <MapOverlayCard selectedClinic={selectedClinc} handleMarkerClick={handleClinicChange} /> */}

                {/* The Google Map */}
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={defaultMapContainerStyle}
                        center={mapCenter}
                        zoom={defaultMapZoom}
                        options={defaultMapOptions}
                        onLoad={onLoad}
                        
                        onUnmount={onUnmount}
                    >
                        {/* Render Markers Inside */}
                        {officeLocations.map((clinic) => {
                            const label = `${clinic.name} — ${clinic.address}`
                            const iconToUse = createSelectedIcon(label)
                            if (!iconToUse) return null
                            return (
                                <MarkerF
                                    key={clinic.name}
                                    position={{ lat: clinic.lat, lng: clinic.lng }}
                                    icon={iconToUse}
                                    title={label}
                                />
                            )
                        })}
                    </GoogleMap>
                ) : (
                    <div className="flex items-center justify-center h-[680px] bg-gray-100 rounded-3xl">
                        <p className="text-gray-600">Loading map...</p>
                    </div>
                )}
            </div>
        </section>
    )
}


const DropdownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6l4 4 4-4H4z" />
    </svg>
);


// function MapOverlayCard({ selectedClinic, handleMarkerClick }: { selectedClinic: { id: number, name: string, lat: number, lng: number, address: string, link: string }, handleMarkerClick: (name: string) => void }) {
//     const { location, onSetLocation } = useGeolocation();
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     //const [open, setOpen] = useState(false);
//     const AllowLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     onSetLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                         error: null,
//                     });
//                 },
//                 (error) => {
//                     onSetLocation({
//                         latitude: null,
//                         longitude: null,
//                         error: error.message,
//                     });
//                 },
//                 {
//                     enableHighAccuracy: false,
//                     timeout: 20000,
//                     maximumAge: 1000,
//                 }
//             );

//         } else {
//             onSetLocation({
//                 latitude: null,
//                 longitude: null,
//                 error: 'Geolocation is not supported by this browser.',
//             });
//         }
//     }
//     return (
//         <div className="absolute md:top-5 md:left-14 z-10 bg-white p-6 rounded-lg shadow-lg  w-full -top-10 left-0 md:max-w-xl space-y-4">
//             <div >
//                 <p
//                     style={{
//                         fontFamily: "var(--font-public-sans)",
//                         fontWeight: 400,
//                     }}
//                     className="text-2xl font-semibold text-[#424959]">
//                     Find your Clinic
//                 </p>
//                 {
//                     !location && (
//                         <p className="text-lg text-[#2358AC] underline" onClick={AllowLocation}>
//                             Find your nearest clinic
//                         </p>
//                     )
//                 }
//             </div>

//             <div className=' flex flex-row space-x-[20px] w-full overflow-hidden'>
//                 <Select
//                     value={selectedClinic?.name}
//                     onValueChange={handleMarkerClick}
//                 >
//                     <SelectTrigger className='w-[100%]'>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
//                             <path fillRule="evenodd" clipRule="evenodd" d="M1.43803 4.51411C2.54766 1.84586 5.20376 0.145508 8.0004 0.145508C10.797 0.145508 13.4531 1.84586 14.5628 4.51411C15.5945 6.9951 15.0349 9.11414 13.8763 10.9193C12.9197 12.4098 11.5194 13.7368 10.2738 14.9171L10.2734 14.9174L10.2728 14.9181L10.2722 14.9186C10.0521 15.1272 9.83691 15.3311 9.62984 15.5306C9.19228 15.952 8.60795 16.1872 8.0004 16.1872C7.39285 16.1872 6.80856 15.952 6.371 15.5306L6.3695 15.5292C6.15009 15.3166 5.92129 15.099 5.68711 14.8762L5.68706 14.8762C4.45467 13.704 3.07333 12.3902 2.12659 10.9184C0.966597 9.11507 0.405005 6.99816 1.43803 4.51411ZM5.24992 7.24967C5.24992 5.73089 6.48114 4.49967 7.99992 4.49967C9.5187 4.49967 10.7499 5.73089 10.7499 7.24967C10.7499 8.76846 9.5187 9.99967 7.99992 9.99967C6.48114 9.99967 5.24992 8.76846 5.24992 7.24967ZM3.41274 17.0193C3.37008 16.5527 2.97769 16.1872 2.49992 16.1872C1.99366 16.1872 1.58325 16.5976 1.58325 17.1038C1.58325 17.7582 1.98195 18.2357 2.36474 18.5374C2.75787 18.8472 3.26992 19.0862 3.82096 19.2698C4.93261 19.6404 6.41003 19.8538 7.99992 19.8538C9.58981 19.8538 11.0672 19.6404 12.1789 19.2698C12.7299 19.0862 13.242 18.8472 13.6351 18.5374C14.0179 18.2357 14.4166 17.7582 14.4166 17.1038C14.4166 16.5976 14.0062 16.1872 13.4999 16.1872C13.0222 16.1872 12.6298 16.5527 12.5871 17.0193C12.5712 17.0367 12.5442 17.0629 12.5003 17.0975C12.3368 17.2264 12.0434 17.3825 11.5991 17.5306C10.7202 17.8236 9.44759 18.0205 7.99992 18.0205C6.55224 18.0205 5.27966 17.8236 4.40071 17.5306C3.95644 17.3825 3.66303 17.2264 3.49953 17.0975C3.45562 17.0629 3.4286 17.0367 3.41274 17.0193Z" fill="#838890" />
//                         </svg>
//                         <span
//                             style={{
//                                 fontFamily: '(--var-inter)',
//                             }}
//                             className=' text-[#2358AC] text-md font-[500] overflow-ellipsis w-full'
//                         >
//                             {selectedClinic?.name}
//                         </span>
//                     </SelectTrigger>
//                     <SelectContent>
//                         {
//                             officeLocations.filter(x => x.name != selectedClinic?.name).map((clinic) => (
//                                 <SelectItem key={clinic.name} value={clinic.name}>
//                                     {clinic.name}
//                                 </SelectItem>
//                             ))
//                         }
//                     </SelectContent>
//                 </Select>
//             </div>

//             <Link href={selectedClinic?.link || '/locations'} className='shadow-2xl p-1 rounded-md w-full items-center justify-center border flex'>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//                     <path d="M18.5 21.5L12.5 6.5M21.5 4.5L2.5 8.5" stroke="#7E869E" strokeOpacity="0.25" />
//                     <path d="M2.5 5.7C2.5 4.57989 2.5 4.01984 2.71799 3.59202C2.90973 3.21569 3.21569 2.90973 3.59202 2.71799C4.01984 2.5 4.5799 2.5 5.7 2.5H18.3C19.4201 2.5 19.9802 2.5 20.408 2.71799C20.7843 2.90973 21.0903 3.21569 21.282 3.59202C21.5 4.01984 21.5 4.5799 21.5 5.7V18.3C21.5 19.4201 21.5 19.9802 21.282 20.408C21.0903 20.7843 20.7843 21.0903 20.408 21.282C19.9802 21.5 19.4201 21.5 18.3 21.5H5.7C4.57989 21.5 4.01984 21.5 3.59202 21.282C3.21569 21.0903 2.90973 20.7843 2.71799 20.408C2.5 19.9802 2.5 19.4201 2.5 18.3V5.7Z" stroke="#222222" strokeLinecap="round" />
//                     <path d="M12.5 15.0294C12.5 17.1878 10.3603 18.704 9.42687 19.2628C9.16233 19.4211 8.83767 19.4211 8.57313 19.2628C7.63974 18.704 5.5 17.1878 5.5 15.0294C5.5 12.9118 7.19587 11.5 9 11.5C10.8667 11.5 12.5 12.9118 12.5 15.0294Z" stroke="#222222" />
//                     <circle cx="9" cy="15" r="1" fill="#222222" />
//                 </svg>
//                 <p
//                     style={{
//                         fontFamily: '(--var-inter)',
//                     }}
//                     className=' text-center text-sm font-[500] overflow-ellipsis w-full underline'>{selectedClinic?.address}</p>
//             </Link>

//         </div>
//     );
// }



// function findNearestClinicNameGoogle(officeLocations, userLocation, google) {
//     // Check if geometry library is loaded
//     if (!userLocation) { return officeLocations[0] }
//     if (!google || !google.maps || !google.maps.geometry || !google.maps.geometry.spherical) {
//         console.error("Google Maps API or geometry library not loaded.");
//         return null;
//     }
//     if (!officeLocations || officeLocations.length === 0 || !userLocation) {
//         return null; // Handle empty input
//     }

//     let minDistance = Infinity;
//     let nearestClinic = null;

//     // Create LatLng object for user location
//     const userLatLng = new google.maps.LatLng(userLocation.latitude, userLocation.longitude);

//     for (const clinic of clinics) {
//         // Ensure clinic has valid coordinates
//         if (typeof clinic.lat !== 'number' || typeof clinic.lng !== 'number') {
//             console.warn(`Skipping clinic with invalid coordinates: ${clinic.name}`);
//             continue;
//         }
//         // Create LatLng object for clinic location
//         const clinicLatLng = new google.maps.LatLng(clinic.lat, clinic.lng);

//         // Calculate distance using Google Maps library (returns distance in meters)
//         const distance = google.maps.geometry.spherical.computeDistanceBetween(userLatLng, clinicLatLng);

//         if (distance < minDistance) {
//             minDistance = distance;
//             nearestClinic = clinic;
//         }
//     }
//     console.log('Nearest Clinic', nearestClinic)
//     return nearestClinic ? nearestClinic : null;
// }