"use client";

import { PRODUCTS } from "@/constant";
import AppLayout from "@/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import EdrProDetail from "@/components/products/EdrProDetail";
import XdrMaxDetail from "@/components/products/XdrMaxDetail";
import SocManagedDetail from "@/components/products/SocManagedDetail";
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    EDR: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200" },
    XDR: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-200" },
    SOC: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
};

const PRODUCT_DETAIL_COMPONENTS: Record<string, React.FC> = {
    "cyna-edr-pro": EdrProDetail,
    "cyna-xdr-max": XdrMaxDetail,
    "cyna-soc-managed": SocManagedDetail,
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = PRODUCTS.find((p) => p.id === slug);

    if (!product) notFound();

    const { addToCart } = useCart();
    const colors = CATEGORY_COLORS[product.category] ?? {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
    };

    const DetailComponent = PRODUCT_DETAIL_COMPONENTS[product.id];

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            category: product.category,
            period: product.period === "monthly" ? "monthly" : "annual",
        });
    };

    return (
        <AppLayout>
            <div className="pt-10 pb-24">

                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                    <nav className="flex items-center gap-2 text-sm text-gray-400">
                        <Link href="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
                        <span>/</span>
                        <Link href="/catalog" className="hover:text-gray-700 transition-colors">Catalogue</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{product.name}</span>
                    </nav>
                </div>

                {/* Hero */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">

                        {/* Left: Info */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border} uppercase tracking-wider`}>
                                    {product.category}
                                </span>
                                {product.status === "available" && (
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                                        ● Disponible
                                    </span>
                                )}
                                {product.status === "maintenance" && (
                                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                                        ● Maintenance
                                    </span>
                                )}
                                {product.status === "coming_soon" && (
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">
                                        ● Bientôt disponible
                                    </span>
                                )}
                            </div>

                            <h1 className="text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                                {product.fullDescription}
                            </p>

                            {/* Features */}
                            <ul className="grid grid-cols-2 gap-3 mb-10">
                                {product.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                            ✓
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Pricing */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">{product.price}€</span>
                                    <span className="text-gray-400 text-sm ml-1">
                                        / {product.period === "monthly" ? "mois" : "an"}
                                    </span>
                                </div>
                                {product.period === "monthly" && (
                                    <p className="text-xs text-gray-400 mt-1">Facturation mensuelle · Résiliation à tout moment.</p>
                                )}
                            </div>

                            {/* CTA */}
                            <div className="flex gap-3">
                                {product.status === "available" ? (
                                    <>
                                        <Button size="lg" variant="primary" onClick={handleAddToCart}>
                                            Ajouter au panier
                                        </Button>
                                        <Link href="/checkout">
                                            <Button size="lg" variant="outline">
                                                Acheter maintenant
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Button size="lg" variant="secondary" disabled>
                                        Indisponible actuellement
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-400 font-medium">À partir de</p>
                                <p className="text-xl font-bold text-gray-900">
                                    {product.price}€
                                    <span className="text-sm font-normal text-gray-400">
                                        /{product.period === "monthly" ? "mois" : "an"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 mb-20" />

                    {/* Product-specific section */}
                    {DetailComponent && <DetailComponent />}

                    {/* Bottom CTA */}
                    <div className="mt-20 bg-gradient-to-br from-cyna-600 to-[#4c1d95] rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-3">Prêt à sécuriser votre organisation ?</h2>
                        <p className="text-blue-200 mb-8 text-lg">
                            Commencez dès aujourd'hui avec {product.name}.
                        </p>
                        <div className="flex justify-center gap-4">
                            {product.status === "available" ? (
                                <>
                                    <Button
                                        size="lg"
                                        variant="surface"
                                        onClick={handleAddToCart}
                                    >
                                        Démarrer maintenant
                                    </Button>
                                    <Link href="/support#contact">
                                        <Button size="lg" variant="ghostInverse">
                                            Parler à un expert
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link href="/support#contact">
                                    <Button size="lg" variant="surface">
                                        Nous contacter
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
