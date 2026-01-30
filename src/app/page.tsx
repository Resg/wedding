import { HeroCard } from "@/components/HeroCard";
import { Section } from "@/components/Section";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="pb-10">
      <HeroCard />

      <div className="main-bg">
        <Section title="" className="pb-[50px] pt-[30px]">
          <div className="mb-4 text-center text-black">
            <div className="font-bickham text-4xl leading-[1.1]">
              Дорогой
              <br />
              гость
            </div>
          </div>
          <p className="text-center text-[11.9903pt] font-calme text-black">
            Мы рады сообщить Вам, что 25.04.2026 состоится самое главное торжество в нашей жизни -
            день нашей свадьбы! Приглашаем Вас разделить с нами радость этого незабываемого дня.
          </p>
          <div className="mt-4 text-center text-[11.9903pt] font-calme text-black">
            25.04.2026 в 16:00
          </div>
          <div className="mt-6 flex justify-center">
            <Image
              src="/images/us.jpeg"
              alt="Сергей и Жанета"
              width={699}
              height={537}
              sizes="(max-width: 768px) 90vw, 520px"
              className="w-full max-w-[520px] rounded-[200px] bg-white/80 object-cover"
            />
          </div>
          <div className="mt-6 text-center text-[23.1242pt] font-bickham text-[#61574c] leading-[1em]">
            Там, где посеяна любовь, растёт радость!
          </div>
          <div className="mt-6 flex flex-col items-center gap-[40px]">
            <Image
              src="/images/sergey.jpeg"
              alt="Сергей"
              width={1132}
              height={1280}
              sizes="(max-width: 768px) 80vw, 360px"
              className="aspect-square w-full max-w-[360px] rounded-full bg-white/80 object-cover"
            />
            <div className="text-center text-[27.4065pt] font-bickham text-[#61574c] leading-[1em]">
              Сергей
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-[40px]">
            <Image
              src="/images/zhaneta.jpeg"
              alt="Жанета"
              width={1037}
              height={1280}
              sizes="(max-width: 768px) 80vw, 360px"
              className="aspect-square w-full max-w-[360px] rounded-full bg-white/80 object-cover"
            />
            <div className="text-center text-[27.4065pt] font-bickham text-[#61574c] leading-[1em]">
              Жанета
            </div>
            <div className="text-center text-[39pt] font-bickham text-[#61574c] leading-[1em]">
              Ждем Вас на свадьбе!
            </div>
          </div>
        </Section>
      </div>

      <div className="main-bg">
        <Section
          title="Свадебное расписание"
          className="pt-[50px] pb-[70px]"
          titleClassName="text-center font-saintamour text-[82pt] leading-[1.25em] tracking-[0em] text-black"
        >
          <div className="grid gap-6 text-left text-[14.5597pt] font-wondersans leading-[1em] text-black">
            <div className="grid grid-cols-2 gap-4 justify-items-start">
              <div>
                <div>16:00</div>
                <div>25.04.2026</div>
              </div>
              <div>
                <div>Фуршет</div>
                <div className="font-normal">Сбор гостей</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 justify-items-start">
              <div>
                <div>17:00</div>
                <div>25.04.2026</div>
              </div>
              <div>
                <div>Праздничный банкет</div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      <div className="w-screen ml-[calc(50%-50vw)]">
        <iframe
          title="Ресторан La Delitsiya — Яндекс.Карты"
          src="https://yandex.ru/map-widget/v1/?ll=37.724206%2C55.432645&pt=37.724206%2C55.432645%2Cpm2rdm&z=14.28"
          className="h-[360px] w-full border-0 md:h-[520px]"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <footer className="container-page mt-8 text-center">
        <div className="flex justify-center">
          <Image
            src="/icons/apple-touch-icon.png"
            alt=""
            width={180}
            height={180}
            sizes="96px"
            className="h-[96px] w-[96px]"
          />
        </div>
        <p className="mt-3 text-center text-[36pt] font-bickham text-[#61574c] leading-[1em]">
          С любовью, Сергей и Жанета
        </p>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur md:hidden">
        <div className="container-page py-3">
          <Link
            href="/rsvp"
            className="block w-full rounded-xl bg-sage-700 px-4 py-3 text-center text-base font-semibold text-white shadow hover:bg-sage-800 active:scale-[0.99] transition"
          >
            Подтвердить присутствие
          </Link>
        </div>
      </div>

      <div className="fixed right-6 top-6 z-40 hidden md:block">
        <Link
          href="/rsvp"
          className="inline-flex items-center justify-center rounded-xl bg-sage-700 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-sage-800 active:scale-[0.99] transition animate-pulseSoft"
        >
          Подтвердить присутствие
        </Link>
      </div>
    </main>
  );
}
