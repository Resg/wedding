/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const xlsx = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function toNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.trunc(value);
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return Math.trunc(n);
  }
  return null;
}

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.toLowerCase();
    if (v.includes("не") || v.includes("нет") || v.includes("no")) return false;
    if (v.includes("да") || v.includes("yes") || v.includes("приду")) return true;
  }
  return true;
}

function toDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

async function main() {
  const filePath = path.join(__dirname, "rsvp.xlsx");
  const workbook = xlsx.readFile(filePath, { cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

  const data = rows
    .map((row) => {
      const fullName = typeof row.fullName === "string" ? row.fullName.trim() : "";
      const phone = typeof row.phone === "string" ? row.phone.trim() : "";
      const guests = toNumber(row.guests);
      if (!fullName || !phone || guests === null || guests < 1) return null;

      const createdAt = toDate(row.createdAt);
      const id = typeof row.id === "string" && row.id.trim() !== "" ? row.id.trim() : undefined;
      return {
        id,
        fullName,
        phone,
        guests,
        attending: toBoolean(row.attending),
        ...(createdAt ? { createdAt } : {}),
      };
    })
    .filter(Boolean);

  if (data.length === 0) {
    console.log("No rows to seed.");
    return;
  }

  const result = await prisma.rsvp.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`Seeded ${result.count} rows.`);
}

main()
  .catch((err) => {
    console.error("Seed failed", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
