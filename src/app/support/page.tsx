"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Send, X, User as UserIcon, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import api from "@/lib/api";
import { chatWithCyna } from "@/services/geminiService";
import AppLayout from "@/layout/AppLayout";
import { SUPPORT_FAQ, matchPredefinedAnswer } from "@/lib/supportFaq";

interface ContactForm {
    email: string;
    subject: string;
    message: string;
}

interface ContactErrors {
    email?: string;
    subject?: string;
    message?: string;
}

export default function SupportPage() {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<
        { role: "user" | "model"; parts: { text: string }[] }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ── Formulaire de contact ──
    const [contact, setContact] = useState<ContactForm>({ email: "", subject: "Problème Technique", message: "" });
    const [contactErrors, setContactErrors] = useState<ContactErrors>({});
    const [contactSending, setContactSending] = useState(false);
    const [contactSent, setContactSent] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isChatOpen]);

    /** Défilement vers #contact (lien footer « Nous contacter », même page, navigation initiale) */
    useEffect(() => {
        if (pathname !== "/support") return;

        const scrollToContact = () => {
            if (window.location.hash !== "#contact") return;
            const el = document.getElementById("contact");
            if (el) {
                requestAnimationFrame(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            }
        };

        scrollToContact();
        const t = setTimeout(scrollToContact, 150);
        window.addEventListener("hashchange", scrollToContact);
        return () => {
            clearTimeout(t);
            window.removeEventListener("hashchange", scrollToContact);
        };
    }, [pathname]);

    // ── Soumission du formulaire contact ──
    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: ContactErrors = {};
        if (!contact.email || !/\S+@\S+\.\S+/.test(contact.email)) errs.email = "Adresse email invalide";
        if (!contact.subject) errs.subject = "Veuillez choisir un sujet";
        if (!contact.message.trim() || contact.message.trim().length < 10) errs.message = "Le message doit contenir au moins 10 caractères";
        setContactErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setContactSending(true);
        try {
            await api().post("/contact", {
                email: contact.email,
                subject: contact.subject,
                message: contact.message.trim(),
            });
        } catch {
            // mock : on considère l'envoi comme réussi même si l'API échoue
        } finally {
            setContactSending(false);
            setContactSent(true);
            setContact({ email: "", subject: "Problème Technique", message: "" });
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        const newHistory = [
            ...history,
            { role: "user" as const, parts: [{ text: userMsg }] },
        ];
        setHistory(newHistory);
        setIsLoading(true);

        const predefined = matchPredefinedAnswer(userMsg);
        if (predefined) {
            setHistory([
                ...newHistory,
                { role: "model" as const, parts: [{ text: predefined }] },
            ]);
            setIsLoading(false);
            return;
        }

        const responseText = await chatWithCyna(userMsg, history);

        setHistory([
            ...newHistory,
            { role: "model" as const, parts: [{ text: responseText }] },
        ]);
        setIsLoading(false);
    };

    return (
        <AppLayout> {/* className="min-h-screen bg-white" */}
            {/* Support Hero */}
            <div className="bg-zinc-950 py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
                    Comment pouvons-nous vous aider ?
                </h1>
                <div className="max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Rechercher des sujets d'aide..."
                        className="w-full p-4 rounded-full border border-zinc-700 bg-zinc-900 text-gray-200 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-cyna-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-xl font-bold text-gray-100 mb-4 text-center md:text-left">
                    Questions fréquentes
                </h2>
                <div className="space-y-3 mb-16">
                    {SUPPORT_FAQ.map((item) => (
                        <details
                            key={item.id}
                            className="group rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 open:shadow-sm"
                        >
                            <summary className="cursor-pointer font-medium text-gray-200 list-none flex justify-between items-center gap-2">
                                {item.question}
                                <span className="text-cyna-500 text-sm group-open:rotate-180 transition-transform">
                                    ▼
                                </span>
                            </summary>
                            <p className="mt-3 text-sm text-gray-400 leading-relaxed border-t border-zinc-700 pt-3">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>

            <section
                id="contact"
                className="scroll-mt-28 max-w-4xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12"
                aria-labelledby="contact-heading"
            >
                {/* Contact Form */}
                <div>
                    <h2 id="contact-heading" className="text-2xl font-bold mb-6">
                        Contactez-nous
                    </h2>

                    {contactSent ? (
                        <div className="bg-green-950/40 border border-green-800 rounded-2xl p-6 text-center space-y-2">
                            <p className="text-green-400 font-semibold text-lg">Message envoyé !</p>
                            <p className="text-gray-400 text-sm">Notre équipe vous répondra dans les plus brefs délais à l'adresse indiquée.</p>
                            <button
                                onClick={() => setContactSent(false)}
                                className="mt-2 text-sm text-cyna-500 hover:underline"
                            >
                                Envoyer un autre message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleContactSubmit} noValidate>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={contact.email}
                                    onChange={e => { setContact(p => ({ ...p, email: e.target.value })); setContactErrors(p => ({ ...p, email: undefined })); }}
                                    className={`w-full p-3 rounded-lg bg-zinc-800 border ${contactErrors.email ? "border-red-500" : "border-zinc-700"} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyna-500`}
                                    placeholder="votre@email.fr"
                                />
                                {contactErrors.email && <p className="mt-1 text-xs text-red-500">{contactErrors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Sujet <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={contact.subject}
                                    onChange={e => setContact(p => ({ ...p, subject: e.target.value }))}
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyna-500"
                                >
                                    <option>Problème Technique</option>
                                    <option>Question Facturation</option>
                                    <option>Demande Commerciale</option>
                                    <option>Assistance générale</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    value={contact.message}
                                    onChange={e => { setContact(p => ({ ...p, message: e.target.value })); setContactErrors(p => ({ ...p, message: undefined })); }}
                                    className={`w-full p-3 rounded-lg bg-zinc-800 border ${contactErrors.message ? "border-red-500" : "border-zinc-700"} text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyna-500`}
                                    placeholder="Décrivez votre demande…"
                                />
                                {contactErrors.message && <p className="mt-1 text-xs text-red-500">{contactErrors.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={contactSending}>
                                {contactSending ? "Envoi en cours…" : "Envoyer le message"}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Chatbot CTA */}
                <div className="flex flex-col justify-center items-center bg-violet-950/30 rounded-3xl p-10 text-center border border-violet-800">
                    <div className="w-16 h-16 bg-cyna-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-violet-900">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">
                        Assistant IA Cyna
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Obtenez des réponses instantanées sur nos produits et
                        services grâce à notre IA avancée.
                    </p>
                    <Button onClick={() => setIsChatOpen(true)}>
                        Démarrer le Chat
                    </Button>
                </div>
            </section>

            {/* Chat Modal */}
            {isChatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 w-full max-w-md h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border border-zinc-700">
                        {/* Chat Header */}
                        <div className="bg-zinc-800 p-4 flex justify-between items-center border-b border-zinc-700">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-semibold text-gray-200">
                                    IA Cyna
                                </span>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-zinc-900">
                            {history.length === 0 && (
                                <div className="text-center text-gray-500 mt-10">
                                    <Bot
                                        size={48}
                                        className="mx-auto mb-4 opacity-20"
                                    />
                                    <p>
                                        Posez-moi des questions sur Cyna EDR,
                                        XDR ou les tarifs.
                                    </p>
                                </div>
                            )}
                            {history.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                            msg.role === "user"
                                                ? "bg-cyna-600 text-white rounded-br-none"
                                                : "bg-zinc-800 text-gray-200 rounded-bl-none"
                                        }`}
                                    >
                                        {msg.parts[0].text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center h-10">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-zinc-700 bg-zinc-900">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-4 pr-12 py-3 bg-zinc-800 text-gray-200 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-cyna-500"
                                    placeholder="Écrivez un message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSendMessage()
                                    }
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-2 p-1.5 bg-cyna-600 text-white rounded-full hover:bg-cyna-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
