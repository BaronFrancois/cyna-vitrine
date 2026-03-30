'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check, Lock, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import AppLayout from '@/layout/AppLayout';
import useCart from '@/hooks/useCart';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const COUNTRY_LABELS: Record<string, string> = {
    FR: 'France',
    BE: 'Belgique',
    CH: 'Suisse',
    LU: 'Luxembourg',
};

// ─── Décodage JWT ────────────────────────────────────────────────────────────

function decodeToken(token: string): { sub: number; email: string; role: string } | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload;
    } catch {
        return null;
    }
}

function getToken(): string | null {
    if (typeof document === 'undefined') return null;
    return document.cookie.split('; ').find(r => r.startsWith('auth_token='))?.split('=')[1] ?? null;
}

// ─── Indicateur d'étapes ─────────────────────────────────────────────────────

function StepIndicator({ num, title, current }: { num: number; title: string; current: number }) {
    const done = current > num;
    const active = current === num;
    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${active ? 'bg-gray-900 text-white' : done ? 'bg-green-50 text-green-700' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${active ? 'bg-white text-gray-900 border-white' : done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                {done ? <Check size={12} /> : num}
            </div>
            <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{title}</span>
        </div>
    );
}

// ─── Récapitulatif panier ────────────────────────────────────────────────────

function CartSummary() {
    const { items, total } = useCart();
    if (items.length === 0) return null;
    return (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Récapitulatif</h3>
            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-400">{item.period === 'monthly' ? 'Mensuel' : 'Annuel'} × {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Sous-total</span><span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>TVA (20%)</span><span>{(total * 0.2).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2">
                    <span>Total</span><span>{(total * 1.2).toFixed(2)} €</span>
                </div>
            </div>
        </div>
    );
}

// ─── Formulaire Stripe ───────────────────────────────────────────────────────

function PaymentForm({
    userId,
    cartId,
    addressId,
    onSuccess,
}: {
    userId: number;
    cartId: number;
    addressId: number;
    onSuccess: (orderId: number) => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [saveCard, setSaveCard] = useState(true);
    const { clearCart } = useCart();

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try {
            // 1. Créer le PaymentMethod côté Stripe
            const card = elements.getElement(CardElement);
            const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
                type: 'card',
                card: card!,
            });

            if (stripeError) {
                setError(stripeError.message ?? 'Erreur carte');
                setLoading(false);
                return;
            }

            // 2. Appeler le backend
            const { data } = await api().post('/payement/checkout', {
                userId,
                cartId,
                billingAddressId: addressId,
                paymentMethodId: paymentMethod.id,
                saveCard,
            });

            // 3. 3D Secure si requis
            if (data.requiresAction) {
                const { error: confirmError } = await stripe.handleNextAction({
                    clientSecret: data.clientSecret,
                });
                if (confirmError) {
                    setError(confirmError.message ?? 'Erreur 3D Secure');
                    setLoading(false);
                    return;
                }
                await api().post('/payement/confirm-3ds', { paymentIntentId: data.clientSecret.split('_secret_')[0] });
            }

            onSuccess(data.orderId);
            clearCart();
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePay} className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900 text-sm">Carte bancaire</span>
                    <div className="flex gap-1.5">
                        {['VISA', 'MC'].map(b => (
                            <div key={b} className="w-9 h-6 bg-gray-800 rounded flex items-center justify-center">
                                <span className="text-white text-[9px] font-bold">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <CardElement options={{
                    style: {
                        base: { fontSize: '15px', color: '#111827', fontFamily: 'inherit', '::placeholder': { color: '#9ca3af' } },
                        invalid: { color: '#ef4444' },
                    },
                }} />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600" />
                <span className="text-sm text-gray-600">Sauvegarder la carte pour mes prochains achats</span>
            </label>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">{error}</div>
            )}

            <Button
                type="submit"
                variant="dark"
                disabled={loading || !stripe}
                className="w-full gap-2"
            >
                <Lock size={16} />
                {loading ? "Traitement en cours..." : "Payer maintenant"}
            </Button>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <ShieldCheck size={13} /> Paiement sécurisé par Stripe — vos données ne nous sont jamais transmises
            </p>
        </form>
    );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Checkout() {
    const router = useRouter();
    const { items, isLoaded } = useCart();
    const showCartRecap = items.length > 0;

    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState<number | null>(null);
    const [cartId, setCartId] = useState<number | null>(null);
    const [addressId, setAddressId] = useState<number | null>(null);
    const [orderDone, setOrderDone] = useState<number | null>(null);

    const [billing, setBilling] = useState({
        firstName: '', lastName: '', addressLine1: '', city: '', postalCode: '', country: 'FR',
    });
    const [billingError, setBillingError] = useState('');

    /** Panier vide : pas de tunnel de commande (sauf écran de confirmation déjà affiché) */
    useEffect(() => {
        if (!isLoaded) return;
        if (orderDone != null) return;
        if (items.length === 0) {
            router.replace('/cart');
        }
    }, [isLoaded, items.length, router, orderDone]);

    // Détection token + sync panier — attendre que le localStorage soit chargé
    useEffect(() => {
        if (!isLoaded) return;

        const token = getToken();
        if (!token) return;

        const payload = decodeToken(token);
        if (!payload) return;

        setUserId(payload.sub);
        setStep(2);

        const syncCart = async () => {
            try {
                if (items.length > 0) {
                    // Vider le panier DB puis re-synchroniser
                    await api().delete('/cart');

                    for (const item of items) {
                        // Récupérer le produit DB par slug pour avoir l'id et les plans
                        const { data: product } = await api().get(`/products/${item.id}`);
                        const billingCycle = item.period === 'monthly' ? 'MONTHLY' : 'YEARLY';
                        const plan = product.subscriptionPlans?.find(
                            (p: any) => p.billingCycle === billingCycle && p.isActive
                        ) ?? product.subscriptionPlans?.[0];

                        if (!plan) continue;

                        await api().post('/cart/items', {
                            productId: product.id,
                            subscriptionPlanId: plan.id,
                            quantity: item.quantity,
                        });
                    }
                }

                // Toujours récupérer le cartId
                const { data: syncedCart } = await api().get('/cart');
                setCartId(syncedCart.id);
            } catch {
                // En cas d'erreur on garde quand même le cartId si possible
                try {
                    const { data: cart } = await api().get('/cart');
                    setCartId(cart.id);
                } catch {}
            }
        };

        syncCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    const handleBillingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBillingError('');

        const required = ['firstName', 'lastName', 'addressLine1', 'city', 'postalCode'] as const;
        if (required.some(f => !billing[f])) {
            setBillingError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            if (addressId != null) {
                await api().patch(`/addresses/${addressId}`, billing);
            } else {
                const { data } = await api().post('/addresses', billing);
                setAddressId(data.id);
            }
            setStep(3);
        } catch {
            setBillingError('Impossible de sauvegarder l\'adresse. Réessayez.');
        }
    };

    const goToBillingStep = () => setStep(2);
    const goToAccountStep = () => setStep(1);
    const goToVerificationStep = () => setStep(3);
    const goToPaymentStep = () => setStep(4);

    if (!isLoaded) {
        return (
            <AppLayout>
                <div className="mx-auto max-w-md px-4 py-24 text-center text-sm text-gray-500">
                    Chargement du panier…
                </div>
            </AppLayout>
        );
    }

    if (orderDone) {
        return (
            <AppLayout>
                <div className="max-w-lg mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Paiement confirmé !</h1>
                    <p className="text-gray-500 mb-2">Commande n° <span className="font-semibold text-gray-900">#{orderDone}</span></p>
                    <p className="text-gray-400 text-sm mb-10">Vous recevrez une confirmation par email. Vos abonnements sont maintenant actifs.</p>
                    <Button onClick={() => router.push("/dashboard")} className="gap-1">
                        Accéder à mon espace client <ChevronRight size={16} className="ml-1" />
                    </Button>
                </div>
            </AppLayout>
        );
    }

    if (items.length === 0) {
        return null;
    }

    return (
        <AppLayout>
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-16">
                {/* Étapes */}
                <div className="mb-12 flex w-full flex-wrap justify-center gap-2 border-b border-gray-100 pb-8 sm:gap-3">
                    <StepIndicator num={1} title="Compte" current={step} />
                    <StepIndicator num={2} title="Facturation" current={step} />
                    <StepIndicator num={3} title="Vérification" current={step} />
                    <StepIndicator num={4} title="Paiement" current={step} />
                </div>

                <div
                    className={cn(
                        'flex w-full flex-col items-center gap-10',
                        showCartRecap && 'lg:flex-row lg:items-start lg:justify-center'
                    )}
                >
                    {/* Formulaire — seul bloc centré si pas de récap (colonne vide supprimée) */}
                    <div
                        className={cn(
                            'w-full max-w-md',
                            showCartRecap ? 'lg:max-w-[28rem] lg:shrink-0' : 'mx-auto'
                        )}
                    >

                        {/* ── ÉTAPE 1 : Compte ── */}
                        {step === 1 && (
                            <div className="fade-in mx-auto w-full max-w-md space-y-6 text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {userId ? 'Votre compte' : 'Connectez-vous pour continuer.'}
                                </h2>
                                {userId ? (
                                    <p className="text-sm text-gray-600">
                                        Vous êtes connecté. Poursuivez vers la facturation ou revenez plus tard aux étapes précédentes avec les boutons ci-dessous.
                                    </p>
                                ) : null}
                                <div className="space-y-3">
                                    {!userId && (
                                        <>
                                            <input type="email" placeholder="Adresse email"
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <input type="password" placeholder="Mot de passe"
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            <Button className="w-full rounded-xl py-3" onClick={() => router.push('/auth/login?redirect=/checkout')}>
                                                Se connecter
                                            </Button>
                                        </>
                                    )}
                                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
                                        {userId && (
                                            <Button type="button" className="w-full gap-2 sm:w-auto" onClick={goToBillingStep}>
                                                Suivant <ChevronRight size={16} />
                                            </Button>
                                        )}
                                        {!userId && (
                                            <>
                                                <Button type="button" variant="ghost" className="w-full gap-2 sm:w-auto" onClick={goToBillingStep}>
                                                    Continuer en invité <ChevronRight size={16} />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── ÉTAPE 2 : Facturation ── */}
                        {step === 2 && (
                            <form onSubmit={handleBillingSubmit} className="fade-in w-full space-y-6">
                                <h2 className="text-center text-2xl font-bold text-gray-900">Adresse de facturation.</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { field: 'firstName', placeholder: 'Prénom', col: 1 },
                                        { field: 'lastName', placeholder: 'Nom', col: 1 },
                                        { field: 'addressLine1', placeholder: 'Adresse', col: 2 },
                                        { field: 'city', placeholder: 'Ville', col: 1 },
                                        { field: 'postalCode', placeholder: 'Code postal', col: 1 },
                                    ].map(({ field, placeholder, col }) => (
                                        <input key={field}
                                            type="text"
                                            placeholder={placeholder}
                                            value={billing[field as keyof typeof billing]}
                                            onChange={e => setBilling(prev => ({ ...prev, [field]: e.target.value }))}
                                            className={`${col === 2 ? 'col-span-2' : ''} rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                    ))}
                                    <select value={billing.country} onChange={e => setBilling(prev => ({ ...prev, country: e.target.value }))}
                                        className="col-span-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="FR">France</option>
                                        <option value="BE">Belgique</option>
                                        <option value="CH">Suisse</option>
                                        <option value="LU">Luxembourg</option>
                                    </select>
                                </div>
                                {billingError && (
                                    <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{billingError}</p>
                                )}
                                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full gap-2 sm:w-auto"
                                        onClick={goToAccountStep}
                                    >
                                        <ChevronLeft size={16} /> Précédent
                                    </Button>
                                    <Button type="submit" className="w-full gap-2 sm:w-auto">
                                        Suivant <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* ── ÉTAPE 3 : Vérification (avant Stripe) ── */}
                        {step === 3 && (
                            <div className="fade-in w-full space-y-6">
                                <h2 className="text-center text-2xl font-bold text-gray-900">
                                    Vérifiez votre commande.
                                </h2>
                                <p className="text-center text-sm text-gray-500">
                                    Contrôlez l’adresse et le récapitulatif avant de saisir votre carte.
                                </p>
                                <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm">
                                    <h3 className="font-semibold text-gray-900">Adresse de facturation</h3>
                                    <p className="text-gray-700">
                                        {billing.firstName} {billing.lastName}
                                        <br />
                                        {billing.addressLine1}
                                        <br />
                                        {billing.postalCode} {billing.city}
                                        <br />
                                        {COUNTRY_LABELS[billing.country] ?? billing.country}
                                    </p>
                                </div>
                                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between sm:gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full gap-2 sm:w-auto"
                                        onClick={goToBillingStep}
                                    >
                                        <ChevronLeft size={16} /> Précédent
                                    </Button>
                                    <Button
                                        type="button"
                                        className="w-full gap-2 sm:w-auto"
                                        onClick={goToPaymentStep}
                                        disabled={!userId || !cartId || !addressId}
                                    >
                                        Passer au paiement <ChevronRight size={16} />
                                    </Button>
                                </div>
                                {(!userId || !cartId || !addressId) && (
                                    <p className="text-center text-xs text-amber-700">
                                        Connexion et synchronisation du panier en cours… Si cela persiste,
                                        rechargez la page.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ── ÉTAPE 4 : Paiement Stripe ── */}
                        {step === 4 && userId && cartId && addressId && (
                            <div className="fade-in w-full space-y-6">
                                <h2 className="text-center text-2xl font-bold text-gray-900">Paiement sécurisé.</h2>
                                <div className="mx-auto w-full max-w-md px-0 sm:px-0">
                                    <Elements stripe={stripePromise}>
                                        <PaymentForm
                                            userId={userId}
                                            cartId={cartId}
                                            addressId={addressId}
                                            onSuccess={setOrderDone}
                                        />
                                    </Elements>
                                </div>
                                <div className="flex justify-center pt-2">
                                    <Button type="button" variant="ghost" className="gap-2" onClick={goToVerificationStep}>
                                        <ChevronLeft size={16} /> Précédent (vérification)
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (!userId || !cartId || !addressId) && (
                            <div className="fade-in mx-auto max-w-md py-12 text-center">
                                <p className="text-sm text-gray-500">Chargement en cours…</p>
                            </div>
                        )}
                    </div>

                    {/* Récapitulatif — décalé sous le niveau du titre du formulaire (comme un titre invisible à gauche) */}
                    {showCartRecap && (
                        <div
                            className={cn(
                                'w-full max-w-sm shrink-0 lg:max-w-xs',
                                /* ~ h2 (text-2xl) + gap space-y-6 avant le premier bloc utile */
                                step === 2 && 'lg:mt-[3.5rem]',
                                step === 3 && 'lg:mt-[4.75rem]',
                                step === 4 && 'lg:mt-[3.5rem]',
                                step === 1 && 'lg:mt-[3.5rem]'
                            )}
                        >
                            <CartSummary />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
