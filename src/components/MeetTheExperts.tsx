import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Globe,
  Linkedin,
  MapPin,
  X,
} from 'lucide-react';

import rufusImg from '@/src/assets/images/Rufus portfolio.jpg';
import theophilusImg from '@/src/assets/images/Theo portfolio.jpg';
import kikaImg from '@/src/assets/images/Kika portfolio.jpg';

export interface ExpertProfile {
  id: string;
  index: string;
  name: string;
  role: string;
  location: string;
  portrait: string;
  bio: string;
  focusAreas: string[];
  featured?: boolean;
  linkedinUrl: string;
  portfolioUrl: string;
  blogTrackPage: string;
  signatureOutcome: string;
  selectedWorks: {
    title: string;
    scope: string;
    outcome: string;
  }[];
}

const EXPERTS: ExpertProfile[] = [
  {
    id: 'theophilus-bello',
    index: '01',
    name: 'Theophilus Bello',
    role: 'Co-Founder & CEO',
    location: 'Lagos, Nigeria',
    portrait: theophilusImg,
    featured: true,
    bio: 'Directs enterprise systems strategy, spatial GIS intelligence, and event-driven automation programs that replace manual operations with real-time decision infrastructure.',
    focusAreas: ['Enterprise Strategy', 'Geospatial GIS', 'Workflow Automation'],
    linkedinUrl: 'https://www.linkedin.com/in/theophilus-bello',
    portfolioUrl: 'https://reliabilityiq.com/team/theophilus-bello',
    blogTrackPage: 'blog-automate',
    signatureOutcome: '42 hrs/week saved across automated reconciliation workflows',
    selectedWorks: [
      {
        title: 'Multi-Region Cloud & Fleet GIS Telemetry',
        scope: 'Geospatial Mapping & Ops Intelligence',
        outcome: '27% reduction in idle dispatch hours within 10 weeks of rollout.',
      },
      {
        title: 'Event-Driven Settlement Reconciliation Pipeline',
        scope: 'Enterprise Workflow Automation',
        outcome: 'Eliminated weekly manual CSV audits with immutable exception logs.',
      },
    ],
  },
  {
    id: 'rufus-adeyemi',
    index: '02',
    name: 'Rufus Adeyemi',
    role: 'Co-Founder & Lead Developer',
    location: 'Lagos, Nigeria',
    portrait: rufusImg,
    bio: 'Architects fault-tolerant APIs, zero-downtime deployment pipelines, and high-concurrency web platforms engineered for mission-critical enterprise workloads.',
    focusAreas: ['Distributed APIs', 'Cloud Reliability', 'Full-Stack Systems'],
    linkedinUrl: 'https://www.linkedin.com/in/rufus-adeyemi',
    portfolioUrl: 'https://reliabilityiq.com/team/rufus-adeyemi',
    blogTrackPage: 'blog-develop',
    signatureOutcome: '99.98% API availability across 14M+ monthly requests',
    selectedWorks: [
      {
        title: 'Idempotent Payment & Onboarding Gateway',
        scope: 'Core Backend Architecture',
        outcome: 'Sustained zero duplicate transactions under intermittent network retries.',
      },
      {
        title: 'Departmental AI Prompt Governance Lab',
        scope: 'Applied AI Enablement',
        outcome: '91% active team tool adoption tracked 90 days post-training.',
      },
    ],
  },
  {
    id: 'kika-okonkwo',
    index: '03',
    name: 'Kika Okonkwo',
    role: 'Co-Founder & Head of Product',
    location: 'Lagos, Nigeria',
    portrait: kikaImg,
    bio: 'Leads AI data readiness, human-centered interface engineering, and sub-second operations portals tailored for both executive teams and bandwidth-constrained field crews.',
    focusAreas: ['AI Data Readiness', 'Product Design', 'Web Performance'],
    linkedinUrl: 'https://www.linkedin.com/in/kika-okonkwo',
    portfolioUrl: 'https://reliabilityiq.com/team/kika-okonkwo',
    blogTrackPage: 'blog-train',
    signatureOutcome: '3.4x faster enterprise AI adoption across 6 cohorts',
    selectedWorks: [
      {
        title: 'Enterprise Data Hygiene & Evaluation Curriculum',
        scope: 'AI Training & Readiness',
        outcome: 'Standardized messy spreadsheets into 50-query domain benchmarks.',
      },
      {
        title: 'Sub-Second Field Operations Console',
        scope: 'Frontend Performance & UX',
        outcome: '1.1s median time-to-interactive on throttled 3G mobile tablets.',
      },
    ],
  },
];

