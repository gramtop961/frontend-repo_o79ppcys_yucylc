import React, { useMemo, useState } from 'react';
import { Search, Share2, BookOpen } from 'lucide-react';

const FICHES = [
  {
    id: 'prendre-une-photo-nette',
    title: 'Prendre une photo nette de document',
    desc: 'Conseils simples pour des scans lisibles (lumière, cadrage, stabilité).',
    tags: ['photo', 'document', 'astuces'],
  },
  {
    id: 'envoyer-un-pdf',
    title: 'Envoyer un PDF et vérifier ses pages',
    desc: 'Comment importer un PDF et s’assurer que toutes les pages sont incluses.',
    tags: ['pdf', 'fichier', 'import'],
  },
  {
    id: 'flouter-infos-sensibles',
    title: 'Flouter des informations sensibles',
    desc: 'Masquer noms, adresses e-mail et numéros avant de partager une image.',
    tags: ['confidentialité', 'image'],
  },
  {
    id: 'contacter-un-humain',
    title: 'Contacter un assistant humain',
    desc: 'Activer le transfert et décrire précisément votre besoin pour une prise en charge rapide.',
    tags: ['support', 'humain'],
  },
];

export default function KnowledgeBase() {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FICHES;
    return FICHES.filter((f) =>
      f.title.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const copyLink = async (id) => {
    const url = `${window.location.origin}/?fiche=${encodeURIComponent(id)}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papiers');
    } catch {
      window.prompt('Copiez le lien :', url);
    }
  };

  return (
    <section id="fiches" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Fiches d’aide</p>
            <p className="text-xs text-gray-500">Articles, tutoriels et FAQ</p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-blue-600 focus:outline-none"
            placeholder="Rechercher une fiche..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data.map((f) => (
          <article key={f.id} className="flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {f.tags.map((t) => (
                <span key={t} className="rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700">{t}</span>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2">
                <a
                  href={`/?fiche=${encodeURIComponent(f.id)}`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white shadow hover:bg-blue-700"
                >
                  Ouvrir
                </a>
                <button
                  onClick={() => copyLink(f.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm hover:bg-gray-50"
                >
                  <Share2 className="h-4 w-4" /> Partager
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
