import Link from 'next/link'

export default function AppFooter() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Acheter & Découvrir
                        </h3>
                        <ul className="space-y-3 text-xs text-gray-600">
                            <li>
                                <Link href="/catalog" className="hover:underline">
                                    Boutique
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog" className="hover:underline">
                                    Protection Mac
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog" className="hover:underline">
                                    Sécurité Cloud
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Compte
                        </h3>
                        <ul className="space-y-3 text-xs text-gray-600">
                            <li>
                                <Link href="/account" className="hover:underline">
                                    Gérer mon ID
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="hover:underline">
                                    Compte Cyna
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="hover:underline">
                                    iCloud.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Valeurs Cyna
                        </h3>
                        <ul className="space-y-3 text-xs text-gray-600">
                            <li>
                                <a href="#" className="hover:underline">
                                    Confidentialité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Accessibilité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Environnement
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            À propos de Cyna
                        </h3>
                        <ul className="space-y-3 text-xs text-gray-600">
                            <li>
                                <a href="#" className="hover:underline">
                                    Newsroom
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Leadership
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Carrières
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500">
                        Copyright © 2024 Cyna Inc. Tous droits réservés.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0 text-xs text-gray-600">
                        <a
                            href="#"
                            className="hover:underline border-r border-gray-300 pr-4"
                        >
                            Confidentialité
                        </a>
                        <a
                            href="#"
                            className="hover:underline border-r border-gray-300 pr-4"
                        >
                            Conditions d'utilisation
                        </a>
                        <a href="#" className="hover:underline">
                            Ventes et Remboursements
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
