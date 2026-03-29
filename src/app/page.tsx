"use client";

import AppLayout from "../layout/AppLayout";
import {
    ArrowRight,
    Shield,
    Zap,
    Lock,
    Clock,
    Check,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "../components/ui/Button";
import DashboardMockup from "../components/DashboardMockup";

const FadeInSection: React.FC<{
    children: React.ReactNode;
    delay?: string;
}> = ({ children, delay = "0ms" }) => {
    const domRef = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = React.useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        if (domRef.current) observer.observe(domRef.current);
        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

function MobilePricingCarousel({ children }: { children: React.ReactNode }) {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollByAmount = (direction: "prev" | "next") => {
        const el = scrollerRef.current;
        if (!el) return;
        const amount = Math.max(280, Math.floor(el.clientWidth * 0.85));
        el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
    };

    const centerInitialCard = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const target = el.querySelector<HTMLElement>('[data-carousel-initial="true"]');
        if (!target) return;

        const elRect = el.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const elCenter = elRect.left + elRect.width / 2;
        const targetCenter = targetRect.left + targetRect.width / 2;
        const delta = targetCenter - elCenter;

        if (Math.abs(delta) < 1) return;
        el.scrollLeft = el.scrollLeft + delta;
    };

    useLayoutEffect(() => {
        // Centre la carte "initiale" dès le premier rendu (évite le "saut" visible)
        // On relance après un frame pour fiabiliser le centrage (fonts/layout).
        centerInitialCard();
        requestAnimationFrame(centerInitialCard);
    }, []);

    return (
        <div className="relative max-[1245px]:block min-[1246px]:hidden">
            <div
                ref={scrollerRef}
                className="overflow-x-auto [padding-top:1.5rem] [padding-bottom:2.5rem] px-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
            >
                <div className="flex flex-nowrap gap-6 min-w-max">
                    {children}
                </div>
            </div>

            {/* Fade edges (suggère le swipe) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-gray-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-gray-50 to-transparent" />

            <button
                type="button"
                aria-label="Précédent"
                onClick={() => scrollByAmount("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 backdrop-blur border border-gray-200 shadow-sm p-2 text-gray-700"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                aria-label="Suivant"
                onClick={() => scrollByAmount("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 backdrop-blur border border-gray-200 shadow-sm p-2 text-gray-700"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}

export default function Home() {
    return (
        <AppLayout>
            <div className="w-full overflow-hidden">
                {/* Hero */}
                <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 [padding-bottom:2.5rem] bg-white">
                    <FadeInSection>
                        <h2 className="text-cyna-600 font-semibold text-xl md:text-2xl mb-4 tracking-wide">
                            Cyna Defense Platform
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-6 leading-tight">
                            Protégez vos systèmes.
                            <br />
                            En temps réel.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 font-light">
                            Détection avancée des menaces propulsée par l'IA de
                            nouvelle génération. Intégration fluide. Vitesse
                            sans compromis.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                            <Link href="/catalog">
                                <Button size="lg" variant="primary">
                                    Découvrir les solutions
                                </Button>
                            </Link>
                            <Link href="/support">
                                <Button size="lg" variant="ghost">
                                    Demander une démo{" "}
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-16 w-full max-w-4xl mx-auto px-[calc(var(--spacing)*1.25)] sm:px-0">
                            <div className="mb-6 text-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                    Les dernières failles de sécurité{" "}
                                    <span className="text-cyna-600">dans le monde</span>
                                </h3>
                                <p className="mt-2 text-gray-400 text-sm">
                                    Données officielles CISA — mises à jour en continu
                                </p>
                            </div>
                            <DashboardMockup />
                        </div>
                    </FadeInSection>
                </section>

                {/* Solutions Grid */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center tracking-tight">
                                Intelligence à l'échelle.
                            </h2>
                        </FadeInSection>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FadeInSection delay="100ms">
                                <div className="bg-white p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                                    <div>
                                        <Shield className="text-cyna-600 w-12 h-12 mb-6" />
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            SOC
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            Centre d'opérations de sécurité 24/7
                                            adapté aux besoins de votre
                                            entreprise.
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <Link
                                            href="/catalog?category=SOC"
                                            className="text-cyna-600 font-medium hover:underline"
                                        >
                                            En savoir plus &gt;
                                        </Link>
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay="200ms">
                                <div className="bg-black p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between text-white hover:scale-[1.02] transition-transform duration-500">
                                    <div>
                                        <Zap className="text-yellow-400 w-12 h-12 mb-6" />
                                        <h3 className="text-2xl font-bold mb-3">
                                            EDR
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Détection des terminaux plus rapide
                                            qu'humainement possible.
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <Link
                                            href="/catalog?category=EDR"
                                            className="text-yellow-400 font-medium hover:underline"
                                        >
                                            En savoir plus &gt;
                                        </Link>
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay="300ms">
                                <div className="bg-white p-10 rounded-3xl shadow-xl h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                                    <div>
                                        <Lock className="text-purple-600 w-12 h-12 mb-6" />
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            XDR
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            Détection étendue à travers le
                                            cloud, le réseau et les terminaux.
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <Link
                                            href="/catalog?category=XDR"
                                            className="text-purple-600 font-medium hover:underline"
                                        >
                                            En savoir plus &gt;
                                        </Link>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* Storytelling */}
                <section className="py-24 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="w-full md:w-1/2">
                                <FadeInSection>
                                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                                        Pourquoi Cyna ?
                                    </h2>
                                    <p className="text-xl text-gray-500 mb-4 font-light leading-relaxed">
                                        Nous avons créé Cyna car les solutions
                                        de sécurité traditionnelles étaient trop
                                        lentes, trop complexes et trop
                                        fragmentées.
                                    </p>
                                    <p className="text-xl text-gray-500 font-light leading-relaxed">
                                        Notre plateforme unifie votre pile de
                                        défense dans une interface unique et
                                        élégante. Une sécurité qui ressemble à
                                        de la magie.
                                    </p>
                                </FadeInSection>
                            </div>
                            <div className="w-full md:w-1/2">
                                <FadeInSection delay="200ms">
                                    <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                                        <img
                                            src="https://picsum.photos/id/20/800/800"
                                            alt="Pourquoi Cyna"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </FadeInSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Slider Section */}
                <section className="py-24 bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                        <FadeInSection>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                                L'abonnement qui vous correspond.
                            </h2>
                            <p className="text-xl text-gray-500">
                                Flexible. Transparent. Sans engagement caché.
                            </p>
                        </FadeInSection>
                    </div>

                    {/* Mobile Carousel */}
                    <MobilePricingCarousel>
                        {/* Weekly Card */}
                        <div className="w-80 flex-shrink-0 snap-center bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
                                    Court Terme
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                Hebdomadaire
                            </h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Idéal pour les consultants et audits ponctuels.
                            </p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    49€
                                </span>
                                <span className="text-gray-500">/semaine</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    Accès complet EDR
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    Rapports instantanés
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    Sans engagement
                                </li>
                            </ul>
                            <Button variant="outline" className="w-full">
                                Choisir Hebdo
                            </Button>
                        </div>

                        {/* Monthly Card (Featured) */}
                        <div
                            data-carousel-initial="true"
                            className="w-80 flex-shrink-0 snap-center bg-black text-white rounded-3xl p-8 shadow-2xl transition-all duration-300 border border-gray-800 flex flex-col"
                        >
                            <div className="mb-4 flex justify-between items-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-cyna-600 text-white text-xs font-bold uppercase tracking-wide">
                                    Le plus populaire
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Mensuel</h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                Flexibilité maximale pour les PME en croissance.
                            </p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-white">
                                    199€
                                </span>
                                <span className="text-gray-400">/mois</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                    Suite Cyna Complete
                                </li>
                                <li className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                    Support prioritaire 24/7
                                </li>
                                <li className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                    Jusqu&apos;à 50 terminaux
                                </li>
                                <li className="flex items-center text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                    Annulation facile
                                </li>
                            </ul>
                            <Button variant="primary" className="w-full">
                                Choisir Mensuel
                            </Button>
                        </div>

                        {/* Yearly Card */}
                        <div className="w-80 flex-shrink-0 snap-center bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 border border-gray-100 flex flex-col">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                                    Meilleur Prix
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                Annuel
                            </h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Pour les entreprises établies cherchant la stabilité.
                            </p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">
                                    1990€
                                </span>
                                <span className="text-gray-500">/an</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    2 mois offerts
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    Manager de compte dédié
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                    Terminaux illimités
                                </li>
                            </ul>
                            <Button variant="outline" className="w-full">
                                Choisir Annuel
                            </Button>
                        </div>
                    </MobilePricingCarousel>

                    {/* Desktop Slider (scroll / centered) */}
                    <div className="hidden min-[1246px]:block overflow-x-auto [padding-top:1.5rem] [padding-bottom:2.5rem] px-4 no-scrollbar">
                        <div className="flex flex-nowrap md:justify-center gap-6 min-w-max md:min-w-0">
                            {/* Weekly Card */}
                            <div className="w-80 md:w-96 flex-shrink-0 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-1">
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
                                        Court Terme
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                    Hebdomadaire
                                </h3>
                                <p className="text-gray-500 mb-6 text-sm">
                                    Idéal pour les consultants et audits
                                    ponctuels.
                                </p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        49€
                                    </span>
                                    <span className="text-gray-500">
                                        /semaine
                                    </span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        Accès complet EDR
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        Rapports instantanés
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        Sans engagement
                                    </li>
                                </ul>
                                <Button variant="outline" className="w-full">
                                    Choisir Hebdo
                                </Button>
                            </div>

                            {/* Monthly Card (Featured) */}
                            <div className="w-80 md:w-96 flex-shrink-0 bg-black text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-800 flex flex-col transform scale-105 z-10">
                                <div className="mb-4 flex justify-between items-center">
                                    <span className="inline-block px-3 py-1 rounded-full bg-cyna-600 text-white text-xs font-bold uppercase tracking-wide">
                                        Le plus populaire
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold mb-2">
                                    Mensuel
                                </h3>
                                <p className="text-gray-400 mb-6 text-sm">
                                    Flexibilité maximale pour les PME en
                                    croissance.
                                </p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-white">
                                        199€
                                    </span>
                                    <span className="text-gray-400">/mois</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                        Suite Cyna Complete
                                    </li>
                                    <li className="flex items-center text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                        Support prioritaire 24/7
                                    </li>
                                    <li className="flex items-center text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                        Jusqu'à 50 terminaux
                                    </li>
                                    <li className="flex items-center text-sm text-gray-300">
                                        <Check className="w-4 h-4 text-violet-400 mr-2" />{" "}
                                        Annulation facile
                                    </li>
                                </ul>
                                  <Button variant="primary" className="w-full">
                                    Choisir Mensuel
                                </Button>
                            </div>

                            {/* Yearly Card */}
                            <div className="w-80 md:w-96 flex-shrink-0 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col transform hover:-translate-y-1">
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                                        Meilleur Prix
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                    Annuel
                                </h3>
                                <p className="text-gray-500 mb-6 text-sm">
                                    Pour les entreprises établies cherchant la
                                    stabilité.
                                </p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        1990€
                                    </span>
                                    <span className="text-gray-500">/an</span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        2 mois offerts
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        Manager de compte dédié
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2" />{" "}
                                        Terminaux illimités
                                    </li>
                                </ul>
                                <Button variant="outline" className="w-full">
                                    Choisir Annuel
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
