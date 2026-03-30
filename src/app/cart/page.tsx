"use client"

import { Button } from "@/components/ui/Button";
import useCart from "@/hooks/useCart";
import AppLayout from "@/layout/AppLayout";
import Link from "next/link";

export default function Cart() {
    const { items, total, removeFromCart } = useCart();

    if (items.length === 0) {
        return (
            <AppLayout>
                <div className="mx-auto flex min-h-[min(60vh,720px)] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Votre panier est vide.
                    </h2>
                    <p className="mb-8 max-w-md text-gray-500">
                        Sécurisez vos systèmes avec nos outils premium.
                    </p>
                    <Link href="/catalog" className="inline-flex">
                        <Button>Continuer vos achats</Button>
                    </Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-20">
                <h1 className="mb-12 border-b border-gray-200 pb-8 text-center text-4xl font-bold text-gray-900 sm:text-left">
                    Récapitulatif de votre panier.
                </h1>

                <div className="space-y-8">
                    {items.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-8">
                            <div className="flex items-center space-x-6 w-full sm:w-auto">
                                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">Solution {item.category}</p>
                                    <p className="text-gray-500 text-sm mt-1">Plan {item.period === 'monthly' ? 'mensuel' : 'annuel'}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0 sm:space-x-12">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-sm">Qté : {item.quantity}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-lg">{item.price.toFixed(2)}€</p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-blue-600 text-xs hover:underline mt-1 flex items-center justify-end"
                                    >
                                        Retirer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mx-auto mt-12 flex w-full max-w-md flex-col items-stretch">
                    <div className="mb-4 flex justify-between text-lg">
                        <span className="text-gray-500">Sous-total</span>
                        <span className="font-bold text-gray-900">{total.toFixed(2)}€</span>
                    </div>
                    <div className="mb-8 flex justify-between text-sm">
                        <span className="text-gray-500">Taxes</span>
                        <span className="text-gray-900">0.00€</span>
                    </div>
                    <div className="mb-8 flex justify-between border-t border-gray-200 pt-4 text-xl">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900">{total.toFixed(2)}€</span>
                    </div>
                    <Link href="/checkout" className="w-full">
                        <Button variant="primary" className="w-full">
                            Payer
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}