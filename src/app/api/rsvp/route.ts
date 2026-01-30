import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const Schema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(7),
  guests: z.number().int().min(1).max(20),
  attending: z.boolean().default(true),
});

function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (!digits) return input.trim();
  const normalized = digits.startsWith("7")
    ? digits
    : digits.startsWith("8")
      ? "7" + digits.slice(1)
      : "7" + digits;
  return "+" + normalized;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const phone = normalizePhone(parsed.data.phone);
    const existing = await prisma.rsvp.findFirst({
      where: { phone },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Этот номер телефона уже подтверждал участие" },
        { status: 409 }
      );
    }

    const created = await prisma.rsvp.create({
      data: { ...parsed.data, phone },
    });
    return NextResponse.json({ id: created.id });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const items = await prisma.rsvp.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}
