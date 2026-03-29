import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Service après-vente (SAV) | Cyna",
    description: "Assistance technique et SAV pour vos solutions Cyna.",
};

export default function SavPage() {
    return (
        <LegalPageShell title="Service après-vente (SAV)">
            <p>
                Notre équipe support vous accompagne pour l&apos;installation, la configuration et le
                dépannage de vos offres cybersécurité Cyna.
            </p>

            <h2>Horaires d&apos;assistance</h2>
            <ul>
                <li>
                    <strong>Lundi au vendredi :</strong> 9h00 – 18h00 (heure de Paris)
                </li>
                <li>
                    <strong>Week-end et jours fériés :</strong> assistance limitée aux incidents
                    critiques pour les clients sous contrat prioritaire (selon conditions contractuelles).
                </li>
            </ul>

            <h2>Créer une demande</h2>
            <p>
                Pour ouvrir un ticket ou suivre une demande en cours, utilisez votre{" "}
                <Link href="/account" className="text-cyna-600 hover:underline">
                    espace client
                </Link>{" "}
                ou écrivez-nous depuis la page{" "}
                <Link href="/support#contact" className="text-cyna-600 hover:underline">
                    Nous contacter
                </Link>
                .
            </p>

            <h2>Ressources en ligne</h2>
            <p>
                Consultez également la page{" "}
                <Link href="/support" className="text-cyna-600 hover:underline">
                    Support
                </Link>{" "}
                pour la FAQ, la documentation et l&apos;assistant conversationnel.
            </p>

            <h2>Urgence sécurité</h2>
            <p>
                En cas d&apos;incident de sécurité majeur (compromission suspectée, ransomware,
                etc.), indiquez-le en priorité dans votre message avec le mot &quot;URGENCE&quot;
                dans l&apos;objet. Les clients disposant d&apos;un numéro d&apos;astreinte
                contractuel doivent l&apos;utiliser en premier recours.
            </p>

            <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">
                Coordonnées téléphoniques et SLA détaillés : à renseigner selon vos engagements
                commerciaux.
            </p>
        </LegalPageShell>
    );
}
