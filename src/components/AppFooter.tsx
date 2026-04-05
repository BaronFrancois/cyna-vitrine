import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function AppFooter() {
    const links = [
        { href: "/cgu", label: "CGU" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/sav", label: "SAV" },
        { href: "/support#contact", label: "Nous contacter" },
    ] as const;

    return (
        <footer className="hidden md:block bg-zinc-950 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <nav
                    className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-x-8 gap-y-3 text-sm text-gray-400"
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

                <div className="flex justify-center items-center gap-6 mt-8">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyna-500 transition-colors" aria-label="Facebook">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyna-500 transition-colors" aria-label="Twitter">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyna-500 transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
                <p className="text-center text-xs text-gray-600 mt-8">
                    © {new Date().getFullYear()} Cyna. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
}
