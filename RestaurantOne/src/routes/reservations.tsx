import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState, useRef, useEffect } from "react";
import { createReservation } from "@/lib/reservations.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Verdé" },
      { name: "description", content: "Reserve your table at Verdé. Two seatings nightly, Tuesday through Saturday." },
      { property: "og:title", content: "Reservations — Verdé" },
      { property: "og:description", content: "Two seatings nightly · Tuesday through Saturday." },
    ],
  }),
  component: Reservations,
});

function Reservations() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await createReservation({
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        reservation_date: String(fd.get("date") || ""),
        seating: String(fd.get("seat") || "19:00"),
        guests: Number(fd.get("guests") || 2),
        notes: String(fd.get("notes") || "") || null,
      });
    } catch (err) {
      console.warn("Supabase save failed (non-blocking):", err);
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  }

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div className="eyebrow">— Reservations</div>
        <h1 className="display mt-6 text-6xl md:text-7xl">
          Reserve your<br/>
          <span className="italic text-gold">evening.</span>
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Two seatings nightly at 18:30 and 21:00. We confirm by email within 24 hours.
        </p>
      </section>

      <section id="booking-form" className="mx-auto max-w-[1100px] px-6 pb-32 grid md:grid-cols-[1.2fr_1fr] gap-16 scroll-mt-24">
        <form
          onSubmit={onSubmit}
          className="bg-card p-8 md:p-12 border border-border"
        >
          {sent ? (
            <div className="py-16 text-center flex flex-col items-center">
              {/* Animated checkmark */}
              <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center mb-8 fade-up">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M6 17l8 8L26 7"/>
                </svg>
              </div>
              <div className="eyebrow fade-up">— Merci</div>
              <h2 className="display mt-6 text-4xl md:text-5xl fade-up">Your request is in.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-sm fade-up">
                We'll confirm by email within 24 hours. We look forward to hosting you!
              </p>
              <div className="mt-8 flex justify-center gap-4 fade-up">
                <a href="mailto:reserve@verde.paris" className="btn-ghost !py-3 !px-6 text-xs">Email Us</a>
                <button type="button" onClick={() => setSent(false)} className="btn-gold !py-3 !px-6 text-xs">New Reservation</button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Field label="Full Name"><input name="name" required type="text" className={inp} placeholder="Your name" /></Field>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Email"><input name="email" required type="email" className={inp} placeholder="you@example.com" /></Field>
                <Field label="Phone"><input name="phone" required type="tel" className={inp} placeholder="+91 98765 43210" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Date"><DatePicker /></Field>
                <Field label="Guests">
                  <GuestPicker />
                </Field>
              </div>
              <Field label="Preferred Time">
                <TimePicker />
              </Field>
              <Field label="Notes — occasion, dietary needs, special requests">
                <textarea name="notes" rows={4} className={inp} placeholder="Birthday celebration, anniversary, dietary preferences, etc." />
              </Field>
              <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
                {submitting ? "Sending…" : "Request Reservation"}
              </button>
            </div>
          )}
        </form>

        <aside className="space-y-10">
          <div>
            <div className="eyebrow">— Visit</div>
            <p className="mt-4 display text-2xl leading-snug">
              14 Rue des Jardins<br/>75004 Paris
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Métro · Saint-Paul (Line 1)</p>
          </div>
          <div>
            <div className="eyebrow">— Contact</div>
            <p className="mt-4 text-sm leading-relaxed">
              <a href="tel:+33142000000" className="link-underline">+33 1 42 00 00 00</a><br/>
              <a href="mailto:reserve@verde.paris" className="link-underline">reserve@verde.paris</a>
            </p>
          </div>
          <div>
            <div className="eyebrow">— Service</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tuesday – Saturday<br/>
              Dinner only · 18:30 – 22:30<br/>
              Closed Sunday & Monday
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <div className="eyebrow">— Private Events</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              For full buy-outs, weddings, and corporate gatherings, please write to{" "}
              <a href="mailto:events@verde.paris" className="text-gold link-underline">events@verde.paris</a>.
            </p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

