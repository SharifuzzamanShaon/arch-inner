// 'use client';

// import { useEffect, useRef } from 'react';
// import { loader } from '@googlemaps/js-api-loader';

// const MapComponent = ({ lat = 23.8103, lng = 90.4125, address = "Dhaka, Bangladesh" }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // 1. Use the new functional setOptions
//     loader.setOptions({
//       apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//       version: "weekly",
//     });

//     const initMap = async () => {
//       try {
//         // 2. Use the new functional importLibrary
//         const { Map } = await loader.importLibrary("maps");
//         const { AdvancedMarkerElement } = await loader.importLibrary("marker");

//         const position = { lat, lng };

//         const mapOptions = {
//           center: position,
//           zoom: 15,
//           // Note: Advanced Markers REQUIRE a mapId. 
//           // You can use 'DEMO_MAP_ID' for testing.
//           mapId: "DEMO_MAP_ID", 
//           disableDefaultUI: false,
//         };

//         const map = new Map(mapRef.current, mapOptions);

//         // 3. Create the Marker
//         new AdvancedMarkerElement({
//           map: map,
//           position: position,
//           title: address,
//         });
//       } catch (error) {
//         console.error("Error loading Google Maps:", error);
//       }
//     };

//     initMap();
//   }, [lat, lng, address]);

//   return (
//     <div 
//       ref={mapRef} 
//       className="w-full h-[450px] rounded-2xl shadow-md border border-slate-200 overflow-hidden" 
//     />
//   );
// };

// export default MapComponent;