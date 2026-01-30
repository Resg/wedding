"use client";

import { useEffect, useState } from "react";

type Remaining = {
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_MS = Date.UTC(2026, 3, 25, 16, 0, 0);

function calcRemaining(nowMs: number): Remaining {
  const diffMs = Math.max(0, TARGET_MS - nowMs);
  const totalSeconds = Math.floor(diffMs / 1000);
  const weeks = Math.floor(totalSeconds / 604800);
  const days = Math.floor((totalSeconds % 604800) / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { weeks, days, hours, minutes, seconds };
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

export function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(calcRemaining(Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="text-center text-sage-900/90">
      <div className="text-xs uppercase tracking-[0.2em] text-sage-700">
        До встречи
      </div>
      <div className="mt-2 grid grid-cols-5 gap-3 text-sage-900">
        {remaining ? (
          <>
            <div className="text-center">
              <div className="font-lejardin text-3xl">{pad2(remaining.weeks ?? 0)}</div>
              <div className="mt-1 font-lejardin text-[11.9903pt] font-bold tracking-[0em] text-black">
                недель
              </div>
            </div>
            <div className="text-center">
              <div className="font-lejardin text-3xl">{pad2(remaining.days ?? 0)}</div>
              <div className="mt-1 font-lejardin text-[11.9903pt] font-bold tracking-[0em] text-black">
                дней
              </div>
            </div>
            <div className="text-center">
              <div className="font-lejardin text-3xl">{pad2(remaining.hours ?? 0)}</div>
              <div className="mt-1 font-lejardin text-[11.9903pt] font-bold tracking-[0em] text-black">
                часов
              </div>
            </div>
            <div className="text-center">
              <div className="font-lejardin text-3xl">{pad2(remaining.minutes ?? 0)}</div>
              <div className="mt-1 font-lejardin text-[11.9903pt] font-bold  text-black">
                минут
              </div>
            </div>
            <div className="text-center">
              <div className="font-lejardin text-3xl">{pad2(remaining.seconds ?? 0)}</div>
              <div className="mt-1 font-lejardin text-[11.9903pt] font-bold tracking-[0em] text-black">
                секунд
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-5 font-lejardin text-2xl">— — —</div>
        )}
      </div>
    </div>
  );
}
