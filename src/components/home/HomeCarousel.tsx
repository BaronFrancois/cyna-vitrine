"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544197150-b99a5802146f?auto=format&fit=crop&w=1200&q=80",
        title: "Nouvelle Gamme Cyber 2026",
        description: "Découvrez nos offres exclusives pour sécuriser votre entreprise contre les nouvelles menaces avec une approche XDR intégrée.",
        cta: "Voir les offres",
        link: "/catalog"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
        title: "SOC Managé 24/7",
        description: "Dormez sur vos deux oreilles. Nos experts français veillent sur votre système d'information de jour comme de nuit.",
        cta: "En savoir plus",
        link: "/product/cyna-soc-managed"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80",
        title: "Audit et Pentest",
        description: "Évaluez votre résilience technique avant qu'un acteur malveillant ne le fasse à votre place. Simulation d'attaques Black Box experte.",
        cta: "Prendre RDV",
        link: "/support#contact"
    }
];

export default function HomeCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-défilement
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);

    return (
        <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-black">
            {/* Slides container */}
            <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {SLIDES.map((slide) => (
                    <div key={slide.id} className="relative w-full h-full flex-shrink-0">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img 
                                src={slide.image} 
                                alt={slide.title} 
                                className="w-full h-full object-cover opacity-50"
                            />
                            {/* Overlay gradient for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-300 mb-8 font-light drop-shadow-sm">
                                    {slide.description}
                                </p>
                                <Link href={slide.link}>
                                    <Button variant="primary" size="lg" className="shadow-lg shadow-cyna-600/20">
                                        {slide.cta}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/10 backdrop-blur-sm transition-colors z-20"
                aria-label="Diapositive précédente"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/10 backdrop-blur-sm transition-colors z-20"
                aria-label="Diapositive suivante"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                {SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            currentIndex === idx 
                                ? "bg-cyna-500 w-8" 
                                : "bg-white/40 hover:bg-white/70"
                        )}
                        aria-label={`Aller à la diapositive ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
