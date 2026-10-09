"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Minus, Navigation, MapPin } from "lucide-react";

interface DeliveryMapProps {
  courierName?: string;
  courierAvatar?: string;
  distanceLeft?: string;
  currentLocation?: string;
  estimatedArrival?: string;
  distanceRemaining?: string;
  pickupLandmark?: string;
  destLandmark?: string;
}

export function DeliveryMap({
  courierName = "Ava Carter",
  courierAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
  distanceLeft = "7.2 km left",
  currentLocation = "Ikeja, Lagos",
  estimatedArrival = "Today, 4:30 pm",
  distanceRemaining = "7.2 km ~24 min",
}: DeliveryMapProps) {
  const [zoomLevel, setZoomLevel] = React.useState(1);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E3E3DC] bg-[#E8ECE9]">
      {/* Map Canvas Background (High-fidelity vector styled Lagos map) */}
      <div
        className="relative w-full h-[340px] sm:h-[380px] overflow-hidden transition-transform duration-300 select-none"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
      >
        {/* SVG Street Grid & Roads */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 450"
        >
          {/* Base land color */}
          <rect width="800" height="450" fill="#EDF1EE" />

          {/* Waterway / Lagoon on bottom left */}
          <path
            d="M0 320 Q 180 340 320 380 T 500 450 L 0 450 Z"
            fill="#D4E4E6"
            opacity="0.85"
          />

          {/* Secondary streets */}
          <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            <path d="M50 0 L120 450" />
            <path d="M220 0 L260 450" />
            <path d="M370 0 L390 450" />
            <path d="M520 0 L490 450" />
            <path d="M680 0 L710 450" />
            <path d="M0 80 L800 120" />
            <path d="M0 220 L800 240" />
            <path d="M0 330 L800 350" />
            <path d="M120 180 Q 280 150 480 200 T 780 170" />
            <path d="M180 80 Q 320 300 620 280" />
          </g>

          {/* Major Expressways */}
          <g stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <path d="M0 260 C 220 250, 360 210, 800 220" />
            <path d="M240 0 C 270 180, 380 280, 560 450" />
          </g>

          {/* Route path from Victoria Island to Ikeja */}
          <path
            d="M 195 230 C 240 260, 340 250, 410 240 S 520 220, 610 230"
            fill="none"
            stroke="#DC851F"
            strokeWidth="4"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        </svg>

        {/* Landmarks Labels */}
        <div className="absolute top-16 left-28 text-[11px] font-semibold text-[#8B9B90] tracking-wide pointer-events-none">
          Ali Ln
        </div>
        <div className="absolute top-28 left-64 text-[11px] font-bold text-[#6B7E72] tracking-wide pointer-events-none flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          Ikosi Road
        </div>
        <div className="absolute top-16 right-36 text-[11px] font-bold text-[#6B7E72] tracking-wide pointer-events-none">
          Speedaf Logistics
        </div>
        <div className="absolute bottom-28 right-44 text-[11px] font-bold text-[#6B7E72] tracking-wide pointer-events-none">
          GIG Logistics Ikosi
        </div>

        {/* Pickup Pin: Landmark Lagos */}
        <div className="absolute top-[205px] left-[175px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 rounded-full bg-[#DC851F]/20 animate-ping" />
            <div className="w-8 h-8 rounded-full bg-white shadow-md border-2 border-[#DC851F] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#DC851F]" />
            </div>
          </div>
        </div>

        {/* Courier Pin: Ava Carter Live Tracking */}
        <div className="absolute top-[225px] left-[350px] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500">
          <div className="flex items-center gap-2 bg-[#014D21] text-white px-3 py-1.5 rounded-full shadow-lg border border-white/20 select-none">
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-white/50">
              <Image
                src={courierAvatar}
                alt={courierName}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold leading-tight">{courierName}</p>
              <p className="text-[9px] text-[#A1C6AF] leading-tight font-medium">{distanceLeft}</p>
            </div>
          </div>
        </div>

        {/* Destination Pin: Ikeja City Mall */}
        <div className="absolute top-[215px] left-[610px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
          <div className="w-7 h-7 rounded-full bg-[#014D21] text-white shadow-md flex items-center justify-center border-2 border-white">
            <MapPin className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 1.45))}
            className="w-7 h-7 rounded-lg bg-white/95 backdrop-blur-xs border border-[#E3E3DC] text-[#171713] hover:bg-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.85))}
            className="w-7 h-7 rounded-lg bg-white/95 backdrop-blur-xs border border-[#E3E3DC] text-[#171713] hover:bg-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="w-7 h-7 rounded-lg bg-white/95 backdrop-blur-xs border border-[#E3E3DC] text-[#171713] hover:bg-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
            aria-label="Reset orientation"
          >
            <Navigation className="w-3.5 h-3.5 text-[#014D21]" />
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E3E3DC] bg-white border-t border-[#E3E3DC] p-3 sm:p-4 text-xs">
        <div className="pb-2 sm:pb-0 sm:pr-4">
          <span className="text-[11px] text-[#85857B] block font-medium">Current Location</span>
          <span className="font-bold text-[#171713] mt-0.5 block">{currentLocation}</span>
        </div>
        <div className="py-2 sm:py-0 sm:px-4">
          <span className="text-[11px] text-[#85857B] block font-medium">Estimated arrival</span>
          <span className="font-bold text-[#171713] mt-0.5 block">{estimatedArrival}</span>
        </div>
        <div className="pt-2 sm:pt-0 sm:pl-4">
          <div className="bg-[#03170A] text-white px-3 py-2 rounded-xl flex items-center justify-between">
            <span className="text-[10px] text-[#A1C6AF] uppercase font-bold tracking-wider">Distance remaining</span>
            <span className="text-xs font-bold text-white">{distanceRemaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
