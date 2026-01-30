import { HomePage } from "@/app/page";

const introText =
  "Мы рады сообщить Вам, что 25.04.2026 состоится самое главное торжество в жизни наших детей, Сергея и Жанеты - день их свадьбы! Семья Паничевых приглашает Вас разделить с нами радость этого незабываемого дня!";

export default function PanichevPage() {
  return <HomePage introText={introText} />;
}
