import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Film, FileText, Mic, X, MagicWand } from 'lucide-react';

const fileIcon = (type) => {
  if (!type) return FileText;
  if (type.startsWith('image/')) return ImageIcon;
  if (type.startsWith('video/')) return Film;
  if (type.startsWith('audio/')) return Mic;
  return FileText;
};

export default function UploadZone({ onAnalyze }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleFiles = useCallback((files) => {
    const f = files?.[0];
    if (!f) return;
    setFile(Object.assign(f, { preview: URL.createObjectURL(f) }));
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [handleFiles]);

  const openPicker = () => inputRef.current?.click();

  const clearAll = () => {
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFile(null);
    setText('');
  };

  const Icon = useMemo(() => fileIcon(file?.type), [file]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="rounded-2xl border border-white/15 bg-white/5 p-4 md:p-6 backdrop-blur shadow-xl"
    >
      <div className="flex items-start gap-4">
        <button
          onClick={openPicker}
          className="shrink-0 rounded-xl bg-white/10 p-3 ring-1 ring-white/15 hover:bg-white/15"
          aria-label="Upload"
        >
          <Upload className="h-5 w-5 text-white" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Icon className="h-5 w-5" />
            <span>Drag & drop a file or paste text below</span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              {file ? (
                <div className="relative">
                  {(file.type?.startsWith('image/')) && (
                    <img src={file.preview} alt="preview" className="h-40 w-full rounded-lg object-cover" />
                  )}
                  {(file.type?.startsWith('video/')) && (
                    <video src={file.preview} controls className="h-40 w-full rounded-lg object-cover" />
                  )}
                  {(file.type?.startsWith('audio/')) && (
                    <audio src={file.preview} controls className="w-full" />
                  )}
                  {!file.type && (
                    <div className="text-white/70 text-sm">Selected file: {file.name}</div>
                  )}
                  <button onClick={clearAll} className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white/80 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button onClick={openPicker} className="flex h-40 w-full items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white">
                  Click to choose a file
                </button>
              )}
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*,application/pdf"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste caption, script, or description..."
                className="h-40 w-full resize-none rounded-lg bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onAnalyze({ file, text })}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-110"
            >
              <MagicWand className="h-4 w-4" /> Analyze
            </button>
            {file || text ? (
              <button onClick={clearAll} className="rounded-xl bg-white/10 px-4 py-2 text-white/80 ring-1 ring-white/15 hover:bg-white/15">
                Clear
              </button>
            ) : null}
            <div className="text-xs text-white/60">Supported: images, videos, audio, PDFs, or plain text.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
