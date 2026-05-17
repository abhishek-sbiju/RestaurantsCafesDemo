
CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  reservation_date date NOT NULL,
  seating time NOT NULL,
  guests int NOT NULL CHECK (guests BETWEEN 1 AND 12),
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- No public policies: only the server (service role, which bypasses RLS) can read/write.
-- This protects guest PII from being read by unauthenticated visitors.

CREATE INDEX reservations_date_idx ON public.reservations (reservation_date);
