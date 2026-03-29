import Link from "next/link";

export default function AppFooter() {
    const links = [
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/sav", label: "SAV" },
        { href: "/support#contact", label: "Nous contacter" },
    ] as const;

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <nav
                    className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-x-8 gap-y-3 text-sm text-gray-600"
                    aria-label="Liens pied de page"
                >
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hover:text-cyna-600 transition-colors text-center sm:text-left"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <p className="text-center text-xs text-gray-400 mt-8">
                    © {new Date().getFullYear()} Cyna. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}