interface MeetTheExpertsProps {
  onNavigate?: (page: string) => void;
}

export const MeetTheExperts: React.FC<MeetTheExpertsProps> = ({ onNavigate }) => {
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  const [brokenPortraits, setBrokenPortraits] = useState<Record<string, boolean>>({});

  const featuredExpert = EXPERTS[0];
  const secondaryExperts = EXPERTS.slice(1);

  const renderPortrait = (expert: ExpertProfile, aspectClass: string) => {
    const isBroken = brokenPortraits[expert.id];
    if (isBroken) {
      return (
        <div
          className={`${aspectClass} w-full rounded-[18px] bg-gradient-to-br from-blue-100/80 via-sky-50 to-indigo-100/70 dark:from-[#163060] dark:via-[#0f2247] dark:to-[#193569] border border-border-primary flex flex-col items-center justify-center gap-2 p-6`}
        >
          <span className="text-3xl font-extrabold tracking-tight text-accent">
            {expert.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
          <span className="text-xs font-mono text-text-secondary">{expert.role}</span>
        </div>
      );
    }

    return (
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-[18px] bg-sky-100/60 dark:bg-[#0d2042] border border-white/75 dark:border-white/15`}
      >
        <img
          src={expert.portrait}
          alt={`${expert.name} — ${expert.role}`}
          referrerPolicy="no-referrer"
          onError={() =>
            setBrokenPortraits((prev) => ({
              ...prev,
              [expert.id]: true,
            }))
          }
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07142b]/30 via-transparent to-white/15"
        />
      </div>
    );
  };

  return (
    <section
      aria-labelledby="meet-experts-heading"
      className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] font-semibold text-accent mb-2.5">
              Leadership &amp; Engineering Team
            </p>
            <h2
              id="meet-experts-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-text-primary leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Meet the Experts
            </h2>
          </div>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
            The co-founders and systems architects behind ReliabilityIQ Ventures—uniting software reliability, spatial analytics, and practical AI enablement.
          </p>
        </div>

        {/* Asymmetric Frosted Glass Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          {/* Featured Co-Founder Split Card (Full 12 Columns) */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 group relative overflow-hidden frosted-panel-elevated rounded-[28px] p-4 sm:p-6 lg:p-7"
          >
            <div aria-hidden="true" className="absolute inset-0 glass-reflection" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-5">
                {renderPortrait(featuredExpert, 'aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]')}
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between py-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-secondary mb-3 tabular-nums">
                    <span className="font-semibold text-accent">{featuredExpert.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredExpert.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} strokeWidth={1.75} className="text-accent" />
                      {featuredExpert.location}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-3">
                    {featuredExpert.name}
                  </h3>

                  <p className="text-sm sm:text-[15.5px] text-text-secondary leading-relaxed mb-5 max-w-2xl">
                    {featuredExpert.bio}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-text-primary/85 mb-6">
                    {featuredExpert.focusAreas.map((area, idx) => (
                      <React.Fragment key={area}>
                        {idx > 0 && (
                          <span aria-hidden="true" className="text-text-secondary/50">
                            ·
                          </span>
                        )}
                        <span>{area}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-text-secondary tabular-nums">
                    {featuredExpert.signatureOutcome}
                  </span>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={featuredExpert.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${featuredExpert.name} on LinkedIn`}
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full frosted-panel text-xs font-semibold text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <Linkedin size={15} strokeWidth={1.75} className="text-accent" />
                      <span>LinkedIn</span>
                      <ArrowUpRight size={13} strokeWidth={1.75} className="opacity-70" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedExpert(featuredExpert)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent hover:brightness-110 text-white text-xs font-semibold shadow-[0_8px_22px_-6px_rgba(29,108,224,0.42)] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <Briefcase size={14} strokeWidth={1.75} />
                      <span>View Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Secondary Co-Founder Glass Profile Cards (6 Columns Each) */}
          {secondaryExperts.map((expert, idx) => (
            <motion.article
              key={expert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 group relative overflow-hidden frosted-panel rounded-[26px] p-4 sm:p-6 flex flex-col justify-between gap-5"
            >
              <div aria-hidden="true" className="absolute inset-0 glass-reflection" />
              <div className="relative z-10">
                {renderPortrait(expert, 'aspect-[16/10] mb-5')}

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-secondary mb-2.5 tabular-nums">
                  <span className="font-semibold text-accent">{expert.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{expert.role}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight mb-2.5">
                  {expert.name}
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {expert.bio}
                </p>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-text-primary/85">
                  {expert.focusAreas.map((area, aIdx) => (
                    <React.Fragment key={area}>
                      {aIdx > 0 && (
                        <span aria-hidden="true" className="text-text-secondary/50">
                          ·
                        </span>
                      )}
                      <span>{area}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2.5">
                <a
                  href={expert.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${expert.name} on LinkedIn`}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 dark:bg-white/10 border border-border-primary text-xs font-semibold text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Linkedin size={15} strokeWidth={1.75} className="text-accent" />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} strokeWidth={1.75} className="opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedExpert(expert)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:brightness-110 text-white text-xs font-semibold shadow-[0_8px_20px_-6px_rgba(29,108,224,0.36)] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Briefcase size={14} strokeWidth={1.75} />
                  <span>Portfolio</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Expert Portfolio & Selected Engagements Frosted Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <div
            className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="expert-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpert(null)}
              className="absolute inset-0 bg-[#07142b]/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl frosted-panel-elevated rounded-t-[30px] sm:rounded-[28px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="w-10 h-1.5 rounded-full bg-text-secondary/25 mx-auto mb-4 sm:hidden" />

              <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-border-subtle">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={selectedExpert.portrait}
                    alt={selectedExpert.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover object-top border border-border-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold text-accent truncate">
                      {selectedExpert.role}
                    </p>
                    <h3
                      id="expert-modal-title"
                      className="text-xl font-extrabold text-text-primary truncate"
                    >
                      {selectedExpert.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExpert(null)}
                  aria-label="Close expert portfolio"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full frosted-panel text-text-primary hover:text-accent cursor-pointer shrink-0"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {selectedExpert.bio}
              </p>

              <div className="space-y-4 mb-6">
                <p className="font-mono text-xs uppercase tracking-wider font-semibold text-accent">
                  Selected Work &amp; Impact
                </p>
                {selectedExpert.selectedWorks.map((work) => (
                  <div
                    key={work.title}
                    className="frosted-panel rounded-2xl p-4 space-y-1.5"
                  >
                    <div className="text-xs font-mono text-text-secondary">{work.scope}</div>
                    <h4 className="text-sm font-bold text-text-primary">{work.title}</h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {work.outcome}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={selectedExpert.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full frosted-panel text-xs font-semibold text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0"
                  >
                    <Linkedin size={14} strokeWidth={1.75} className="text-accent" />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href={selectedExpert.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full frosted-panel text-xs font-semibold text-text-primary hover:text-accent transition-colors whitespace-nowrap shrink-0"
                  >
                    <Globe size={14} strokeWidth={1.75} className="text-accent" />
                    <span>Portfolio</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      const target = selectedExpert.blogTrackPage;
                      setSelectedExpert(null);
                      onNavigate(target);
                    }}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent hover:brightness-110 text-white text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookOpen size={14} strokeWidth={1.75} />
                    <span>Read Dispatches</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
