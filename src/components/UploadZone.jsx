import React, { useMemo, useRef, useState } from 'react';
import { Image, Film, FileText, Mic, UploadCloud, X } from 'lucide-react';

const typeIcon = (type) => {
  if (!type) return <FileText className="h-5 w-5" />;
  if (type.startsWith('image')) return <Image className="h-5 w-5 text-fuchsia-300" />;
  if (type.startsWith('video')) return <Film className="h-5 w-5 text-cyan-300" />;
  if (type.startsWith('audio')) return <Mic className="h-5 w-5 text-amber-300" />;
  return <FileText className="h-5 w-5 text-emerald-300" />;
};

export default function UploadZone({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const onFileSelected = (f) => {
    if (!f) return;
    setFile(f);
    setText('');
    if (f.type.startsWith('image') || f.type.startsWith('video') || f.type.startsWith('audio')) {
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) onFileSelected(f);
  };

  const badge = useMemo(() => {
    if (file) return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/90">
        {typeIcon(file.type)}
        {file.name}
      </span>
    );
    if (text) return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/90">
        {typeIcon('text/plain')}
        Text input
      </span>
    );
    return null;
  }, [file, text]);

  const clear = () => {
    setFile(null);
    setText('');
    setPreviewUrl('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file && !text.trim()) return;
    onSubmit({ file, text });
  };

  return (
    <section id="uploader" className="relative mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="absolute inset-0 -z-[0] pointer-events-none rounded-3xl bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Smart Upload Zone</h2>
        {badge}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div
            onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`group relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-neutral-900/60 p-4 text-white transition ${dragOver ? 'border-cyan-400 bg-cyan-400/10' : 'hover:border-white/30'}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*,audio/*,.txt,.pdf"
              className="hidden"
              onChange={(e) => onFileSelected(e.target.files?.[0])}
            />
            <UploadCloud className="h-8 w-8 text-white/80" />
            <p className="mt-2 text-sm text-white/80">Drag & drop or click to upload images, videos, audio, text or PDFs</p>
            <p className="text-xs text-white/60">Max 25MB</p>
          </div>

          {previewUrl && (
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/40">
              {file?.type?.startsWith('image') && (
                <img src={previewUrl} alt="preview" className="h-56 w-full object-cover" />
              )}
              {file?.type?.startsWith('video') && (
                <video src={previewUrl} controls className="h-56 w-full object-cover" />
              )}
              {file?.type?.startsWith('audio') && (
                <audio src={previewUrl} controls className="w-full" />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-white/80">Or paste text / a caption</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your script, caption, or article..."
            className="min-h-[180px] w-full rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <button type="button" onClick={clear} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10">
              <X className="h-4 w-4" /> Clear
            </button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <UploadCloud className="h-4 w-4" /> Analyze
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
