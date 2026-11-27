import React, { useMemo, useState } from 'react';
import {
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  ArrowRight,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSectionFlow } from './SectionFlow';

interface ServiceOption {
  id: string;
  title: string;
  duration: string;
  target: string;
  summary: string;
  deliverables: string[];
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'digital-platforms',
    title: 'Digital Platforms & Web Systems',
    duration: '1 hour',
    target: 'service-branding',
    summary:
      'End-to-end architecture for high-converting websites, Android applications, CMS platforms, and resilient cloud backends.',
    deliverables: ['System Architecture Plan', 'UI/UX Prototype Scope', 'Performance & SEO Audit'],
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent AI Automation',
    duration: '1 hour',
    target: 'service-automation',
    summary:
      'Custom AI workflow orchestration, automated lead triage, smart customer agents, and CRM/ERP process pipelines.',
    deliverables: ['Workflow Bottleneck Map', 'Agent & API Blueprint', 'ROI & Deployment Timeline'],
  },
  {
    id: 'gis-mapping',
    title: 'Geospatial GIS Mapping',
    duration: '45 minutes',
    target: 'service-gis',
    summary:
      'Location-based intelligence, utility & logistics corridor mapping, spatial analytics, and satellite ground-truthing.',
    deliverables: ['Spatial Data Assessment', 'Layer & Mapping Scope', 'Analytics Dashboard Plan'],
  },
  {
    id: 'technical-documentation',
    title: 'Technical Documentation',
    duration: '45 minutes',
    target: 'service-documentation',
    summary:
      'Developer-friendly API references, SDK onboarding guides, SOC2/ISO readiness reports, and system specs.',
    deliverables: ['Documentation Audit', 'Information Architecture', 'Docs-as-Code Pipeline'],
  },
  {
    id: 'ai-animation',
    title: 'AI Animation & Motion Studio',
    duration: '1 hour',
    target: 'service-animation',
    summary:
      'Generative video production, product launch commercials, character-consistent storytelling, and motion design.',
    deliverables: ['Creative Storyboard Brief', 'Production Pipeline Spec', 'Asset Delivery Schedule'],
  },
  {
    id: 'social-advertising',
    title: 'Social Media Advertising',
    duration: '45 minutes',
    target: 'service-social',
    summary:
      'Targeted multi-channel growth campaigns across TikTok, X (Twitter), Instagram, and LinkedIn with conversion tracking.',
    deliverables: ['Audience & Funnel Audit', 'Creative Testing Matrix', 'Attribution Setup'],
  },
  {
    id: 'web-operations',
    title: 'Cloud & Web Operations Audit',
    duration: '1 hour',
    target: 'service-development',
    summary:
      'Proactive bug diagnostics, edge CDN security hardening, uptime monitoring, and zero-downtime infrastructure scaling.',
    deliverables: ['Reliability & Security Scan', 'Failover Architecture', 'SLA Monitoring Plan'],
  },
  {
    id: 'enterprise-advisory',
    title: 'Custom Enterprise Advisory',
    duration: '1 hour',
    target: 'contact',
    summary:
      'Tailored multi-disciplinary strategy combining engineering, spatial data, AI tooling, and team enablement.',
    deliverables: ['Cross-System Roadmap', 'Resource & Cost Estimate', 'Dedicated Delivery Lead'],
  },
];

const TIME_SLOTS = [
  '9:00 am',
  '10:00 am',
  '11:00 am',
  '12:00 pm',
  '1:00 pm',
  '2:00 pm',
  '3:00 pm',
  '4:00 pm',
  '5:00 pm',
];

