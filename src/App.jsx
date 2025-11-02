import React from 'react';
import Hero from './components/Hero';
import ChatBox from './components/ChatBox';
import FileDropzone from './components/FileDropzone';
import KnowledgeBase from './components/KnowledgeBase';
import { Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white font-semibold">AV</div>
            <div>
              <h2 className="text-lg font-semibold">aidevisuel.com</h2>
              <p className="text-xs text-gray-500">Assistance visuelle interactive</p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 md:flex">
            <a href="#chat" className="text-sm text-gray-600 hover:text-gray-900">Chat</a>
            <a href="#upload" className="text-sm text-gray-600 hover:text-gray-900">Importer</a>
            <a href="#fiches" className="text-sm text-gray-600 hover:text-gray-900">Fiches</a>
          </nav>
        </header>

        <Hero />

        <main className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ChatBox />
          <FileDropzone />
        </main>

        <div className="mt-8">
          <KnowledgeBase />
        </div>

        <footer className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 md:flex-row md:items-center">
          <p>
            © 2025 aidevisuel.com — Aide visuelle interactive. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="h-4 w-4" />
            Compte admin initial suggéré: benit800@gmail.com — mot de passe: Admin2009!
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
