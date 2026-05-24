import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(50),
  reservation_date: z.string().min(1),
  seating: z.string().min(1),
  guests: z.number().int().min(1).max(50),
  notes: z.string().max(1000).optional().nullable(),
});

export type ReservationInput = z.infer<typeof schema>;

export async function createReservation(data: ReservationInput) {
  const parsed = schema.parse(data);
  
  const { error } = await supabase
    .from("reservations")
    .insert(parsed);

  if (error) {
    console.error("Failed to insert reservation:", error);
    throw new Error(error.message);
  }

  console.log("Reservation submitted successfully.");
  return { ok: true };
}
