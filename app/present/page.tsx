"use client";
import { useEffect, useState } from "react";

const sections = [
  "Executive Overview",
  "Sales & Pipeline",
  "Product & Customer",
  "Operations & Risk",
  "Finance & Forecast",
];

export default function Present() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((s) => Math.min(sections.length - 1, s + 1));
      if (e.key === "ArrowLeft") setI((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Zentra · {sections[i]}</h1>
        <button
          className="rounded-lg bg-brand px-4 py-2 text-bg"
          onClick={() => window.print()}
        >
          Export PDF
        </button>
      </header>
      <section className="space-y-6">
        <div className="card">This is where section content renders.</div>
      </section>
      <footer className="mt-8 text-muted text-sm">Use ← → to navigate</footer>
    </main>
  );
}
