"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, User as UserIcon, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { chatWithCyna } from "@/services/geminiService";
import AppLayout from "@/layout/AppLayout";

export default function SupportPage() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<
        { role: "user" | "model"; parts: { text: string }[] }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isChatOpen]);

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
            <div className="bg-gray-50 py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Comment pouvons-nous vous aider ?
                </h1>
                <div className="max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Rechercher des sujets d'aide..."
                        className="w-full p-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sujet
                            </label>
                            <select className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200">
                                <option>Problème Technique</option>
                                <option>Question Facturation</option>
                                <option>Demande Commerciale</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                rows={5}
                                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
                            ></textarea>
                        </div>
                        <Button className="w-full">Envoyer le message</Button>
                    </form>
                </div>

                {/* Chatbot CTA */}
                <div className="flex flex-col justify-center items-center bg-blue-50 rounded-3xl p-10 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Assistant IA Cyna
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Obtenez des réponses instantanées sur nos produits et
                        services grâce à notre IA avancée.
                    </p>
                    <Button onClick={() => setIsChatOpen(true)}>
                        Démarrer le Chat
                    </Button>
                </div>
            </div>

            {/* Chat Modal */}
            {isChatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md h-[600px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Chat Header */}
                        <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="font-semibold text-gray-900">
                                    IA Cyna
                                </span>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="text-gray-500 hover:text-gray-900"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-white">
                            {history.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
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
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                    >
                                        {msg.parts[0].text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center h-10">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
