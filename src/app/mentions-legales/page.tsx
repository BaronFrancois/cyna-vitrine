import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";

export const metadata: Metadata = {
    title: "Mentions légales | Cyna",
    description: "Mentions légales du site Cyna — éditeur, hébergement, propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
    return (
        <LegalPageShell title="Mentions légales">
            <h2>1. Éditeur du site</h2>
            <p>
                <strong>Raison sociale :</strong> Cyna (informations à compléter)
                <br />
                <strong>Forme juridique :</strong> [SAS / SARL / etc.]
                <br />
                <strong>Siège social :</strong> [Adresse complète]
                <br />
                <strong>Capital social :</strong> [Montant] €
                <br />
                <strong>RCS :</strong> [Ville] n° [numéro]
                <br />
                <strong>Représentant légal :</strong> [Nom]
                <br />
                <strong>Contact :</strong>{" "}
                <a href="mailto:contact@cyna.fr" className="text-cyna-600 hover:underline">
                    contact@cyna.fr
                </a>
            </p>

            <h2>2. Hébergement</h2>
            <p>
                Le site est hébergé par [Nom de l&apos;hébergeur], [Adresse], [Téléphone du
                support hébergeur].
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
                L&apos;ensemble du contenu de ce site (structure, textes, images, logos, icônes,
                bases de données) est la propriété exclusive de Cyna ou de ses partenaires, sauf
                mention contraire. Toute reproduction, représentation ou adaptation sans autorisation
                écrite préalable est interdite.
            </p>

            <h2>4. Données personnelles</h2>
            <p>
                Les traitements de données mis en œuvre via le site sont décrits dans la politique de
                confidentialité et les CGU. Vous disposez d&apos;un droit d&apos;accès, de
                rectification et de suppression conformément au RGPD en écrivant à l&apos;adresse
                indiquée ci-dessus.
            </p>

            <h2>5. Cookies</h2>
            <p>
                Le site peut utiliser des cookies nécessaires au fonctionnement technique et, le cas
                échéant, des cookies de mesure d&apos;audience, sous réserve de votre consentement
                lorsque la réglementation l&apos;exige.
            </p>

            <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">
                Mentions à compléter avec les informations juridiques et contractuelles réelles de
                votre structure.
            </p>
        </LegalPageShell>
    );
}
