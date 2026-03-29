/** Questions / réponses prédéfinies (cahier des charges : chatbot avec FAQ avant API tierce). */

export type SupportFaqItem = {
    id: string;
    question: string;
    answer: string;
    /** Mots-clés pour correspondance sur la saisie libre */
    keywords: string[];
};

export const SUPPORT_FAQ: SupportFaqItem[] = [
    {
        id: "soc",
        question: "Qu’est-ce que le SOC managé Cyna ?",
        answer:
            "Le SOC managé Cyna assure une supervision 24/7 de vos environnements : nos analystes surveillent les alertes, investiguent et coordonnent la réponse aux incidents, en complément de votre EDR / XDR.",
        keywords: ["soc", "managé", "supervision", "24/7", "analyste"],
    },
    {
        id: "edr",
        question: "En quoi l’EDR Cyna Pro protège-t-il mes postes ?",
        answer:
            "L’offre EDR & Digital Workplace (comme sur cyna-it.fr) couvre la protection managée des postes, serveurs et utilisateurs, avec déploiement simplifié et intégration à votre EDR existant.",
        keywords: ["edr", "endpoint", "poste", "terminal", "malware"],
    },
    {
        id: "xdr",
        question: "Qu’apporte le XDR par rapport à l’EDR seul ?",
        answer:
            "Le XDR étend la corrélation sur plusieurs sources (endpoints, cloud, réseau selon périmètre) pour une vision unifiée des incidents et des investigations plus rapides.",
        keywords: ["xdr", "corrélation", "visibilité", "unifié"],
    },
    {
        id: "tarifs",
        question: "Comment sont calculés les tarifs ?",
        answer:
            "Les prix affichés sur la boutique correspondent à des abonnements mensuels ou annuels par produit. Le détail est sur chaque fiche produit ; la facturation suit votre panier au checkout.",
        keywords: ["tarif", "prix", "abonnement", "facture", "coût"],
    },
    {
        id: "contact",
        question: "Comment contacter le support ?",
        answer:
            "Utilisez le formulaire sur cette page, ou écrivez à l’adresse indiquée sur cyna-it.fr. Pour l’urgence incident, précisez-le dans le sujet du message.",
        keywords: ["contact", "support", "aide", "email", "téléphone"],
    },
];

export function matchPredefinedAnswer(input: string): string | null {
    const t = input.toLowerCase().trim();
    if (t.length < 2) return null;

    for (const item of SUPPORT_FAQ) {
        if (item.keywords.some((k) => t.includes(k))) {
            return item.answer;
        }
    }
    return null;
}
