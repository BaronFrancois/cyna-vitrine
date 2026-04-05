import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/constant";
import { Button } from "@/components/ui/Button";

// On reprend les 3 top produits de notre base pour l'accueil
const HOME_TOP3_IDS = ["cyna-edr-pro", "cyna-xdr-max", "cyna-soc-managed"];

export default function TopProducts() {
    const topProducts = PRODUCTS.filter(p => HOME_TOP3_IDS.includes(p.id));

    return (
        <section className="py-20 bg-[#09090f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight">
                            Les Top Produits du moment
                        </h2>
                        <p className="text-gray-400 mt-3 text-lg">
                            Notre sélection des solutions les plus demandées par nos clients.
                        </p>
                    </div>
                    <Link href="/catalog" className="hidden md:inline-flex shrink-0 items-center text-cyna-500 hover:text-cyna-400 font-medium transition-colors">
                        Voir tout le catalogue <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topProducts.map((product) => (
                        <div key={product.id} className="group flex flex-col bg-[var(--cyna-card-surface)] border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-cyna-600/50 transition-all duration-300 shadow-lg">
                            <Link href={`/product/${product.id}`} className="block relative aspect-video overflow-hidden bg-zinc-900">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/10">
                                        Top Vente
                                    </span>
                                </div>
                            </Link>

                            <div className="flex flex-col flex-1 p-6">
                                <Link href={`/product/${product.id}`} className="block mb-2 group-hover:text-cyna-400 text-gray-100 transition-colors">
                                    <h3 className="text-xl font-bold line-clamp-1">{product.name}</h3>
                                </Link>
                                <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">
                                    {product.shortDescription}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-100">{product.price}€</p>
                                        <p className="text-xs text-gray-500">/ {product.period === "monthly" ? "mois" : "an"}</p>
                                    </div>
                                    <Link href={`/product/${product.id}`}>
                                        <Button variant="surface" size="md" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                                            <ShoppingBag className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/catalog">
                        <Button variant="outline" className="w-full">
                            Voir tout le catalogue
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
