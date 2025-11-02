import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, MessageSquare, FileUp, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle overlay for text readability without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/80" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
          <Rocket className="h-4 w-4 text-blue-600" />
          Aide visuelle interactive en temps réel
        </span>

        <h1 className="font-['Inter'] text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
          aidevisuel.com
        </h1>
        <p className="mt-3 max-w-2xl text-balance text-gray-600">
          Posez vos questions, envoyez des images, PDF et fichiers, et obtenez de l’aide automatique ou humaine.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#chat"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white shadow hover:bg-blue-700 transition"
          >
            <MessageSquare className="h-5 w-5" />
            Ouvrir le chat
          </a>
          <a
            href="#upload"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm hover:bg-gray-50 transition"
          >
            <FileUp className="h-5 w-5" />
            Importer un fichier
          </a>
          <a
            href="#fiches"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm hover:bg-gray-50 transition"
          >
            <BookOpen className="h-5 w-5" />
            Parcourir les fiches
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Site web par <span className="font-medium text-gray-700">Benit Madimba</span>, 2025
        </p>
      </div>
    </section>
  );
}