const inp = "w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}

function GuestPicker() {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const ref = useRef<HTMLDivElement>(null);
  const options = [1,2,3,4,5,6,7,8,10,12,15,20];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name="guests" value={guests} />
      <button type="button" onClick={() => setOpen(!open)} className={`${inp} w-full flex justify-between items-center cursor-pointer`}>
        <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}><path d="m6 9 6-6H0z"/></svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#0f0e0c] rounded-2xl border border-gold/10 shadow-2xl z-50 overflow-hidden font-sans">
          <div className="max-h-[220px] overflow-y-auto py-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gold/20 [&::-webkit-scrollbar-thumb]:rounded-full">
            {options.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => { setGuests(n); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${n === guests ? 'bg-gold/10 text-gold font-medium' : 'text-cream/80 hover:bg-white/5 hover:text-gold'}`}
              >
                {n} {n === 1 ? 'guest' : 'guests'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimePicker() {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("07");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");
  const [mode, setMode] = useState<'hour' | 'minute'>('hour');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => { if (!open) setMode('hour'); setOpen(!open); };

  const items = mode === 'hour' ? [12,1,2,3,4,5,6,7,8,9,10,11] : [0,5,10,15,20,25,30,35,40,45,50,55];
  const currentValue = mode === 'hour' ? parseInt(hour, 10) : parseInt(minute, 10);
  const rotation = mode === 'hour' ? (currentValue * 30) : (currentValue * 6);

  const handleNumberClick = (val: number) => {
    if (mode === 'hour') {
      setHour((val === 12 ? 12 : val).toString().padStart(2, '0'));
      setMode('minute');
    } else {
      setMinute(val.toString().padStart(2, '0'));
    }
  };

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name="seat" value={`${hour}:${minute} ${period}`} />
      <button type="button" onClick={toggleOpen} className={`${inp} w-full flex justify-between items-center cursor-pointer`}>
        <span>{hour}:{minute} {period}</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}><path d="m6 9 6-6H0z"/></svg>
      </button>

      {open && (
        <>
          {/* Mobile: full-screen overlay */}
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)}></div>
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0e0c] rounded-t-3xl border-t border-gold/10 z-50 overflow-hidden font-sans">
            <div className="p-5">
              {/* Handle bar */}
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5"></div>
              {/* Top row: time + AM/PM */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center display text-4xl text-cream">
                  <button type="button" onClick={() => setMode('hour')} className={`px-2 py-1 rounded-xl transition-colors ${mode === 'hour' ? 'bg-gold/15 text-gold' : 'hover:bg-white/5'}`}>{hour}</button>
                  <span className="px-1">:</span>
                  <button type="button" onClick={() => setMode('minute')} className={`px-2 py-1 rounded-xl transition-colors ${mode === 'minute' ? 'bg-gold/15 text-gold' : 'hover:bg-white/5'}`}>{minute}</button>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setPeriod("AM")} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${period === 'AM' ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-muted-foreground'}`}>AM</button>
                  <button type="button" onClick={() => setPeriod("PM")} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${period === 'PM' ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-muted-foreground'}`}>PM</button>
                </div>
              </div>
              <div className="text-[0.55rem] tracking-[0.15em] uppercase text-muted-foreground text-center mb-4">Select {mode}</div>
              {/* Clock */}
              <div className="flex justify-center mb-5">
                <div className="relative w-[220px] h-[220px] rounded-full bg-[#1e1c19] flex items-center justify-center">
                  <div className="absolute w-2 h-2 rounded-full bg-gold z-20"></div>
                  <div className="absolute w-[2px] bg-gold z-10 origin-bottom transition-transform duration-300" style={{ height: '35%', bottom: '50%', left: 'calc(50% - 1px)', transform: `rotate(${rotation}deg)` }}></div>
                  {items.map(val => {
                    const step = mode === 'hour' ? val : val / 5;
                    const angle = (step * 30 - 90) * (Math.PI / 180);
                    const r = 38;
                    return (
                      <button key={val} type="button" onClick={() => handleNumberClick(val)}
                        className={`absolute w-9 h-9 -ml-[18px] -mt-[18px] rounded-full flex items-center justify-center text-sm font-medium transition-colors z-20 ${(mode === 'hour' ? parseInt(hour, 10) === val : parseInt(minute, 10) === val) ? 'bg-gold text-[#151412]' : 'text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                        style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }}
                      >{mode === 'minute' ? val.toString().padStart(2, '0') : val}</button>
                    );
                  })}
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-3">
                <button type="button" onClick={() => { setHour("07"); setMinute("00"); setPeriod("PM"); setMode("hour"); }} className="flex-1 py-3 rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-white transition-colors">Clear</button>
                <button type="button" onClick={() => setOpen(false)} className="flex-1 py-3 rounded-xl border border-gold/20 text-sm text-gold hover:bg-gold/10 transition-colors">Set time ↗</button>
              </div>
            </div>
          </div>

          {/* Desktop: side-by-side popover */}
          <div className="hidden md:block absolute top-[calc(100%+8px)] left-0 w-[420px] bg-[#0f0e0c] rounded-2xl border border-gold/10 shadow-2xl z-50 overflow-hidden font-sans">
            <div className="flex">
              <div className="w-[140px] p-4 flex flex-col justify-between bg-gradient-to-b from-gold/5 to-transparent border-r border-gold/5">
                <div className="text-[0.55rem] tracking-[0.2em] uppercase text-gold mb-3">Time</div>
                <div className="flex items-center display text-3xl text-cream">
                  <button type="button" onClick={() => setMode('hour')} className={`px-1 rounded-lg transition-colors ${mode === 'hour' ? 'bg-gold/15 text-gold' : 'hover:bg-white/5'}`}>{hour}</button>
                  <span className="px-0.5">:</span>
                  <button type="button" onClick={() => setMode('minute')} className={`px-1 rounded-lg transition-colors ${mode === 'minute' ? 'bg-gold/15 text-gold' : 'hover:bg-white/5'}`}>{minute}</button>
                </div>
                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => setPeriod("AM")} className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${period === 'AM' ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-muted-foreground hover:text-white'}`}>AM</button>
                  <button type="button" onClick={() => setPeriod("PM")} className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${period === 'PM' ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-muted-foreground hover:text-white'}`}>PM</button>
                </div>
                <div className="flex gap-2 mt-auto pt-4">
                  <button type="button" onClick={() => { setHour("07"); setMinute("00"); setPeriod("PM"); setMode("hour"); }} className="flex-1 py-1.5 rounded-lg border border-white/10 text-[0.6rem] text-muted-foreground hover:text-white transition-colors">Clear</button>
                  <button type="button" onClick={() => setOpen(false)} className="flex-1 py-1.5 rounded-lg border border-gold/20 text-[0.6rem] text-gold hover:bg-gold/10 transition-colors">Set ↗</button>
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col items-center justify-center bg-[#151412]">
                <div className="text-[0.55rem] tracking-[0.15em] uppercase text-muted-foreground mb-3">Select {mode}</div>
                <div className="relative w-[200px] h-[200px] rounded-full bg-[#1e1c19] flex items-center justify-center">
                  <div className="absolute w-2 h-2 rounded-full bg-gold z-20"></div>
                  <div className="absolute w-[2px] bg-gold z-10 origin-bottom transition-transform duration-300" style={{ height: '35%', bottom: '50%', left: 'calc(50% - 1px)', transform: `rotate(${rotation}deg)` }}></div>
                  {items.map(val => {
                    const step = mode === 'hour' ? val : val / 5;
                    const angle = (step * 30 - 90) * (Math.PI / 180);
                    const r = 38;
                    const isSel = mode === 'hour' ? parseInt(hour, 10) === val : parseInt(minute, 10) === val;
                    return (
                      <button key={val} type="button" onClick={() => handleNumberClick(val)}
                        className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs font-medium transition-colors z-20 ${isSel ? 'bg-gold text-[#151412]' : 'text-muted-foreground hover:bg-white/10 hover:text-white'}`}
                        style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }}
                      >{mode === 'minute' ? val.toString().padStart(2, '0') : val}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function DatePicker() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayLabels = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

  const prevM = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else setViewMonth(viewMonth - 1); };
  const nextM = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else setViewMonth(viewMonth + 1); };

  const isPast = (day: number) => { const d = new Date(viewYear, viewMonth, day); d.setHours(0,0,0,0); return d < today; };
  const isSel = (day: number) => selectedDate ? selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear : false;
  const isTod = (day: number) => today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

  const handleSelect = (day: number) => { if (!isPast(day)) setSelectedDate(new Date(viewYear, viewMonth, day)); };

  const formattedValue = selectedDate ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth()+1).toString().padStart(2,'0')}-${selectedDate.getDate().toString().padStart(2,'0')}` : '';
  const displayValue = selectedDate ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : 'Select date';

  const cells: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevMonthDays - i, current: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true });
  const rows = Math.ceil(cells.length / 7);
  const remaining = rows * 7 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, current: false });

  return (
    <div className="relative" ref={ref}>
      <input type="hidden" name="date" value={formattedValue} />
      <button type="button" onClick={() => setOpen(!open)} className={`${inp} w-full flex justify-between items-center cursor-pointer`}>
        <span>{displayValue}</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}><path d="m6 9 6-6H0z"/></svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[300px] bg-[#0f0e0c] rounded-2xl border border-gold/10 shadow-2xl z-50 overflow-hidden font-sans">
          {/* Month nav */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-cream text-sm">{monthFull[viewMonth]}</span>
              <span className="text-gold text-sm">{viewYear}</span>
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={prevM} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:border-gold/40 hover:text-gold transition-colors">
                <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 1 2 4l4 3"/></svg>
              </button>
              <button type="button" onClick={nextM} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:border-gold/40 hover:text-gold transition-colors">
                <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 1l4 3-4 3"/></svg>
              </button>
            </div>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 px-3">
            {dayLabels.map(d => (
              <div key={d} className="text-center text-[0.55rem] tracking-[0.12em] uppercase text-muted-foreground/50 py-1">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 px-3 pb-2">
            {cells.map((cell, i) => {
              if (!cell.current) return <div key={`e${i}`} className="h-9 flex items-center justify-center text-xs text-white/8">{cell.day}</div>;
              const past = isPast(cell.day); const sel = isSel(cell.day); const tod = isTod(cell.day);
              return (
                <button key={`d${cell.day}`} type="button" disabled={past} onClick={() => handleSelect(cell.day)}
                  className={`h-9 flex items-center justify-center text-xs rounded-lg transition-colors ${
                    sel ? 'bg-gold text-[#151412] font-bold' : past ? 'text-white/12 cursor-not-allowed' : tod ? 'text-gold font-semibold hover:bg-gold/10' : 'text-cream/80 hover:bg-white/5 hover:text-gold'
                  }`}
                >{cell.day}</button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="px-4 py-3 border-t border-gold/5 flex justify-between">
            <button type="button" onClick={() => { setSelectedDate(today); setViewMonth(today.getMonth()); setViewYear(today.getFullYear()); }} className="px-4 py-1.5 rounded-lg border border-white/10 text-xs text-muted-foreground hover:text-white transition-colors">Clear</button>
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-1.5 rounded-lg border border-gold/20 text-xs text-gold hover:bg-gold/10 transition-colors">Set date ↗</button>
          </div>
        </div>
      )}
    </div>
  );
}

