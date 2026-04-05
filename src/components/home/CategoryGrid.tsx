import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        id: "EDR",
        name: "Endpoint Security (EDR)",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        link: "/catalog?category=EDR",
        color: "group-hover:text-cyna-400"
    },
    {
        id: "XDR",
        name: "Protection Étendue (XDR)",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        link: "/catalog?category=XDR",
        color: "group-hover:text-fuchsia-400"
    },
    {
        id: "SOC",
        name: "Services Managés (SOC)",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        link: "/catalog?category=SOC",
        color: "group-hover:text-violet-400"
    }
];

export default function CategoryGrid() {
    return (
        <section className="py-20 bg-[var(--cyna-section-solutions-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">
                        Explorer par catégorie
                    </h2>
                    <div className="w-16 h-1 bg-cyna-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
                    {CATEGORIES.map((category) => (
                        <Link 
                            key={category.id} 
                            href={category.link}
                            className="group block relative overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-square bg-zinc-900 shadow-xl"
                        >
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className={`text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 ${category.color}`}>
                                    {category.name}
                                </h3>
                                <div className="flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                                    Voir la sélection <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
