import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileUp, Image as ImageIcon, FileText, X, Download } from 'lucide-react';

export default function FileDropzone() {
  const [files, setFiles] = useState([]);

  const onFiles = useCallback((list) => {
    const accepted = Array.from(list).filter((f) =>
      ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'].includes(f.type)
    );
    const withUrls = accepted.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      type: f.type.startsWith('image/') ? 'image' : 'pdf',
      name: f.name,
      size: f.size,
    }));
    setFiles((prev) => [...prev, ...withUrls]);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files);
  }, [onFiles]);

  const onBrowse = useCallback((e) => {
    if (e.target?.files?.length) onFiles(e.target.files);
  }, [onFiles]);

  useEffect(() => () => {
    files.forEach((f) => URL.revokeObjectURL(f.url));
  }, [files]);

  const totalSize = useMemo(() => files.reduce((acc, f) => acc + (f.size || 0), 0), [files]);

  return (
    <section id="upload" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
          <FileUp className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">Importer & prévisualiser</p>
          <p className="text-xs text-gray-500">Glisser-déposer des images (PNG, JPG, WEBP) et PDF</p>
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center hover:border-blue-400"
      >
        <div className="rounded-full bg-white p-3 shadow-sm">
          <FileUp className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-sm text-gray-700">
          Glissez vos fichiers ici ou
          <label className="mx-1 cursor-pointer font-medium text-blue-600 underline">
            parcourez
            <input type="file" multiple accept="image/*,application/pdf" className="sr-only" onChange={onBrowse} />
          </label>
          depuis votre appareil.
        </p>
        <p className="text-xs text-gray-500">Taille totale: {(totalSize / 1024 / 1024).toFixed(2)} MB</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {files.map((item, idx) => (
            <div key={`${item.url}-${idx}`} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                className="absolute right-2 top-2 z-10 inline-flex items-center rounded-full bg-white p-1 text-gray-700 shadow hover:bg-gray-50"
                aria-label="Retirer"
              >
                <X className="h-4 w-4" />
              </button>

              {item.type === 'image' ? (
                <img src={item.url} alt={item.name} className="h-40 w-full object-cover" />
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-gray-50">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
              )}

              <div className="flex items-center justify-between gap-2 border-t border-gray-200 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900" title={item.name}>{item.name}</p>
                  <p className="text-xs text-gray-500">{(item.size / 1024).toFixed(0)} KB</p>
                </div>
                <a
                  href={item.url}
                  download={item.name}
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Download className="h-3.5 w-3.5" /> Télécharger
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
