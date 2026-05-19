-- Allow authenticated users to select all reservations
CREATE POLICY "Allow auth select" ON public.reservations FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update reservations (e.g., change status)
CREATE POLICY "Allow auth update" ON public.reservations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
