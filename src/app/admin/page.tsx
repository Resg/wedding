import { AdminTable } from "@/components/AdminTable";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pt-6 pb-10">
      <div className="pt-5">
        <h1 className="text-lg font-semibold text-sage-900">RSVP (админ)</h1>
        <div className="mt-4">
          <AdminTable />
        </div>
      </div>
    </main>
  );
}
