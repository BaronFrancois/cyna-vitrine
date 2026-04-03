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
                <strong>Raison sociale :</strong> CYNA-IT (Cyna)
                <br />
                <strong>Forme juridique :</strong> SAS (société par actions simplifiée)
                <br />
                <strong>Siège social :</strong> 10 rue de Penthièvre, 75008 Paris, France
                <br />
                <strong>Capital social :</strong> 12&nbsp;000&nbsp;€
                <br />
                <strong>SIREN :</strong> 913&nbsp;711&nbsp;032
                <br />
                <strong>RCS :</strong> Paris
                <br />
                <strong>N° TVA intracommunautaire :</strong> FR20913711032
                <br />
                <strong>Responsable de la publication :</strong> Alexandre Elbaz —{" "}
                <a
                    href="mailto:alexandre.elbaz@cyna-it.fr"
                    className="text-cyna-600 hover:underline"
                >
                    alexandre.elbaz@cyna-it.fr
                </a>
                <br />
                <strong>Contact général :</strong>{" "}
                <a href="mailto:contact@cyna.fr" className="text-cyna-600 hover:underline">
                    contact@cyna.fr
                </a>
            </p>

            <h2>2. Hébergement</h2>
            <p>
                Le site officiel{" "}
                <a
                    href="https://www.cyna-it.fr/"
                    className="text-cyna-600 hover:underline"
                    rel="noopener noreferrer"
                >
                    cyna-it.fr
                </a>{" "}
                est hébergé par <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix, France —{" "}
                <a
                    href="https://www.ovhcloud.com/fr/"
                    className="text-cyna-600 hover:underline"
                    rel="noopener noreferrer"
                >
                    ovhcloud.com
                </a>
                . Cette vitrine de projet peut être déployée sur une autre infrastructure technique
                selon l&apos;environnement de démonstration.
            </p>

            <h2>3. Délégué à la protection des données (DPO)</h2>
            <p>
                <strong>Nathan Bramli</strong> —{" "}
                <a href="mailto:nathan.bramli@cyna-it.fr" className="text-cyna-600 hover:underline">
                    nathan.bramli@cyna-it.fr
                </a>
                <br />
                Adresse postale : CYNA-IT — DPO, 10 rue de Penthièvre, 75008 Paris.
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
                L&apos;ensemble du contenu de ce site (structure, textes, images, logos, icônes, bases
                de données) est la propriété exclusive de Cyna ou de ses partenaires, sauf mention
                contraire. Toute reproduction, représentation ou adaptation sans autorisation écrite
                préalable est interdite.
            </p>

            <h2>5. Données personnelles</h2>
            <p>
                Les traitements de données mis en œuvre via le site sont décrits dans la politique de
                confidentialité et les CGU. Vous disposez d&apos;un droit d&apos;accès, de rectification
                et de suppression conformément au RGPD en écrivant au DPO ou à l&apos;adresse du siège
                social indiquée ci-dessus.
            </p>

            <h2>6. Cookies</h2>
            <p>
                Le site peut utiliser des cookies nécessaires au fonctionnement technique et, le cas
                échéant, des cookies de mesure d&apos;audience, sous réserve de votre consentement
                lorsque la réglementation l&apos;exige.
            </p>

            <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">
                Projet de démonstration réalisé dans un cadre pédagogique ; les mentions relatives à
                l&apos;entreprise Cyna (CYNA-IT) sont alignées sur les informations publiques du site{" "}
                <a href="https://www.cyna-it.fr/mentions-legales/" className="text-cyna-600 hover:underline">
                    cyna-it.fr
                </a>
                .
            </p>
        </LegalPageShell>
    );
}
