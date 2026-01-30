import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.rsvp.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  await prisma.rsvp.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
