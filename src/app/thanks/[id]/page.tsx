import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { weddingConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function ThanksPage({ params }: { params: { id: string } }) {
  const rsvp = await prisma.rsvp.findUnique({ where: { id: params.id } });

  if (!rsvp) {
    return (
      <main className="container-page pt-6 pb-10">
        <div className="pt-5">
          <h1 className="text-lg font-semibold text-sage-900">Не найдено</h1>
          <p className="mt-2 text-sm text-sage-700">
            Похоже, такой ответ не существует.
          </p>
          <Link className="mt-4 inline-block text-sage-700 underline" href="/">
            На главную
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-page pt-6 pb-10">
      <div className="pt-5">
        <h1 className="text-lg font-semibold text-sage-900">Спасибо!</h1>
        <p className="mt-1 text-sm text-sage-700">
          Ответ сохранен.
        </p>

        <div className="mt-4 grid gap-2 text-sm text-sage-800">
          <div><span className="font-semibold">ФИО:</span> {rsvp.fullName}</div>
          <div><span className="font-semibold">Телефон:</span> {rsvp.phone}</div>
          <div><span className="font-semibold">Гостей:</span> {rsvp.guests}</div>
          <div><span className="font-semibold">Статус:</span> {rsvp.attending ? "Приду" : "Не смогу"}</div>
          <div className="pt-2">
            <a
              href={weddingConfig.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-sage-700 px-4 py-2 text-white font-semibold shadow hover:bg-sage-800 transition"
            >
              Яндекс.Карты
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <Link
            href="/"
            className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-sage-800 shadow hover:bg-sage-50 transition"
          >
            Вернуться к приглашению
          </Link>
        </div>
      </div>
    </main>
  );
}
