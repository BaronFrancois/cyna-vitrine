"use client";

import { useState } from "react";
import AppLayout from "@/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { MOCK_USER, PRODUCTS } from "@/constant";
import Link from "next/link";
import {
    Shield,
    CreditCard,
    Bell,
    ChevronRight,
    LogOut,
    Activity,
    Clock,
    CheckCircle,
    AlertTriangle,
    Zap,
    Lock,
    Cloud,
    Globe,
    Settings,
    LifeBuoy,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    EDR: <Zap className="w-5 h-5" />,
    XDR: <Activity className="w-5 h-5" />,
    SOC: <Shield className="w-5 h-5" />,
    Cloud: <Cloud className="w-5 h-5" />,
    Network: <Globe className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
    EDR: "bg-yellow-100 text-yellow-700",
    XDR: "bg-blue-100 text-blue-700",
    SOC: "bg-purple-100 text-purple-700",
    Cloud: "bg-sky-100 text-sky-700",
    Network: "bg-green-100 text-green-700",
};

const MOCK_ACTIVITY = [
    {
        id: 1,
        label: "Connexion réussie",
        detail: "Paris, France — Chrome",
        time: "Il y a 2 minutes",
        type: "success",
    },
    {
        id: 2,
        label: "Rapport mensuel généré",
        detail: "Cyna EDR Pro — Janvier 2026",
        time: "Il y a 3 jours",
        type: "info",
    },
    {
        id: 3,
        label: "Abonnement renouvelé",
        detail: "Cyna XDR Max — 199,99 €",
        time: "Il y a 7 jours",
        type: "success",
    },
    {
        id: 4,
        label: "Alerte de sécurité",
        detail: "Tentative de connexion inhabituelle bloquée",
        time: "Il y a 12 jours",
        type: "warning",
    },
    {
        id: 5,
        label: "Mise à jour du profil",
        detail: "Adresse email modifiée",
        time: "Il y a 20 jours",
        type: "info",
    },
];

const activeSubscriptions = PRODUCTS.filter(
    (_, i) => i < MOCK_USER.activeSubscriptions
);

type Tab = "overview" | "subscriptions" | "billing" | "settings";

