import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function AppSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const items = ["Accueil", "Produits", "Contact", "Guides", "Installation", "Configuration"];
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Click outside pour fermer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Barre et liste sont dans le ref */}
      <div ref={containerRef} className="flex items-center space-x-2">
        {!open && (
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-900 hover:bg-transparent !px-0"
            onClick={() => setOpen(true)}
          >
            <Search />
          </Button>
        )}

        {open && (
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              placeholder="Rechercher..."
              className="w-64 border rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              className="absolute right-1 top-1.5 text-gray-500 hover:text-gray-900"
              onClick={() => setQuery("")}
            >
              <X />
            </button>

            {query && filteredItems.length > 0 && (
              <ul className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredItems.map(item => (
                  <li
                    key={item}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      console.log("Sélection:", item);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {query && filteredItems.length === 0 && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg p-2 text-gray-400 z-10">
                Aucun résultat
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}