"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function PropertyCard({ property }: { property: any }) {
  if (!property) return null;

  return (
    <div className="flex flex-col md:flex-row bg-white border border-neutral-200 rounded-2xl overflow-hidden my-10 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full md:w-2/5 h-64 md:h-auto">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-neutral-900 shadow-sm">
          Verified Listing
        </div>
      </div>
      
      <div className="p-6 md:w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-neutral-900">{property.name}</h3>
            <span className="text-xl font-bold text-blue-600">{property.price}</span>
          </div>
          <p className="text-neutral-500 text-sm flex items-center gap-1.5 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {property.features?.map((f: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-md">
                {f}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.dispatchEvent(new Event("openChat"))}
          className="w-full bg-neutral-900 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}
