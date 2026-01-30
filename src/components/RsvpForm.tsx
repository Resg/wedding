"use client";

import { useMemo, useState, useTransition } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const Schema = z.object({
  fullName: z.string().min(3, "Укажите ФИО полностью"),
  phone: z.string().min(7, "Укажите номер телефона"),
  guests: z.coerce.number().int().min(1, "Минимум 1").max(20, "Слишком много"),
  attending: z.boolean(),
});

type FormState = z.infer<typeof Schema>;

export function RsvpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    guests: 1,
    attending: true,
  });

  const [error, setError] = useState<string | null>(null);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    const normalized = digits.startsWith("7")
      ? digits
      : digits.startsWith("8")
        ? "7" + digits.slice(1)
        : "7" + digits;
    const d = normalized.slice(0, 11);
    const parts = d.split("");
    const has = (i: number) => parts.length > i;
    let result = "+7";
    if (has(1)) result += " (" + parts.slice(1, 4).join("");
    if (parts.length >= 4) result += ")";
    if (has(4)) result += " " + parts.slice(4, 7).join("");
    if (has(7)) result += "-" + parts.slice(7, 9).join("");
    if (has(9)) result += "-" + parts.slice(9, 11).join("");
    return result;
  }

  const canSubmit = useMemo(() => {
    const parsed = Schema.safeParse(form);
    return parsed.success;
  }, [form]);

  async function submit() {
    setError(null);
    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(j?.error ?? "Не удалось отправить форму");
        return;
      }

      const j = (await res.json()) as { id: string };
      router.push(`/thanks/${j.id}`);
    });
  }

  return (
    <div className="pt-5">
      <h1 className="text-lg font-semibold text-sage-900">Подтвердите участие</h1>
      <p className="mt-1 text-sm text-sage-700">
        Поля ФИО, телефон и количество гостей — обязательные.
      </p>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-xs text-sage-700">ФИО или семья</span>
          <input
            value={form.fullName}
            onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
            className="rounded-xl border border-sage-200 bg-sage-50 px-3 py-2 outline-none focus:ring-2 focus:ring-sage-300"
            placeholder="Ивановы"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-sage-700">Телефон</span>
          <input
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: formatPhone(e.target.value) }))}
            className="rounded-xl border border-sage-200 bg-sage-50 px-3 py-2 outline-none focus:ring-2 focus:ring-sage-300"
            placeholder="+7..."
            inputMode="tel"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs text-sage-700">Количество гостей (включая вас)</span>
          <input
            value={form.guests}
            onChange={(e) =>
              setForm((s) => ({
                ...s,
                guests: Number.isNaN(e.currentTarget.valueAsNumber)
                  ? 1
                  : e.currentTarget.valueAsNumber,
              }))
            }
            className="rounded-xl border border-sage-200 bg-sage-50 px-3 py-2 outline-none focus:ring-2 focus:ring-sage-300"
            type="number"
            min={1}
            max={20}
          />
        </label>

        <div className="grid gap-2">
          <label className="flex items-center gap-2 text-sm text-sage-800">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={form.attending === true}
              onChange={() => setForm((s) => ({ ...s, attending: true }))}
              className="h-4 w-4"
            />
            Я приду
          </label>
          <label className="flex items-center gap-2 text-sm text-sage-800">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={form.attending === false}
              onChange={() => setForm((s) => ({ ...s, attending: false }))}
              className="h-4 w-4"
            />
            Я не приду
          </label>
        </div>

        {error ? (
          <div className="rounded-xl bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>
        ) : null}

        <button
          onClick={submit}
          disabled={isPending || !canSubmit}
          className="rounded-xl bg-sage-700 px-4 py-3 text-center text-base font-semibold text-white shadow hover:bg-sage-800 disabled:opacity-60 transition"
        >
          {isPending ? "Отправляем..." : "Отправить"}
        </button>

        <button
          onClick={() => router.push("/")}
          className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-sage-800 shadow hover:bg-sage-50 transition"
        >
          Назад к приглашению
        </button>
      </div>
    </div>
  );
}
