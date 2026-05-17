
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  reservation_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  seating: z.enum(["18:30", "21:00"]),
  guests: z.number().int().min(1).max(12),
  notes: z.string().max(1000).optional().nullable(),
});

export const createReservation = async ({ data }: any) => {
  schema.parse(data);
  const { error } = await supabaseAdmin.from("reservations").insert({
    name: data.name,
    email: data.email,
    reservation_date: data.reservation_date,
    seating: data.seating,
    guests: data.guests,
    notes: data.notes ?? null,
  });
  if (error) {
    console.error("reservation insert failed", error);
    throw new Error("Could not save reservation");
  }
  return { ok: true };
};