const TIMEZONES = [
  'West Africa Time (WAT, Lagos)',
  'Greenwich Mean Time (GMT, London)',
  'Eastern Time (US & Canada)',
  'Central Time (US & Canada)',
  'Central European Time (CET)',
];

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const EngineeredServicesSection = ({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) => {
  const { ref: sectionFlowRef, style: sectionFlowStyle } = useSectionFlow({ mode: 'fade' });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICE_OPTIONS[0].id);
  const [infoModalService, setInfoModalService] = useState<ServiceOption | null>(null);
  const [showPrivacyNote, setShowPrivacyNote] = useState(false);

  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const initial = new Date(today);
    initial.setDate(today.getDate() + 1);
    return initial;
  });
  const [selectedTime, setSelectedTime] = useState<string>('12:00 pm');
  const [timezone, setTimezone] = useState<string>(TIMEZONES[0]);

  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const selectedService =
    SERVICE_OPTIONS.find((s) => s.id === selectedServiceId) || SERVICE_OPTIONS[0];

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const cells: { date: Date; inCurrentMonth: boolean }[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      cells.push({
        date: new Date(viewYear, viewMonth - 1, daysInPrevMonth - i),
        inCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({
        date: new Date(viewYear, viewMonth, day),
        inCurrentMonth: true,
      });
    }

    const remaining = (7 - (cells.length % 7)) % 7;
    for (let nextDay = 1; nextDay <= remaining; nextDay++) {
      cells.push({
        date: new Date(viewYear, viewMonth + 1, nextDay),
        inCurrentMonth: false,
      });
    }

    return cells;
  }, [viewMonth, viewYear]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!details.name.trim()) {
      setFormError('Please enter your name to complete your booking.');
      return;
    }
    if (!details.email.trim() || !/\S+@\S+\.\S+/.test(details.email)) {
      setFormError('Please enter a valid work or personal email address.');
      return;
    }
    if (!details.phone.trim()) {
      setFormError('Please provide a contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: details.name.trim(),
          email: details.email.trim(),
          service: `${selectedService.title} (${selectedService.duration})`,
          details: `Consultation Booking: ${formattedSelectedDate} at ${selectedTime} (${timezone})\nPhone: ${details.phone.trim()}\nNotes: ${details.notes.trim() || 'None'}`,
          message: `Consultation Booking: ${formattedSelectedDate} at ${selectedTime} (${timezone})`,
        }),
      });
      setBookingConfirmed(true);
    } catch {
      setBookingConfirmed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      ref={sectionFlowRef}
      style={sectionFlowStyle}
      className="relative bg-transparent py-20 md:py-24 px-4 sm:px-6 text-text-primary transition-colors duration-500 overflow-hidden border-t border-border-subtle"
    >
      {/* Subtle Ambient Light Pools */}
      <div className="absolute top-12 left-1/4 w-[460px] h-[460px] bg-white/60 dark:bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[420px] h-[420px] bg-sky-200/45 dark:bg-sky-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <form onSubmit={handleBookNow} className="space-y-11">
          {/* 1. Select Service */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-accent tracking-tight mb-5">
              Select Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="radiogroup" aria-label="Select Service">
              {SERVICE_OPTIONS.map((service, idx) => {
                const isSelected = service.id === selectedServiceId;
                return (
                  <div
                    key={service.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setBookingConfirmed(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedServiceId(service.id);
                        setBookingConfirmed(false);
                      }
                    }}
                    className={`rounded-xl px-5 py-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 select-none ${
                      isSelected
                        ? 'text-white border border-white/55 backdrop-blur-xl shadow-[0_16px_34px_-8px_rgba(29,108,224,0.48),inset_0_1.5px_1px_rgba(255,255,255,0.55)] bg-gradient-to-br from-[#2563eb]/90 via-[#1d6ce0]/88 to-[#0ea5e9]/86'
                        : 'frosted-panel liquid-hover-sheen hover:border-accent/45 hover:-translate-y-0.5 text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-white text-accent'
                            : 'border border-text-secondary/35 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`text-sm font-semibold truncate ${
                            isSelected ? 'text-white' : 'text-text-primary'
                          }`}
                        >
                          {service.title}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'text-white/85' : 'text-text-secondary'
                          }`}
                        >
                          {service.duration}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoModalService(service);
                      }}
                      aria-label={`View details for ${service.title}`}
                      title={`Click to view ${service.title} details`}
                      className="group/info relative w-8 h-8 rounded-full p-[2.5px] flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-115 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {/* Soft multi-colored ambient liquid aura */}
                      <span
                        aria-hidden="true"
                        style={{ animationDelay: `${idx * -0.4}s` }}
                        className="liquid-glass-halo absolute -inset-[2px] rounded-full blur-[5px] opacity-75 group-hover/info:opacity-100 transition-opacity duration-300 pointer-events-none"
                      />
                      {/* Crisp rolling multi-colored prism light rim */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                      >
                        <span
                          style={{ animationDelay: `${idx * -0.4}s` }}
                          className="liquid-glass-ring-gradient absolute -inset-[55%] block"
                        />
                      </span>
                      {/* Glossy frosted liquid glass core */}
                      <span
                        className={`liquid-glass-core relative z-10 w-full h-full rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'text-accent'
                            : 'text-[#0f2547] dark:text-white group-hover/info:text-accent'
                        }`}
                      >
                        <Info size={14} strokeWidth={2.5} />
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Select Time */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-accent tracking-tight mb-5">
              Select Time
            </h2>

            <div className="frosted-panel-elevated rounded-2xl overflow-hidden flex flex-col md:flex-row">
              {/* Calendar Column */}
              <div className="md:w-[48%] p-5 sm:p-6 md:border-r border-border-subtle">
                <div className="flex items-center justify-between mb-5">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-sky-100/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-bold text-text-primary">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    aria-label="Next month"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-sky-100/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                  {WEEKDAYS.map((day) => (
                    <span
                      key={day}
                      className="text-[10px] font-semibold tracking-wider text-text-secondary/75"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1.5 text-center">
                  {calendarCells.map(({ date, inCurrentMonth }, idx) => {
                    const isPast = date < today;
                    const isChosen = isSameDay(date, selectedDate);
                    return (
                      <div key={idx} className="flex items-center justify-center">
                        <button
                          type="button"
                          disabled={isPast}
                          onClick={() => {
                            setSelectedDate(date);
                            setViewMonth(date.getMonth());
                            setViewYear(date.getFullYear());
                            setBookingConfirmed(false);
                          }}
                          className={`w-8 h-8 rounded-full text-xs font-medium tabular-nums flex items-center justify-center transition-all ${
                            isChosen
                              ? 'bg-accent text-white font-bold shadow-sm'
                              : isPast
                                ? 'text-text-secondary/30 cursor-not-allowed'
                                : inCurrentMonth
                                  ? 'text-text-primary hover:bg-sky-100/80 dark:hover:bg-white/10 cursor-pointer'
                                  : 'text-text-secondary/45 hover:bg-sky-100/50 dark:hover:bg-white/5 cursor-pointer'
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots + Timezone Column */}
              <div className="md:w-[52%] p-5 sm:p-6 flex flex-col justify-between gap-5">
                <div className="grid grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const active = slot === selectedTime;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedTime(slot);
                          setBookingConfirmed(false);
                        }}
                        className={`py-2.5 px-2 rounded-lg text-xs font-semibold tabular-nums transition-all cursor-pointer ${
                          active
                            ? 'crystal-button !rounded-lg text-white'
                            : 'liquid-input hover:border-accent/50 text-accent dark:text-sky-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                {/* Timezone Selector Bar */}
                <div className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl liquid-input text-xs">
                  <Info size={14} className="text-accent shrink-0" />
                  <span className="text-text-secondary whitespace-nowrap shrink-0">
                    All times are in
                  </span>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    aria-label="Select timezone"
                    className="flex-1 min-w-0 bg-transparent font-semibold text-accent dark:text-sky-300 outline-none appearance-none pr-5 cursor-pointer truncate"
                  >
                    {TIMEZONES.map((tz) => (
                      <option
                        key={tz}
                        value={tz}
                        className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]"
                      >
                        {tz}
                      </option>
                    ))}
                  </select>
                  <ChevronRight
                    size={14}
                    className="text-accent pointer-events-none shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Add your details */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-accent tracking-tight mb-5">
              Add your details
            </h2>

            <div className="frosted-panel-elevated rounded-2xl p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                {/* Left Stacked Inputs */}
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl liquid-input focus-within:!border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                    <span className="w-14 shrink-0 text-xs font-medium text-text-secondary">
                      Name
                    </span>
                    <input
                      type="text"
                      value={details.name}
                      onChange={(e) =>
                        setDetails((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Bettie Morton"
                      className="flex-1 min-w-0 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-secondary/45 outline-none"
                    />
                  </label>

                  <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl liquid-input focus-within:!border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                    <span className="w-14 shrink-0 text-xs font-medium text-text-secondary">
                      Email
                    </span>
                    <input
                      type="email"
                      value={details.email}
                      onChange={(e) =>
                        setDetails((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="name@company.com"
                      className="flex-1 min-w-0 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-secondary/45 outline-none"
                    />
                  </label>

                  <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl liquid-input focus-within:!border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                    <span className="w-14 shrink-0 text-xs font-medium text-text-secondary">
                      Phone
                    </span>
                    <input
                      type="tel"
                      value={details.phone}
                      onChange={(e) =>
                        setDetails((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="+234 907 593 4287"
                      className="flex-1 min-w-0 bg-transparent text-sm font-medium text-text-primary placeholder:text-text-secondary/45 outline-none"
                    />
                  </label>
                </div>

                {/* Right Special Requests Notice + Notes */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl frosted-panel text-xs font-medium text-accent dark:text-sky-300">
                    <HelpCircle size={15} className="shrink-0" />
                    <span>Please let us know if you have any special requests.</span>
                  </div>

                  <textarea
                    value={details.notes}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, notes: e.target.value }))
                    }
                    placeholder="Notes (optional)"
                    rows={3}
                    className="flex-1 w-full px-4 py-3 rounded-xl liquid-input focus:!border-accent focus:ring-2 focus:ring-accent/20 text-sm font-medium text-text-primary placeholder:text-text-secondary/50 outline-none resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback / Confirmation */}
          <AnimatePresence>
            {formError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs sm:text-sm font-medium text-red-600 dark:text-red-400"
              >
                {formError}
              </motion.p>
            )}

            {bookingConfirmed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="frosted-panel-elevated rounded-2xl p-5 sm:p-6 border border-emerald-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-text-primary">
                      Session Request Confirmed — {selectedService.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-secondary">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} className="text-accent" />
                        {formattedSelectedDate}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} className="text-accent" />
                        {selectedTime} ({selectedService.duration})
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Globe size={13} className="text-accent" />
                        {timezone}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(selectedService.target)}
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Service Overview</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Privacy & Book Now CTA */}
          <div className="flex flex-col items-center text-center gap-4 pt-1">
            <p className="text-xs text-text-secondary">
              By clicking below you agree to these{' '}
              <button
                type="button"
                onClick={() => setShowPrivacyNote((prev) => !prev)}
                className="text-accent font-medium hover:underline cursor-pointer"
              >
                Privacy Policies
              </button>
              .
            </p>

            {showPrivacyNote && (
              <div className="max-w-md frosted-panel rounded-xl px-4 py-3 text-xs text-text-secondary leading-relaxed">
                Your contact details and consultation preferences are used solely by
                ReliabilityIQ Ventures to schedule and prepare your requested session.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto sm:min-w-[260px] px-10 py-3.5 crystal-button !rounded-xl liquid-hover-sheen text-white font-semibold text-sm sm:text-base hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? 'Scheduling...' : 'Book Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Service Details Modal triggered by (i) button */}
      <AnimatePresence>
        {infoModalService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInfoModalService(null)}
            className="fixed inset-0 z-50 bg-[#07142b]/45 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md frosted-panel-elevated rounded-2xl p-6 relative"
            >
              <button
                type="button"
                onClick={() => setInfoModalService(null)}
                aria-label="Close service info"
                className="absolute top-4 right-4 w-8 h-8 rounded-full frosted-panel flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <X size={15} />
              </button>

              <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1.5">
                {infoModalService.duration} Consultation
              </p>
              <h3 className="text-xl font-bold text-text-primary mb-2.5 pr-8">
                {infoModalService.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {infoModalService.summary}
              </p>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Session Deliverables
                </p>
                {infoModalService.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-medium text-text-primary"
                  >
                    <Check size={14} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedServiceId(infoModalService.id);
                    setInfoModalService(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer"
                >
                  Select This Service
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = infoModalService.target;
                    setInfoModalService(null);
                    onNavigate(target);
                  }}
                  className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Capability Page</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
