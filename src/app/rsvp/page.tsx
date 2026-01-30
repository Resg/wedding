import { RsvpForm } from "@/components/RsvpForm";

export const dynamic = "force-dynamic";

export default function RsvpPage() {
  return (
    <main className="container-page pt-6 pb-10">
      <RsvpForm />
      <p className="mt-4 text-center text-xs text-sage-600">
        Ваши данные используются только для организации мероприятия.
      </p>
    </main>
  );
}
