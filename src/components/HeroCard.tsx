import Image from "next/image";
import { weddingConfig } from "@/lib/config";
import { Countdown } from "@/components/Countdown";

export function HeroCard() {
  return (
    <section className="container-page pt-6 max-w-[520px] md:max-w-[680px]" style={{background: 'none'}}>
      {/* фон именно блока, без карточки */}
      <div className="relative w-full min-h-[70vh] md:min-h-[88vh] overflow-hidden">
        <Image
          src={weddingConfig.heroImage}
          alt="Приглашение"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 520px) 100vw, 520px"
        />
        {/* мягкий оверлей для читабельности */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/15 to-white/55" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div />
          <div className="pt-6">
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
