import React from "react";
import { ShieldCheck } from "lucide-react";

export default function HomeFixedText() {
    return (
        <section className="py-16 bg-[#09090f] border-b border-zinc-900">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-950/50 mb-6 border border-violet-800/50">
                    <ShieldCheck className="w-6 h-6 text-cyna-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 tracking-tight">
                    Votre partenaire de confiance en cybersécurité
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                    Bienvenue chez Cyna. Nous vous proposons une suite complète d'outils et de services pour protéger vos infrastructures. 
                    De la sécurisation de vos endpoints avec notre EDR jusqu'à un pilotage consolidé de votre SOC, nous avons la solution qui s'adapte à vos besoins spécifiques. 
                    Découvrez nos offres et gardez un temps d'avance sur les menaces.
                </p>
            </div>
        </section>
    );
}