export default function AccountDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "overview", label: "Vue d'ensemble", icon: <Activity size={16} /> },
        { id: "subscriptions", label: "Abonnements", icon: <Shield size={16} /> },
        { id: "billing", label: "Facturation", icon: <CreditCard size={16} /> },
        { id: "settings", label: "Paramètres", icon: <Settings size={16} /> },
    ];

    return (
        <AppLayout>
            {/* Page Header */}
            <div className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-900/40 flex-shrink-0">
                                {MOCK_USER.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-0.5">
                                    Espace client
                                </p>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                    Bonjour, {MOCK_USER.name.split(" ")[0]} 👋
                                </h1>
                                <p className="text-gray-400 text-sm mt-0.5">
                                    {MOCK_USER.company} · {MOCK_USER.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/support">
                                <Button
                                    variant="ghost"
                                    className="text-gray-300 hover:text-white text-sm"
                                >
                                    <LifeBuoy size={15} className="mr-2" />
                                    Support
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button
                                    variant="ghost"
                                    className="text-gray-300 hover:text-white text-sm"
                                >
                                    <LogOut size={15} className="mr-2" />
                                    Déconnexion
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 mt-8 border-b border-gray-700">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px ${
                                    activeTab === tab.id
                                        ? "bg-white text-gray-900"
                                        : "text-gray-400 hover:text-gray-200"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-gray-50 min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* ── TAB: VUE D'ENSEMBLE ── */}
                    {activeTab === "overview" && (
                        <div className="space-y-8">
                            {/* Stats row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-500">
                                            Abonnements actifs
                                        </span>
                                        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                                            <Shield size={18} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">
                                        {MOCK_USER.activeSubscriptions}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        sur 5 solutions disponibles
                                    </p>
                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-500">
                                            Prochaine facturation
                                        </span>
                                        <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                                            <CreditCard size={18} className="text-purple-600" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900">
                                        {MOCK_USER.nextBillingDate}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Renouvellement automatique
                                    </p>
                                </div>

                                <div className="bg-black rounded-3xl p-6 shadow-sm text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-400">
                                            Score de sécurité
                                        </span>
                                        <div className="w-9 h-9 bg-blue-600/20 rounded-xl flex items-center justify-center">
                                            <Lock size={18} className="text-blue-400" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold">
                                        92
                                        <span className="text-xl text-gray-400 font-normal">/100</span>
                                    </p>
                                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                        <CheckCircle size={11} /> Excellent — Tous les systèmes opérationnels
                                    </p>
                                </div>
                            </div>

                            {/* Main grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left: subscriptions + activity */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Mes abonnements
                                            </h2>
                                            <button
                                                onClick={() => setActiveTab("subscriptions")}
                                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                Tout voir <ChevronRight size={14} />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {activeSubscriptions.map((p) => (
                                                <div
                                                    key={p.id}
                                                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${CATEGORY_COLORS[p.category]}`}>
                                                            {CATEGORY_ICONS[p.category]}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                                                            <p className="text-xs text-gray-400">{p.shortDescription}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="font-semibold text-gray-900 text-sm">
                                                            {p.price}€
                                                            <span className="text-gray-400 font-normal">
                                                                /{p.period === "monthly" ? "mois" : "an"}
                                                            </span>
                                                        </p>
                                                        <span className="inline-flex items-center gap-1 text-[11px] text-green-600 font-medium">
                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                            Actif
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <Link href="/catalog">
                                                <Button variant="outline" className="w-full text-sm">
                                                    Ajouter une solution
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Activity feed */}
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900 mb-6">
                                            Activité récente
                                        </h2>
                                        <div className="space-y-4">
                                            {MOCK_ACTIVITY.map((event) => (
                                                <div key={event.id} className="flex items-start gap-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                        event.type === "success" ? "bg-green-100"
                                                        : event.type === "warning" ? "bg-yellow-100"
                                                        : "bg-blue-100"
                                                    }`}>
                                                        {event.type === "success" ? (
                                                            <CheckCircle size={15} className="text-green-600" />
                                                        ) : event.type === "warning" ? (
                                                            <AlertTriangle size={15} className="text-yellow-600" />
                                                        ) : (
                                                            <Bell size={15} className="text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-grow">
                                                        <p className="text-sm font-medium text-gray-900">{event.label}</p>
                                                        <p className="text-xs text-gray-400">{event.detail}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                                                        <Clock size={11} />
                                                        {event.time}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: account info + quick actions */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900 mb-5">Mon compte</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Nom complet</p>
                                                <p className="text-sm font-medium text-gray-900">{MOCK_USER.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                                                <p className="text-sm font-medium text-gray-900">{MOCK_USER.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Entreprise</p>
                                                <p className="text-sm font-medium text-gray-900">{MOCK_USER.company}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 pt-5 border-t border-gray-100">
                                            <button
                                                onClick={() => setActiveTab("settings")}
                                                className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                            >
                                                <span>Modifier le profil</span>
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h2 className="text-lg font-bold text-gray-900 mb-5">Actions rapides</h2>
                                        <div className="space-y-2">
                                            {[
                                                { icon: <Shield size={16} className="text-blue-600" />, label: "Gérer mes abonnements", action: () => setActiveTab("subscriptions") },
                                                { icon: <CreditCard size={16} className="text-purple-600" />, label: "Historique de facturation", action: () => setActiveTab("billing") },
                                                { icon: <LifeBuoy size={16} className="text-green-600" />, label: "Contacter le support", href: "/support" },
                                                { icon: <Activity size={16} className="text-orange-600" />, label: "Explorer les solutions", href: "/catalog" },
                                            ].map((item, i) =>
                                                item.href ? (
                                                    <Link key={i} href={item.href} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            {item.icon}
                                                        </div>
                                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-grow">{item.label}</span>
                                                        <ChevronRight size={14} className="text-gray-400" />
                                                    </Link>
                                                ) : (
                                                    <button key={i} onClick={item.action} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            {item.icon}
                                                        </div>
                                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-grow text-left">{item.label}</span>
                                                        <ChevronRight size={14} className="text-gray-400" />
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── TAB: ABONNEMENTS ── */}
                    {activeTab === "subscriptions" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Mes abonnements</h2>
                                    <p className="text-gray-500 text-sm mt-1">{MOCK_USER.activeSubscriptions} abonnement(s) actif(s)</p>
                                </div>
                                <Link href="/catalog">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                                        Ajouter une solution
                                    </Button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {activeSubscriptions.map((p) => (
                                    <div key={p.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${CATEGORY_COLORS[p.category]}`}>
                                                    {CATEGORY_ICONS[p.category]}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                                                    <span className="text-xs font-medium text-gray-400">{p.category}</span>
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                Actif
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-5 leading-relaxed">{p.shortDescription}</p>
                                        <ul className="space-y-2 mb-6">
                                            {p.features.map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-xl font-bold text-gray-900">{p.price}€</span>
                                                <span className="text-gray-400 text-sm"> / {p.period === "monthly" ? "mois" : "an"}</span>
                                            </div>
                                            <Button variant="outline" size="sm" className="rounded-full text-xs">Gérer</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
                                <h3 className="font-bold text-gray-900 mb-1">Complétez votre protection</h3>
                                <p className="text-sm text-gray-500 mb-4">3 solutions supplémentaires sont disponibles pour renforcer votre sécurité.</p>
                                <Link href="/catalog">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm">Explorer le catalogue</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* ── TAB: FACTURATION ── */}
                    {activeTab === "billing" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Facturation</h2>
                                <p className="text-gray-500 text-sm mt-1">Historique et méthodes de paiement</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-5">Historique des factures</h3>
                                        <div className="space-y-3">
                                            {[
                                                { date: "01 fév. 2026", label: "Abonnements Cyna — Fév. 2026", amount: "69,98 €", status: "Payée" },
                                                { date: "01 jan. 2026", label: "Abonnements Cyna — Jan. 2026", amount: "69,98 €", status: "Payée" },
                                                { date: "01 déc. 2025", label: "Abonnements Cyna — Déc. 2025", amount: "69,98 €", status: "Payée" },
                                                { date: "01 nov. 2025", label: "Abonnements Cyna — Nov. 2025", amount: "69,98 €", status: "Payée" },
                                            ].map((invoice, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                                                            <CreditCard size={16} className="text-gray-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{invoice.label}</p>
                                                            <p className="text-xs text-gray-400">{invoice.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 flex-shrink-0">
                                                        <span className="text-sm font-semibold text-gray-900">{invoice.amount}</span>
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                                                            <CheckCircle size={11} />{invoice.status}
                                                        </span>
                                                        <button className="text-xs text-blue-600 hover:underline">Télécharger</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-5">Méthode de paiement</h3>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                            <div className="w-10 h-7 bg-gray-800 rounded-md flex items-center justify-center">
                                                <span className="text-white text-[10px] font-bold">VISA</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                                                <p className="text-xs text-gray-400">Expire 12/27</p>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 text-sm text-blue-600 hover:underline text-left">
                                            Modifier la méthode de paiement
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-3">Prochaine échéance</h3>
                                        <p className="text-3xl font-bold text-gray-900">69,98 €</p>
                                        <p className="text-sm text-gray-400 mt-1">Le {MOCK_USER.nextBillingDate}</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                                            Inclut {MOCK_USER.activeSubscriptions} abonnements actifs
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── TAB: PARAMÈTRES ── */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Paramètres du compte</h2>
                                <p className="text-gray-500 text-sm mt-1">Gérez vos informations personnelles et préférences</p>
                            </div>
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-5">Informations personnelles</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Nom complet", value: MOCK_USER.name, type: "text" },
                                        { label: "Email", value: MOCK_USER.email, type: "email" },
                                        { label: "Entreprise", value: MOCK_USER.company, type: "text" },
                                    ].map((field) => (
                                        <div key={field.label}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                            <input
                                                type={field.type}
                                                defaultValue={field.value}
                                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                                        Sauvegarder les modifications
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-5">Sécurité</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Changer le mot de passe", desc: "Dernière modification il y a 3 mois", icon: <Lock size={16} className="text-gray-500" /> },
                                        { label: "Authentification à deux facteurs", desc: "Non activée — recommandée", icon: <Shield size={16} className="text-gray-500" /> },
                                        { label: "Sessions actives", desc: "1 session active", icon: <Activity size={16} className="text-gray-500" /> },
                                    ].map((item) => (
                                        <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">{item.icon}</div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100">
                                <h3 className="font-bold text-red-600 mb-2">Zone de danger</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    La suppression de votre compte est irréversible et annule tous vos abonnements.
                                </p>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-full text-sm">
                                    Supprimer mon compte
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
