"use client";

import AppLayout from "../layout/AppLayout";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button, buttonClassName } from "../components/ui/Button";
import DashboardMockup from "../components/DashboardMockup";
import { PRODUCTS } from "@/constant";

/** Top 3 accueil : entrée / milieu / très haut de gamme — IDs alignés sur `PRODUCTS` */
const HOME_TOP3: {
    id: string;
    tierLabel: string;
    hook: string;
}[] = [
    {
        id: "cyna-edr-pro",
        tierLabel: "Pour découvrir",
        hook: "Vous voulez voir ce que ça donne, sans vous engager dans le grand écart ? Une protection concrète sur vos postes, expliquée simplement.",
    },
    {
        id: "cyna-xdr-max",
        tierLabel: "Une solution clé en main",
        hook: "On relie les bons signaux pour vous : moins de bruit, plus de clarté — comme si quelqu’un avait déjà trié la pile d’alertes avant vous.",
    },
    {
        id: "cyna-soc-managed",
        tierLabel: "Une équipe qui veille pour vous",
        hook: "Ce ne sont pas des réponses toutes faites : de vrais analystes, en France, qui gardent un œil sur votre SI jour et nuit — pour que vous puissiez vous concentrer sur le reste.",
    },
];

function CategoryIcon({ category }: { category: string }) {
    const cls = "w-10 h-10 mb-4 text-cyna-600";
    if (category === "EDR") return <Zap className={cls} aria-hidden />;
    if (category === "XDR") return <Lock className={cls} aria-hidden />;
    return <Shield className={cls} aria-hidden />;
}

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
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                            <Link href="/catalog" className="flex justify-center">
                                <Button size="lg" variant="primary">
                                    Découvrir les solutions
                                </Button>
                            </Link>
                            <Link href="/support" className="flex justify-center">
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
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center tracking-tight">
                                Trois niveaux pour avancer avec Cyna.
                            </h2>
                            <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-gray-500">
                                Un aperçu volontairement ciblé — le catalogue complet reste disponible pour aller plus loin.
                            </p>
                        </FadeInSection>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {HOME_TOP3.map((entry, i) => {
                                const product = PRODUCTS.find((p) => p.id === entry.id);
                                if (!product) return null;
                                const isMid = entry.id === "cyna-xdr-max";
                                return (
                                    <FadeInSection key={product.id} delay={`${i * 100}ms`}>
                                        <div
                                            className={`group relative flex h-full flex-col rounded-3xl shadow-xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                                                isMid
                                                    ? "bg-white before:content-[''] before:absolute before:-inset-6 before:rounded-[2.25rem] before:bg-gradient-to-br before:from-cyna-600/25 before:via-sky-500/25 before:to-indigo-500/25 before:blur-2xl before:-z-10"
                                                    : "border border-gray-100 bg-white"
                                            }`}
                                        >
                                            <Link
                                                href={`/product/${product.id}`}
                                                className="flex min-h-0 flex-grow flex-col overflow-hidden rounded-3xl"
                                            >
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cyna-800">
                                                        {entry.tierLabel}
                                                    </span>
                                                    <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                                                        {product.category}
                                                    </span>
                                                </div>
                                                <div className="flex flex-grow flex-col p-8 pb-4">
                                                    <p className="mb-3 text-sm font-medium leading-snug text-cyna-700">
                                                        {entry.hook}
                                                    </p>
                                                    <CategoryIcon category={product.category} />
                                                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 group-hover:text-cyna-700">
                                                        {product.name}
                                                    </h3>
                                                    <p className="flex-grow text-sm leading-relaxed text-gray-500">
                                                        {product.shortDescription}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="flex items-end justify-between border-t border-gray-100 px-8 pb-8 pt-2">
                                                <div>
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        {product.price}€
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {" "}
                                                        /{" "}
                                                        {product.period === "monthly"
                                                            ? "mois"
                                                            : "an"}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/product/${product.id}`}
                                                    className={buttonClassName(
                                                        "outline",
                                                        "sm",
                                                        "inline-flex gap-1.5 shrink-0"
                                                    )}
                                                >
                                                    Voir la fiche
                                                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                                                </Link>
                                            </div>
                                        </div>
                                    </FadeInSection>
                                );
                            })}
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/catalog"
                                className={buttonClassName(
                                    "primary",
                                    "md",
                                    "gap-2"
                                )}
                            >
                                Voir toutes les offres au catalogue
                                <ArrowRight className="h-5 w-5" aria-hidden />
                            </Link>
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
            </div>
        </AppLayout>
    );
}
