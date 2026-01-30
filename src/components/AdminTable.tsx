"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

type RsvpItem = {
  id: string;
  fullName: string;
  phone: string;
  guests: number;
  attending: boolean;
  createdAt: string;
};

export function AdminTable() {
  const [items, setItems] = useState<RsvpItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/rsvp", { cache: "no-store" });
      if (!res.ok) throw new Error("Не удалось загрузить данные");
      const data = (await res.json()) as RsvpItem[];
      setItems(data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ошибка загрузки";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteRow(id: string) {
    const ok = window.confirm("Удалить запись?");
    if (!ok) return;
    const res = await fetch(`/api/admin/rsvp?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Не удалось удалить запись");
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function exportXlsx() {
    const rows = items.map((x) => ({
      id: x.id,
      fullName: x.fullName,
      phone: x.phone,
      guests: x.guests,
      attending: x.attending ? "Приду" : "Не смогу",
      createdAt: x.createdAt,
    }));

    const sheet = XLSX.utils.json_to_sheet(rows);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "RSVP");
    XLSX.writeFile(book, "rsvp.xlsx");
  }

  const totalGuests = useMemo(
    () => items.reduce((acc, x) => acc + (x.attending ? x.guests : 0), 0),
    [items],
  );

  useEffect(() => {
    load();
  }, []);

  if (isLoading) {
    return <div className="text-sm text-sage-700">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-700">
        {error}{" "}
        <button className="underline" onClick={load}>
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-sage-700">
          Ответов: {items.length} · Ожидается гостей: {totalGuests}
        </div>
        <button
          onClick={exportXlsx}
          className="rounded-xl bg-sage-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sage-800 transition"
        >
          Экспорт в XLSX
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-sage-200 bg-white shadow-soft">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-sage-200 bg-sage-50 text-left text-sage-700">
              <th className="px-4 py-3 font-medium">ФИО/семья</th>
              <th className="px-4 py-3 font-medium">Телефон</th>
              <th className="px-4 py-3 font-medium">Гостей</th>
              <th className="px-4 py-3 font-medium">Статус</th>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id} className="border-b border-sage-100 hover:bg-sage-50/60">
                <td className="px-4 py-3 text-sage-900">{x.fullName}</td>
                <td className="px-4 py-3 text-sage-700">{x.phone}</td>
                <td className="px-4 py-3 text-sage-700">{x.guests}</td>
                <td className="px-4 py-3 text-sage-700">{x.attending ? "Приду" : "Не смогу"}</td>
                <td className="px-4 py-3 text-[11px] text-sage-600">{x.id}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteRow(x.id)}
                    className="text-xs text-red-700 underline"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-sage-700" colSpan={6}>
                  Пока нет ответов.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
