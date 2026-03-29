import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Conditions générales d'utilisation | Cyna",
    description: "Conditions générales d'utilisation du site et des services Cyna.",
};

export default function CguPage() {
    return (
        <LegalPageShell title="Conditions générales d'utilisation">
            <p>
                Les présentes conditions générales d&apos;utilisation (CGU) encadrent l&apos;accès et
                l&apos;utilisation du site vitrine et des services proposés par Cyna. En naviguant sur
                ce site ou en passant commande, vous acceptez sans réserve les présentes CGU.
            </p>

            <h2>1. Éditeur du site</h2>
            <p>
                Le site est édité par Cyna. Les informations relatives à l&apos;éditeur (forme
                juridique, siège, contact) figurent dans les{" "}
                <Link href="/mentions-legales" className="text-cyna-600 hover:underline">
                    mentions légales
                </Link>
                .
            </p>

            <h2>2. Objet</h2>
            <p>
                Les CGU définissent les règles d&apos;usage des contenus disponibles en ligne
                (textes, visuels, documentation) ainsi que les modalités d&apos;accès aux services
                associés (compte client, commandes, support).
            </p>

            <h2>3. Compte utilisateur</h2>
            <p>
                Lorsque la création d&apos;un compte est proposée, l&apos;utilisateur s&apos;engage à
                fournir des informations exactes et à préserver la confidentialité de ses
                identifiants. Toute activité réalisée depuis son compte est réputée effectuée par
                l&apos;utilisateur.
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
                L&apos;ensemble des éléments du site (marques, logos, textes, mises en page) sont
                protégés. Toute reproduction ou exploitation non autorisée est interdite.
            </p>

            <h2>5. Responsabilité</h2>
            <p>
                Cyna s&apos;efforce d&apos;assurer l&apos;exactitude des informations affichées. Le
                site peut toutefois contenir des inexactitudes ou être temporairement indisponible ;
                l&apos;éditeur ne saurait être tenu responsable des dommages indirects liés à
                l&apos;usage du site.
            </p>

            <h2>6. Modification des CGU</h2>
            <p>
                Cyna se réserve le droit de modifier les présentes CGU à tout moment. La version en
                ligne fait foi ; il appartient à l&apos;utilisateur de consulter régulièrement cette
                page.
            </p>

            <h2>7. Droit applicable</h2>
            <p>
                Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux
                compétents seront ceux du ressort du siège social de l&apos;éditeur, sous réserve
                d&apos;une attribution légale impérative différente.
            </p>

            <p className="text-xs text-gray-400 pt-8 border-t border-gray-100">
                Document fourni à titre informatif — modèle à adapter par votre conseil avant
                publication définitive.
            </p>
        </LegalPageShell>
    );
}
