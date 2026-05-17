import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  reservation_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  seating: z.enum(["18:30", "21:00"]),
  guests: z.number().int().min(1).max(12),
  notes: z.string().max(1000).optional().nullable(),
});

export type ReservationInput = z.infer<typeof schema>;

export async function createReservation(data: ReservationInput) {
  const parsed = schema.parse(data);
  console.log("Reservation submitted:", parsed);
  return { ok: true };
}
