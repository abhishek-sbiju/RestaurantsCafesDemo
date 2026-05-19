import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Verdé" }],
  }),
  component: AdminPage,
});

type Reservation = Database["public"]["Tables"]["reservations"]["Row"];

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loadingSession) return <Layout><div className="pt-40 text-center text-muted-foreground">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="pt-40 pb-32 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="eyebrow">— Management</div>
            <h1 className="display mt-4 text-4xl">Admin Dashboard</h1>
          </div>
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline pb-1"
            >
              Sign Out
            </button>
          )}
        </div>

        {!session ? <LoginForm /> : <Dashboard />}
      </div>
    </Layout>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast.error(error.message);
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-card p-8 border border-border">
      <h2 className="text-xl mb-6 font-medium">Host Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground mb-2">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors text-foreground"
            required
          />
        </label>
        <label className="block">
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground mb-2">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors text-foreground"
            required
          />
        </label>
        <button type="submit" disabled={loading} className="btn-gold w-full mt-2">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: false })
      .order("seating", { ascending: true });

    if (error) {
      toast.error("Failed to load reservations");
      console.error(error);
    } else {
      setReservations(data || []);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
      setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  }

  if (loading) return <div className="text-muted-foreground">Loading reservations...</div>;
  if (reservations.length === 0) return <div className="text-muted-foreground">No reservations found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="border-b border-border/50 text-muted-foreground">
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Date</th>
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Seating</th>
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Guest</th>
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Party</th>
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Notes</th>
            <th className="font-normal py-3 px-4 uppercase text-[0.65rem] tracking-[0.2em]">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id} className="border-b border-border/30 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 whitespace-nowrap">{r.reservation_date}</td>
              <td className="py-4 px-4 whitespace-nowrap text-gold">{r.seating.slice(0, 5)}</td>
              <td className="py-4 px-4">
                <div className="font-medium">{r.name}</div>
                <div className="text-muted-foreground text-xs mt-1">{r.email}</div>
                {r.phone && <div className="text-muted-foreground text-xs mt-0.5">{r.phone}</div>}
              </td>
              <td className="py-4 px-4">{r.guests}</td>
              <td className="py-4 px-4 max-w-[200px] truncate text-muted-foreground" title={r.notes || ""}>
                {r.notes || "—"}
              </td>
              <td className="py-4 px-4">
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  className={`bg-transparent border border-border px-3 py-1.5 text-xs rounded-none focus:outline-none focus:border-gold cursor-pointer ${r.status === 'pending' ? 'text-yellow-500' : r.status === 'confirmed' ? 'text-green-500' : r.status === 'seated' ? 'text-blue-500' : 'text-muted-foreground'}`}
                >
                  <option value="pending" className="bg-card text-foreground">Pending</option>
                  <option value="confirmed" className="bg-card text-foreground">Confirmed</option>
                  <option value="seated" className="bg-card text-foreground">Seated</option>
                  <option value="no-show" className="bg-card text-foreground">No-Show</option>
                  <option value="cancelled" className="bg-card text-foreground">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
