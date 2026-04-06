"use client";

import { useState } from "react";

interface WaitlistFormProps {
  t: {
    title: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    submit: string;
    success: string;
    successSub: string;
    error: string;
  };
  site: "pdfscanfast" | "yourrhythm";
}

export function WaitlistForm({ t, site }: WaitlistFormProps) {
  const [form, setForm] = useState({ firstName: "", lastName: "", age: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, site }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", age: "", email: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-bold mb-1">{t.success}</h3>
        <p className="text-muted-foreground text-sm">{t.successSub}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-1">{t.title}</h3>
      <p className="text-muted-foreground text-sm mb-5">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder={t.firstName}
            value={form.firstName}
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="text"
            placeholder={t.lastName}
            value={form.lastName}
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <input
          type="number"
          placeholder={t.age}
          value={form.age}
          min="13"
          max="120"
          onChange={e => setForm({ ...form, age: e.target.value })}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="email"
          placeholder={t.email}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "..." : t.submit}
        </button>
        {status === "error" && (
          <p className="text-destructive text-xs text-center">{t.error}</p>
        )}
      </form>
    </div>
  );
}
