import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  Link2,
  MessageSquare,
  PenSquare,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';

import { GlassPanel, GlassCard } from './glass';

import blogDevelopCover from '@/src/assets/images/blog_develop_architecture_1795561614401.jpg';
import blogTrainCover from '@/src/assets/images/blog_train_workshop_1795561614206.jpg';
import blogAutomateCover from '@/src/assets/images/blog_automate_analytics_1795561614862.jpg';
import trendingInfraImg from '@/src/assets/images/trending_infra_1787603632437.jpg';
import trendingWebImg from '@/src/assets/images/trending_web_design_1787603569100.jpg';
import trendingAiAutoImg from '@/src/assets/images/trending_ai_auto_1787603581694.jpg';
import heroSpatialGlass from '@/src/assets/images/hero_spatial_glass_1795462668998.jpg';

import rufusImg from '@/src/assets/images/Rufus portfolio.jpg';
import theophilusImg from '@/src/assets/images/Theo portfolio.jpg';
import kikaImg from '@/src/assets/images/Kika portfolio.jpg';

export type BlogTrack = 'all' | 'develop' | 'train' | 'automate';

export interface BlogArticle {
  id: string;
  track: 'develop' | 'train' | 'automate';
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  publishedAt: string;
  timestamp: number;
  readMinutes: number;
  impactMetric: string;
  impactContext: string;
  featured?: boolean;
  isCustom?: boolean;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  takeaways: string[];
}

interface ArticleComment {
  id: string;
  author: string;
  role: string;
  body: string;
  createdAt: string;
}

const TRACK_META: Record<
  BlogTrack,
  {
    eyebrow: string;
    headline: string;
    description: string;
    relatedServicePage: string;
    relatedServiceLabel: string;
  }
> = {
  all: {
    eyebrow: 'ReliabilityIQ News Room',
    headline: 'Engineering Dispatches Across Software, AI & Automation',
    description:
      'Architecture notes, implementation playbooks, and operational benchmarks written directly from our Lagos engineering, training, and automation engagements.',
    relatedServicePage: 'services',
    relatedServiceLabel: 'Explore All Services',
  },
  develop: {
    eyebrow: 'ReliabilityIQ News Room',
    headline: 'Custom Software & Resilient Application Development',
    description:
      'Deep dives into fault-tolerant APIs, multi-region cloud systems, and high-speed web platforms built to sustain demanding enterprise traffic.',
    relatedServicePage: 'service-development',
    relatedServiceLabel: 'View Web Operations Service',
  },
  train: {
    eyebrow: 'ReliabilityIQ News Room',
    headline: 'Enterprise AI Training & Data Readiness',
    description:
      'Practical frameworks for structuring messy enterprise datasets, calibrating domain-specific AI workflows, and upskilling technical teams.',
    relatedServicePage: 'service-automation',
    relatedServiceLabel: 'View AI Training & Automation',
  },
  automate: {
    eyebrow: 'ReliabilityIQ News Room',
    headline: 'Workflow Automation & Real-Time Data Analytics',
    description:
      'Playbooks for replacing manual spreadsheet reconciliation with event-driven pipelines, geospatial telemetry, and live decision dashboards.',
    relatedServicePage: 'service-gis',
    relatedServiceLabel: 'View Analytics & GIS Solutions',
  },
};

const COVER_PRESETS: Record<'develop' | 'train' | 'automate', string> = {
  develop: blogDevelopCover,
  train: blogTrainCover,
  automate: blogAutomateCover,
};

const INITIAL_ARTICLES: BlogArticle[] = [
  {
    id: 'zero-downtime-api-architectures',
    track: 'develop',
    featured: true,
    title: 'Zero-Downtime API Architectures for High-Volume Digital Platforms',
    excerpt:
      'How idempotent request pipelines, edge circuit breakers, and blue-green database migrations keep enterprise software responsive under peak transactional load.',
    coverImage: blogDevelopCover,
    author: 'Rufus Adeyemi',
    authorRole: 'Co-Founder & Lead Developer',
    authorAvatar: rufusImg,
    publishedAt: 'November 18, 2026',
    timestamp: 1795000000000,
    readMinutes: 7,
    impactMetric: '99.98% Uptime Over 12 Months',
    impactContext: 'Measured across 14M+ monthly API requests after queue isolation rollout.',
    sections: [
      {
        heading: '01. Designing for Partial Failure Before Peak Traffic Arrives',
        paragraphs: [
          'Most enterprise platform outages do not begin with catastrophic server failure. They start with subtle downstream latency spikes that quietly exhaust worker connection pools across synchronous API chains.',
          'When rebuilding core payment and client-onboarding APIs, our engineering team separates latency-sensitive user confirmation paths from asynchronous enrichment tasks. By placing bounded timeouts and deterministic fallback responses around third-party integrations, customer-facing endpoints remain predictable even when external gateways degrade.',
        ],
      },
      {
        heading: '02. Idempotency Keys & Safe Schema Evolution',
        paragraphs: [
          'Mobile networks and intermittent client connections naturally trigger duplicate retries. Enforcing strict idempotency keys backed by fast Redis-style deduplication guarantees that retried requests never create double bookings or duplicate ledger entries.',
          'On the persistence layer, every schema migration follows an expand-and-contract pattern: additive nullable columns deploy before application writes switch over, eliminating table locks during live deployments.',
        ],
      },
    ],
    takeaways: [
      'Isolate slow third-party webhooks behind bounded queues with exponential backoff.',
      'Ship schema migrations in backward-compatible two-step releases to avoid write locks.',
      'Pair synthetic latency probes with per-endpoint error budgets instead of aggregate CPU alerts.',
    ],
  },
  {
    id: 'enterprise-data-readiness-before-ai',
    track: 'train',
    featured: true,
    title: 'From Raw Spreadsheets to AI Readiness: Auditing Data Before Model Training',
    excerpt:
      'Why 80% of organizational AI initiatives stall at data hygiene—and the four-stage readiness curriculum we run with technical and operations teams.',
    coverImage: blogTrainCover,
    author: 'Kika Okonkwo',
    authorRole: 'Co-Founder & Head of Product',
    authorAvatar: kikaImg,
    publishedAt: 'November 12, 2026',
    timestamp: 1794500000000,
    readMinutes: 6,
    impactMetric: '3.4x Faster Team Adoption in 8 Weeks',
    impactContext: 'Observed across 6 enterprise cohorts completing hands-on data readiness labs.',
    sections: [
      {
        heading: '01. Closing the Gap Between Model Capability and Operational Reality',
        paragraphs: [
          'Organizations frequently rush toward model selection while overlooking fragmented naming conventions, inconsistent timestamp formats, and undocumented manual overrides sitting inside departmental spreadsheets.',
          'During our executive and engineering training cohorts, teams spend their first sessions mapping where institutional knowledge actually lives. Before introducing retrieval pipelines or prompt evaluation rubrics, participants build automated schema validation rules against their own historical records.',
        ],
      },
      {
        heading: '02. Hands-On Evaluation Labs Over Passive Slide Decks',
        paragraphs: [
          'Technical upskilling only sticks when staff test tools on live edge cases from their daily workload. Each participant leaves with a curated benchmark suite of 50 real operational queries, paired with clear accuracy thresholds and human-review escalation triggers.',
        ],
      },
    ],
    takeaways: [
      'Standardize entity identifiers and date formats before indexing documents for AI retrieval.',
      'Score model outputs against domain-specific golden test sets curated by subject leads.',
      'Define explicit human-in-the-loop review gates for high-stakes customer or financial decisions.',
    ],
  },
  {
    id: 'event-driven-workflow-automation',
    track: 'automate',
    featured: true,
    title: 'Eliminating Manual Reconciliation with Event-Driven Workflow Automation',
    excerpt:
      'Replacing weekly CSV exports and copy-paste approvals with auditable event pipelines that reconcile operations data in real time.',
    coverImage: blogAutomateCover,
    author: 'Theophilus Bello',
    authorRole: 'Co-Founder & CEO',
    authorAvatar: theophilusImg,
    publishedAt: 'November 6, 2026',
    timestamp: 1794000000000,
    readMinutes: 5,
    impactMetric: '42 Hours Saved Weekly Per Team',
    impactContext: 'Measured 60 days after automating multi-source invoice and dispatch checks.',
    sections: [
      {
        heading: '01. Spotting High-Friction Manual Loops',
        paragraphs: [
          'Across growing enterprises, skilled analysts routinely spend Monday mornings downloading exports from three separate portals, normalizing column headers, and emailing exception sheets to regional managers.',
          'By capturing state changes directly as typed events—order confirmed, dispatch scanned, settlement cleared—an automated pipeline validates totals continuously and routes only genuine anomalies for human review.',
        ],
      },
      {
        heading: '02. Auditability as a First-Class Engineering Feature',
        paragraphs: [
          'Automation builds organizational trust only when every automated decision can be inspected months later. Each workflow step logs structured inputs, transformation rules, and timestamps so finance and compliance teams can trace any record in seconds.',
        ],
      },
    ],
    takeaways: [
      'Target repetitive cross-system handoffs before building complex predictive dashboards.',
      'Attach immutable audit trails and replay capability to every automated rule execution.',
      'Surface concise exception digests to operators instead of noisy all-clear notifications.',
    ],
  },
  {
    id: 'frontend-performance-constrained-networks',
    track: 'develop',
    title: 'Sub-Second Web Dashboards on Variable Mobile & Enterprise Networks',
    excerpt:
      'Practical bundle budgeting, optimistic UI patterns, and asset compression techniques that keep critical operations portals crisp everywhere.',
    coverImage: trendingWebImg,
    author: 'Kika Okonkwo',
    authorRole: 'Co-Founder & Head of Product',
    authorAvatar: kikaImg,
    publishedAt: 'October 28, 2026',
    timestamp: 1793200000000,
    readMinutes: 5,
    impactMetric: '1.1s Median First Interactive',
    impactContext: 'Achieved on 3G-throttled field tablets after code-splitting and image tuning.',
    sections: [
      {
        heading: '01. Respecting Bandwidth Constraints in Real Operations',
        paragraphs: [
          'Software built exclusively on high-speed office fiber often feels sluggish for regional operators working on cellular connections. Trimming non-essential client dependencies, deferring secondary charts, and caching static metadata immediately improves daily usability.',
        ],
      },
    ],
    takeaways: [
      'Keep initial route JavaScript lean by code-splitting secondary views.',
      'Serve responsive image dimensions matched cleanly to container aspect ratios.',
    ],
  },
  {
    id: 'multi-region-cloud-resilience',
    track: 'develop',
    title: 'Designing Cloud Infrastructure Beyond Single-Region Assumptions',
    excerpt:
      'Architectural patterns for automated health checks, stateless edge routing, and predictable failover drills without inflating monthly cloud spend.',
    coverImage: trendingInfraImg,
    author: 'Theophilus Bello',
    authorRole: 'Co-Founder & CEO',
    authorAvatar: theophilusImg,
    publishedAt: 'October 19, 2026',
    timestamp: 1792400000000,
    readMinutes: 8,
    impactMetric: '38% Lower Recovery Time',
    impactContext: 'Validated during quarterly chaos-failover exercises across core services.',
    sections: [
      {
        heading: '01. Practicing Failover Before Incidents Occur',
        paragraphs: [
          'Backup infrastructure that has never been exercised under real traffic is a liability. Lightweight traffic shifting and automated database replica promotion verify recovery runbooks monthly during low-traffic windows.',
        ],
      },
    ],
    takeaways: [
      'Externalize session state so application workers can scale horizontally across zones.',
      'Automate DNS and health-check cutovers and rehearse recovery timelines quarterly.',
    ],
  },
  {
    id: 'practical-ai-upskilling-operations',
    track: 'train',
    title: 'Upskilling Non-Technical Teams to Design and Audit AI Workflows',
    excerpt:
      'How structured prompt libraries, red-teaming exercises, and clear governance rubrics help operations leads ship reliable AI assistants.',
    coverImage: trendingAiAutoImg,
    author: 'Rufus Adeyemi',
    authorRole: 'Co-Founder & Lead Developer',
    authorAvatar: rufusImg,
    publishedAt: 'October 11, 2026',
    timestamp: 1791700000000,
    readMinutes: 4,
    impactMetric: '91% Weekly Active Tool Retention',
    impactContext: 'Tracked 90 days post-training across client support and research desks.',
    sections: [
      {
        heading: '01. Turning Policy Guidelines into Everyday Habits',
        paragraphs: [
          'Generic acceptable-use PDFs rarely change behavior. Guided department workshops give teams concrete templates for summarizing briefs, verifying citations, and redacting sensitive customer identifiers automatically.',
        ],
      },
    ],
    takeaways: [
      'Build shared department prompt templates versioned alongside standard operating manuals.',
      'Train staff to spot hallucinated metrics and verify source links before publishing.',
    ],
  },
  {
    id: 'geospatial-telemetry-operational-intelligence',
    track: 'automate',
    title: 'Geospatial Telemetry & Automated Asset Analytics for Distributed Fleets',
    excerpt:
      'Combining spatial boundary alerts with automated anomaly scoring to turn raw field GPS streams into clear executive action.',
    coverImage: heroSpatialGlass,
    author: 'Theophilus Bello',
    authorRole: 'Co-Founder & CEO',
    authorAvatar: theophilusImg,
    publishedAt: 'October 2, 2026',
    timestamp: 1790900000000,
    readMinutes: 6,
    impactMetric: '27% Reduction in Idle Dispatch Hours',
    impactContext: 'Measured across regional distribution routes within 10 weeks of deployment.',
    sections: [
      {
        heading: '01. From Raw Coordinates to Actionable Exceptions',
        paragraphs: [
          'Raw location pings overwhelm dispatchers unless paired with route corridors, dwell-time thresholds, and automated schedule comparisons. Spatial aggregation highlights genuine delays early while keeping routine transit quiet.',
        ],
      },
    ],
    takeaways: [
      'Aggregate high-frequency telemetry into corridor summaries before rendering maps.',
      'Trigger automated alerts only when dwell times breach historical route baselines.',
    ],
  },
];

const INITIAL_COMMENTS: Record<string, ArticleComment[]> = {
  'zero-downtime-api-architectures': [
    {
      id: 'c-1',
      author: 'Tunde Balogun',
      role: 'Engineering Manager, PayGrid',
      body: 'The two-step expand-and-contract migration rule saved us twice during peak settlement hours this quarter.',
      createdAt: 'November 20, 2026',
    },
  ],
  'enterprise-data-readiness-before-ai': [
    {
      id: 'c-2',
      author: 'Amaka Nwosu',
      role: 'Head of Operations, VerveFlow',
      body: 'Having our analysts build a 50-query golden test set before touching model prompts immediately exposed gaps in our naming taxonomy.',
      createdAt: 'November 14, 2026',
    },
  ],
};

const STORAGE_CUSTOM_POSTS = 'riq_blog_custom_posts_v1';
const STORAGE_BOOKMARKS = 'riq_blog_bookmarks_v1';
const STORAGE_COMMENTS = 'riq_blog_comments_v1';

const PRIMARY_CHAMPAGNE_CTA =
  'bg-[linear-gradient(180deg,rgba(249,240,230,0.96)_0%,rgba(232,213,193,0.92)_100%)] hover:brightness-105 text-[#261B14] border border-white/85 shadow-[0_12px_26px_-10px_rgba(22,14,8,0.45),inset_0_1px_0_rgba(255,255,255,1)]';

const SECONDARY_GLASS_BTN =
  'bg-white/14 hover:bg-white/22 text-white border border-white/35 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]';

interface BlogPageProps {
  initialTrack?: BlogTrack;
  onNavigate: (page: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ initialTrack = 'all', onNavigate }) => {
  const [viewMode, setViewMode] = useState<'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'quickest'>('latest');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // Persisted user-created articles, bookmarks, and comments
  const [customArticles, setCustomArticles] = useState<BlogArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_POSTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [commentsByArticle, setCommentsByArticle] = useState<Record<string, ArticleComment[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMMENTS);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Composer modal state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftAuthorRole, setDraftAuthorRole] = useState('');
  const [draftExcerpt, setDraftExcerpt] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [draftMetric, setDraftMetric] = useState('');
  const [composerError, setComposerError] = useState('');

  // Comment input state
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRole, setCommentRole] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [commentFeedback, setCommentFeedback] = useState('');

  // Brief subscription state
  const [briefEmail, setBriefEmail] = useState('');
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [briefError, setBriefError] = useState('');

  useEffect(() => {
    setViewMode('all');
    setActiveArticleId(null);
  }, [initialTrack]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_POSTS, JSON.stringify(customArticles));
    } catch {
      // Ignore storage quota errors
    }
  }, [customArticles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COMMENTS, JSON.stringify(commentsByArticle));
    } catch {
      // Ignore storage quota errors
    }
  }, [commentsByArticle]);

  useEffect(() => {
    if (!activeArticleId) {
      setReadProgress(0);
      return;
    }
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(100);
        return;
      }
      setReadProgress(Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100))));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeArticleId]);

  const allArticles = useMemo(() => {
    return [...customArticles, ...INITIAL_ARTICLES];
  }, [customArticles]);

  const activeArticle = useMemo(
    () => allArticles.find((a) => a.id === activeArticleId) || null,
    [allArticles, activeArticleId]
  );

  const trackMeta = useMemo(() => {
    if (viewMode === 'saved') {
      return {
        eyebrow: 'Saved Reading List',
        headline: 'Bookmarked Engineering & AI Dispatches',
        description:
          'Your saved ReliabilityIQ field articles and technical reference briefs, available anytime in this browser.',
        relatedServicePage: 'services',
        relatedServiceLabel: 'Explore All Services',
      };
    }
    return TRACK_META[initialTrack];
  }, [viewMode, initialTrack]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = allArticles.filter((article) => {
      if (viewMode === 'saved' && !bookmarks.includes(article.id)) {
        return false;
      }

      if (!q) return true;
      const inSections = article.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(q))
      );
      return (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.authorRole.toLowerCase().includes(q) ||
        inSections
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'quickest') {
        return a.readMinutes - b.readMinutes;
      }
      if (initialTrack !== 'all') {
        const aMatches = a.track === initialTrack ? 1 : 0;
        const bMatches = b.track === initialTrack ? 1 : 0;
        if (aMatches !== bMatches) return bMatches - aMatches;
      }
      return b.timestamp - a.timestamp;
    });
  }, [allArticles, viewMode, initialTrack, bookmarks, searchQuery, sortBy]);

  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    if (initialTrack !== 'all' && !searchQuery.trim() && viewMode === 'all') {
      return filteredArticles.find((a) => a.track === initialTrack) || filteredArticles[0];
    }
    if (!searchQuery.trim() && viewMode === 'all') {
      return filteredArticles.find((a) => a.featured) || filteredArticles[0];
    }
    return filteredArticles[0];
  }, [filteredArticles, initialTrack, searchQuery, viewMode]);

  const remainingArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleOpenArticle = (id: string) => {
    setActiveArticleId(id);
    setCommentFeedback('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyArticleLink = (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#blog`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleViewSwitch = (next: 'all' | 'saved') => {
    setViewMode(next);
    setActiveArticleId(null);
  };

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftExcerpt.trim() || !draftBody.trim()) {
      setComposerError('Please fill in a title, summary, and article content.');
      return;
    }

    const paragraphs = draftBody
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    const words = draftBody.trim().split(/\s+/).length;
    const readMinutes = Math.max(2, Math.ceil(words / 180));

    const fallbackTrack: 'develop' | 'train' | 'automate' =
      initialTrack === 'all' ? 'develop' : initialTrack;

    const newArticle: BlogArticle = {
      id: `custom-${Date.now()}`,
      track: fallbackTrack,
      title: draftTitle.trim(),
      excerpt: draftExcerpt.trim(),
      coverImage: COVER_PRESETS[fallbackTrack],
      author: draftAuthor.trim() || 'ReliabilityIQ Editorial Team',
      authorRole: draftAuthorRole.trim() || 'Co-Founder & Lead Developer',
      publishedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      timestamp: Date.now(),
      readMinutes,
      impactMetric: draftMetric.trim() || 'Production Case Dispatch',
      impactContext: 'Published directly from the ReliabilityIQ News Room.',
      isCustom: true,
      sections: [
        {
          heading: '01. Field Analysis & Architecture Notes',
          paragraphs: paragraphs.length > 0 ? paragraphs : [draftBody.trim()],
        },
      ],
      takeaways: [
        draftExcerpt.trim(),
        'Documented for engineering, operations, and leadership teams.',
      ],
    };

    setCustomArticles((prev) => [newArticle, ...prev]);
    setViewMode('all');
    setDraftTitle('');
    setDraftAuthor('');
    setDraftAuthorRole('');
    setDraftExcerpt('');
    setDraftBody('');
    setDraftMetric('');
    setComposerError('');
    setIsComposerOpen(false);
    setActiveArticleId(newArticle.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCustomArticle = (id: string) => {
    setCustomArticles((prev) => prev.filter((item) => item.id !== id));
    setBookmarks((prev) => prev.filter((item) => item !== id));
    if (activeArticleId === id) {
      setActiveArticleId(null);
    }
  };

  const handleAddComment = (e: React.FormEvent, articleId: string) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentBody.trim()) {
      setCommentFeedback('Enter your name and comment before posting.');
      return;
    }

    const nextComment: ArticleComment = {
      id: `cmt-${Date.now()}`,
      author: commentAuthor.trim(),
      role: commentRole.trim() || 'Reader',
      body: commentBody.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setCommentsByArticle((prev) => ({
      ...prev,
      [articleId]: [nextComment, ...(prev[articleId] || [])],
    }));

    setCommentAuthor('');
    setCommentRole('');
    setCommentBody('');
    setCommentFeedback('Comment published to this article.');
  };

  const handleSubscribeBrief = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(briefEmail.trim())) {
      setBriefError('Please enter a valid work email address.');
      return;
    }
    setBriefError('');
    setBriefSubmitted(true);
    setBriefEmail('');
  };

  const renderArticleVisual = (article: BlogArticle, aspectClass: string) => {
    const isBroken = brokenImages[article.id];
    if (isBroken) {
      return (
        <div className="p-1.5 rounded-[22px] bg-white/12 border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <div
            className={`${aspectClass} w-full rounded-[16px] bg-gradient-to-br from-[#6e5745]/70 via-[#544133]/75 to-[#372a20]/85 flex flex-col justify-between p-6 border border-white/20`}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8D7C5] font-semibold">
              ReliabilityIQ News Room
            </span>
            <p className="text-sm font-semibold text-white line-clamp-2">{article.title}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-1.5 rounded-[22px] bg-white/14 border border-white/32 shadow-[inset_0_1px_0_rgba(255,255,255,0.48),0_8px_22px_-8px_rgba(20,12,8,0.35)]">
        <div
          className={`relative ${aspectClass} w-full overflow-hidden rounded-[16px] bg-[#3b2d23]/60 border border-white/20`}
        >
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setBrokenImages((prev) => ({ ...prev, [article.id]: true }))}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,transparent_42%,rgba(28,18,12,0.18)_100%)]"
          />
        </div>
      </div>
    );
  };

  // Soft Pink & White Gradient Backdrop with Ambient Pastel Glows
  const renderPinkWhiteBackdrop = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute -top-28 -left-20 w-[520px] h-[520px] rounded-full bg-pink-200/60 blur-[120px]" />
      <div className="absolute top-[18%] -right-24 w-[560px] h-[560px] rounded-full bg-rose-100/75 blur-[125px]" />
      <div className="absolute bottom-[-8%] left-[20%] w-[540px] h-[440px] rounded-full bg-pink-100/70 blur-[120px]" />
      <div className="absolute bottom-[12%] right-[12%] w-[420px] h-[420px] rounded-full bg-white/85 blur-[110px]" />
    </div>
  );

  // Full Article Reader View
  if (activeArticle) {
    const relatedArticles = allArticles
      .filter((a) => a.id !== activeArticle.id && a.track === activeArticle.track)
      .concat(allArticles.filter((a) => a.id !== activeArticle.id && a.track !== activeArticle.track))
      .slice(0, 2);

    const articleComments = commentsByArticle[activeArticle.id] || [];
    const isBookmarked = bookmarks.includes(activeArticle.id);

    return (
      <article className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#ffffff] to-[#fce7f3] text-[#2C1F1A] pt-24 sm:pt-28 pb-20 px-4 sm:px-8 relative overflow-hidden">
        {renderPinkWhiteBackdrop()}

        {/* Smooth Champagne Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-white/15 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#f7eadc] via-[#e2c6aa] to-[#b89172] transition-[width] duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Top Action GlassPanel */}
          <GlassPanel className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-7">
            <button
              type="button"
              onClick={() => {
                setActiveArticleId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-h-[44px] inline-flex items-center gap-2.5 px-3.5 rounded-xl text-sm font-medium text-[#FAF5EE] hover:bg-white/14 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={18} strokeWidth={1.65} />
              <span>News Room</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleCopyArticleLink(activeArticle.id)}
                className={`min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${SECONDARY_GLASS_BTN}`}
              >
                {copiedId === activeArticle.id ? (
                  <>
                    <Check size={15} strokeWidth={1.75} className="text-[#D8F3DC]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Link2 size={15} strokeWidth={1.65} />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleBookmark(activeArticle.id)}
                className={`min-h-[44px] inline-flex items-center gap-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isBookmarked ? PRIMARY_CHAMPAGNE_CTA : SECONDARY_GLASS_BTN
                }`}
              >
                <Bookmark
                  size={15}
                  strokeWidth={1.65}
                  className={isBookmarked ? 'fill-current' : ''}
                />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              {activeArticle.isCustom && (
                <button
                  type="button"
                  onClick={() => handleDeleteCustomArticle(activeArticle.id)}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 rounded-xl bg-rose-500/20 border border-rose-200/40 text-xs font-semibold text-rose-100 hover:bg-rose-500/35 transition-colors cursor-pointer shrink-0"
                  title="Delete custom post"
                  aria-label="Delete custom post"
                >
                  <Trash2 size={16} strokeWidth={1.65} />
                </button>
              )}
            </div>
          </GlassPanel>

          {/* Article Header GlassCard */}
          <GlassCard interactive={false} className="p-6 sm:p-9 mb-8 rounded-[28px]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#E4D5C6] mb-4 tabular-nums">
              <span>{activeArticle.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} strokeWidth={1.65} />
                {activeArticle.readMinutes} min read
              </span>
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.14] mb-4"
              style={{ textWrap: 'balance' }}
            >
              {activeArticle.title}
            </h1>

            <p className="text-[15px] sm:text-lg text-[#F4ECE3]/90 leading-relaxed max-w-3xl mb-6">
              {activeArticle.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/18">
              <div className="flex items-center gap-3">
                {activeArticle.authorAvatar ? (
                  <img
                    src={activeArticle.authorAvatar}
                    alt={activeArticle.author}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-white/60 shadow-sm"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-white/18 border border-white/40 text-white font-bold flex items-center justify-center text-sm">
                    {activeArticle.author.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-white">{activeArticle.author}</div>
                  <div className="text-xs text-[#E4D5C6]">{activeArticle.authorRole}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(TRACK_META[activeArticle.track].relatedServicePage)}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-4 rounded-xl text-xs font-semibold text-[#F7EAD9] hover:bg-white/14 border border-white/25 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{TRACK_META[activeArticle.track].relatedServiceLabel}</span>
                <ArrowUpRight size={15} strokeWidth={1.65} />
              </button>
            </div>
          </GlassCard>

          {/* Cover Media */}
          <div className="mb-8">{renderArticleVisual(activeArticle, 'aspect-[16/9]')}</div>

          {/* Quantified Outcome GlassPanel */}
          <GlassPanel className="p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#E8D7C5] font-semibold mb-1">
                Measured Outcome
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                {activeArticle.impactMetric}
              </div>
              <p className="text-sm text-[#EFE5DA]/90 mt-1">{activeArticle.impactContext}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${PRIMARY_CHAMPAGNE_CTA}`}
            >
              <span>Discuss This Architecture</span>
              <ArrowRight size={15} strokeWidth={1.75} />
            </button>
          </GlassPanel>

          {/* Article Body GlassPanel */}
          <GlassPanel className="p-6 sm:p-10 lg:p-12 mb-10 rounded-[28px]">
            <div className="space-y-9">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="max-w-[68ch] space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[15.5px] sm:text-base text-[#F5EDE4]/92 leading-[1.78]"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}

              <div className="pt-8 border-t border-white/18 max-w-[68ch]">
                <h3 className="text-lg font-bold text-white mb-4">Implementation Takeaways</h3>
                <ul className="space-y-3">
                  {activeArticle.takeaways.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-[15px] text-[#F5EDE4]/92"
                    >
                      <span className="font-mono text-xs font-semibold text-[#E8D7C5] mt-1 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>

          {/* Interactive Reader Discussion GlassPanel */}
          <GlassPanel className="p-6 sm:p-8 mb-12 rounded-[28px]">
            <div className="flex items-center gap-2.5 mb-6">
              <MessageSquare size={18} strokeWidth={1.65} className="text-[#F5E6D6]" />
              <h3 className="text-lg font-bold text-white">
                Reader Notes &amp; Discussion ({articleComments.length})
              </h3>
            </div>

            <form
              onSubmit={(e) => handleAddComment(e, activeArticle.id)}
              className="space-y-4 mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your name"
                  className="min-h-[44px] w-full px-4 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <input
                  type="text"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  placeholder="Title or company (optional)"
                  className="min-h-[44px] w-full px-4 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
              <textarea
                rows={3}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Share a question or engineering note on this article..."
                className="w-full px-4 py-3 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#E4D5C6]">{commentFeedback}</span>
                <button
                  type="submit"
                  className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${PRIMARY_CHAMPAGNE_CTA}`}
                >
                  <Send size={14} strokeWidth={1.75} />
                  <span>Post Comment</span>
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {articleComments.length === 0 ? (
                <p className="text-sm text-[#E4D5C6]">
                  No reader notes yet. Start the discussion above.
                </p>
              ) : (
                articleComments.map((cmt) => (
                  <div
                    key={cmt.id}
                    className="pt-4 border-t border-white/16 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#E4D5C6] mb-1.5">
                      <span className="font-semibold text-white text-sm">{cmt.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cmt.role}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cmt.createdAt}</span>
                    </div>
                    <p className="text-sm text-[#F4ECE3]/92 leading-relaxed">{cmt.body}</p>
                  </div>
                ))
              )}
            </div>
          </GlassPanel>

          {/* Continue Reading GlassCards */}
          {relatedArticles.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#2C1F1A]">Continue Reading</h3>
                <button
                  type="button"
                  onClick={() => handleViewSwitch('all')}
                  className="min-h-[44px] px-3 rounded-xl text-xs font-semibold text-[#7C4E3C] hover:bg-white/70 transition-colors cursor-pointer"
                >
                  All Dispatches
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((rel, idx) => (
                  <GlassCard
                    key={rel.id}
                    delay={idx * 0.05}
                    onClick={() => handleOpenArticle(rel.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleOpenArticle(rel.id)}
                    className="group p-5 cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div>
                      {renderArticleVisual(rel, 'aspect-[16/10] mb-4')}
                      <div className="flex items-center gap-2 text-xs font-mono text-[#E4D5C6] mb-2 tabular-nums">
                        <span>{rel.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{rel.readMinutes} min read</span>
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#F8E7D3] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F8E7D3]">
                      <span>Read Article</span>
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </span>
                  </GlassCard>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    );
  }

  // Main News Room View — Pink & White Gradient Canvas with Frosted Champagne/Taupe Glassmorphism
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#ffffff] to-[#fce7f3] text-[#2C1F1A] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {renderPinkWhiteBackdrop()}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Outer Frosted Glass Frame */}
        <GlassPanel className="p-4 sm:p-6 lg:p-8 rounded-[30px]">
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Main Frosted Editorial Stage */}
            <div className="flex-1 min-w-0 w-full">
              {/* Editorial Header */}
              <motion.div
                key={viewMode === 'saved' ? 'saved' : initialTrack}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7"
              >
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#E8D7C5] mb-2.5">
                  {trackMeta.eyebrow}
                </p>
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                  <h1
                    className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-[1.08] max-w-2xl"
                    style={{ textWrap: 'balance' }}
                  >
                    {trackMeta.headline}
                  </h1>
                  <p className="text-sm sm:text-[15px] text-[#EFE5DA]/90 leading-relaxed max-w-md">
                    {trackMeta.description}
                  </p>
                </div>
              </motion.div>

              {/* Control Dock (Selector 2 target) */}
              <div className="champagne-glass-panel rounded-[22px] p-3 sm:p-4 mb-8 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 champagne-glass-specular" />

                <div className="relative z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-black/15 border border-white/20 self-start">
                  {(
                    [
                      { id: 'all', label: 'All Insights' },
                      { id: 'saved', label: `Saved (${bookmarks.length})` },
                    ] as const
                  ).map((tab) => {
                    const isActive = viewMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleViewSwitch(tab.id)}
                        className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                          isActive
                            ? 'bg-white/24 text-white border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]'
                            : 'text-[#E4D5C6] hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1 sm:w-60">
                    <Search
                      size={16}
                      strokeWidth={1.65}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E4D5C6] pointer-events-none"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles, authors..."
                      className="min-h-[44px] w-full pl-9 pr-9 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center text-[#E4D5C6] hover:text-white cursor-pointer"
                      >
                        <X size={15} strokeWidth={1.75} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'latest' | 'quickest')}
                      aria-label="Sort articles"
                      className="min-h-[44px] flex-1 sm:flex-none px-3.5 rounded-2xl champagne-glass-input text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer shrink-0"
                    >
                      <option value="latest" className="bg-[#3d2e24] text-white">
                        Latest First
                      </option>
                      <option value="quickest" className="bg-[#3d2e24] text-white">
                        Quickest Read
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setIsComposerOpen(true)}
                      className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-4 rounded-2xl text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${PRIMARY_CHAMPAGNE_CTA}`}
                    >
                      <PenSquare size={15} strokeWidth={1.75} />
                      <span>Write Post</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {filteredArticles.length === 0 ? (
                <GlassCard interactive={false} className="p-10 sm:p-12 text-center mb-10">
                  <p className="text-lg font-bold text-white mb-2">
                    {viewMode === 'saved' ? 'No saved articles yet' : 'No matching articles found'}
                  </p>
                  <p className="text-sm text-[#EFE5DA]/90 max-w-md mx-auto mb-6">
                    {viewMode === 'saved'
                      ? 'Bookmark any dispatch while browsing to build your personal reference reading list.'
                      : 'Try clearing your search filter to view all articles.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      handleViewSwitch('all');
                    }}
                    className={`min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm cursor-pointer ${PRIMARY_CHAMPAGNE_CTA}`}
                  >
                    Reset Filters
                  </button>
                </GlassCard>
              ) : (
                <>
                  {/* Featured Article Showcase (Selector 3 target) */}
                  {featuredArticle && (
                    <section className="mb-9">
                      <div className="relative">
                        <div
                          aria-hidden="true"
                          className="hidden sm:block absolute inset-x-4 -bottom-2.5 top-4 rounded-[28px] bg-white/10 backdrop-blur-md border border-white/25 pointer-events-none"
                        />
                        <div
                          aria-hidden="true"
                          className="hidden sm:block absolute inset-x-2 -bottom-1.5 top-2 rounded-[26px] bg-white/8 backdrop-blur-sm border border-white/20 pointer-events-none"
                        />
                        <GlassCard
                          onClick={() => handleOpenArticle(featuredArticle.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && handleOpenArticle(featuredArticle.id)
                          }
                          className="group p-4 sm:p-6 cursor-pointer rounded-[26px]"
                        >
                          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
                            <div className="xl:col-span-7">
                              {renderArticleVisual(featuredArticle, 'aspect-[16/9]')}
                            </div>

                            <div className="xl:col-span-5 flex flex-col justify-between h-full py-1">
                              <div>
                                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#E4D5C6] mb-3 tabular-nums">
                                  <span>{featuredArticle.publishedAt}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{featuredArticle.readMinutes} min read</span>
                                </div>

                                <h2
                                  className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F8E7D3] transition-colors leading-tight mb-3"
                                  style={{ textWrap: 'balance' }}
                                >
                                  {featuredArticle.title}
                                </h2>

                                <p className="text-sm text-[#EFE5DA]/90 leading-relaxed mb-5">
                                  {featuredArticle.excerpt}
                                </p>
                              </div>

                              <div className="pt-4 border-t border-white/18 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {featuredArticle.authorAvatar ? (
                                    <img
                                      src={featuredArticle.authorAvatar}
                                      alt={featuredArticle.author}
                                      referrerPolicy="no-referrer"
                                      className="w-10 h-10 rounded-full object-cover border border-white/60 shrink-0"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-full bg-white/18 border border-white/40 text-white font-bold flex items-center justify-center text-xs shrink-0">
                                      {featuredArticle.author.slice(0, 2).toUpperCase()}
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <div className="text-xs font-semibold text-white truncate">
                                      {featuredArticle.author}
                                    </div>
                                    <div className="text-[11px] text-[#E4D5C6] truncate">
                                      {featuredArticle.authorRole}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleBookmark(featuredArticle.id);
                                    }}
                                    aria-label={
                                      bookmarks.includes(featuredArticle.id)
                                        ? 'Remove bookmark'
                                        : 'Bookmark article'
                                    }
                                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                                      bookmarks.includes(featuredArticle.id)
                                        ? 'bg-white/24 text-white border border-white/40'
                                        : 'text-[#E4D5C6] hover:text-white hover:bg-white/12'
                                    }`}
                                  >
                                    <Bookmark
                                      size={17}
                                      strokeWidth={1.65}
                                      className={
                                        bookmarks.includes(featuredArticle.id)
                                          ? 'fill-current'
                                          : ''
                                      }
                                    />
                                  </button>

                                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F8E7D3] whitespace-nowrap">
                                    <span>Read</span>
                                    <ChevronRight
                                      size={15}
                                      strokeWidth={1.75}
                                      className="transition-transform group-hover:translate-x-0.5"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </section>
                  )}

                  {/* Article Cards Grid (Selectors 4–9 targets) */}
                  {remainingArticles.length > 0 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      {remainingArticles.map((article, idx) => {
                        const isSaved = bookmarks.includes(article.id);
                        return (
                          <div key={article.id} className="relative flex">
                            <GlassCard
                              delay={idx * 0.04}
                              onClick={() => handleOpenArticle(article.id)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) =>
                                e.key === 'Enter' && handleOpenArticle(article.id)
                              }
                              className="w-full group p-4 sm:p-5 cursor-pointer"
                            >
                              <div className="h-full flex flex-col justify-between gap-5">
                                <div>
                                  {renderArticleVisual(article, 'aspect-[16/10] mb-4')}

                                  <div className="flex items-center gap-2 text-xs font-mono text-[#E4D5C6] mb-2 tabular-nums">
                                    <span>{article.publishedAt}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{article.readMinutes} min</span>
                                  </div>

                                  <h3 className="text-lg font-bold text-white group-hover:text-[#F8E7D3] transition-colors leading-snug mb-2 line-clamp-2">
                                    {article.title}
                                  </h3>

                                  <p className="text-sm text-[#EFE5DA]/90 leading-relaxed line-clamp-3">
                                    {article.excerpt}
                                  </p>
                                </div>

                                <div className="pt-3.5 border-t border-white/18 flex items-center justify-between gap-2">
                                  <div className="min-w-0">
                                    <div className="text-xs font-semibold text-white truncate">
                                      {article.author}
                                    </div>
                                    <div className="text-[11px] text-[#E4D5C6] truncate">
                                      {article.authorRole}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1 shrink-0">
                                    {article.isCustom && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteCustomArticle(article.id);
                                        }}
                                        aria-label="Delete custom post"
                                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-[#E4D5C6] hover:text-rose-200 transition-colors cursor-pointer"
                                      >
                                        <Trash2 size={15} strokeWidth={1.65} />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleBookmark(article.id);
                                      }}
                                      aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
                                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                                        isSaved
                                          ? 'text-white bg-white/24 border border-white/40'
                                          : 'text-[#E4D5C6] hover:text-white hover:bg-white/12'
                                      }`}
                                    >
                                      <Bookmark
                                        size={16}
                                        strokeWidth={1.65}
                                        className={isSaved ? 'fill-current' : ''}
                                      />
                                    </button>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F8E7D3] whitespace-nowrap">
                                      <span>Read</span>
                                      <ArrowRight size={14} strokeWidth={1.75} />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </GlassCard>
                          </div>
                        );
                      })}
                    </section>
                  )}
                </>
              )}

              {/* Briefing Subscription Panel (Selector 10 target) */}
              <section>
                <GlassPanel className="p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  <div className="max-w-lg">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-[#E8D7C5] mb-2">
                      Monthly Dispatch
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Receive New News Room Notes
                    </h2>
                    <p className="text-sm text-[#EFE5DA]/90 leading-relaxed">
                      Practical case studies, cloud reliability checklists, and workflow benchmarks delivered once a month—zero marketing clutter.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubscribeBrief}
                    className="w-full xl:w-auto flex flex-col gap-2 shrink-0"
                  >
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="email"
                        value={briefEmail}
                        onChange={(e) => {
                          setBriefEmail(e.target.value);
                          setBriefError('');
                          setBriefSubmitted(false);
                        }}
                        placeholder="you@company.com"
                        className="min-h-[44px] px-4 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40 sm:w-60"
                      />
                      <button
                        type="submit"
                        className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${PRIMARY_CHAMPAGNE_CTA}`}
                      >
                        <span>Subscribe</span>
                        <ArrowRight size={15} strokeWidth={1.75} />
                      </button>
                    </div>
                    {briefError && (
                      <p className="text-xs text-rose-200 font-medium">{briefError}</p>
                    )}
                    {briefSubmitted && (
                      <p className="text-xs font-semibold text-[#D8F3DC]">
                        Subscribed. You will receive our next News Room dispatch.
                      </p>
                    )}
                  </form>
                </GlassPanel>
              </section>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Write / Publish Article Modal — Warm Champagne Frosted Sheet */}
      <AnimatePresence>
        {isComposerOpen && (
          <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsComposerOpen(false)}
              className="absolute inset-0 bg-[#1c130d]/55 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl champagne-glass-panel rounded-t-[32px] sm:rounded-[28px] p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white"
            >
              <div className="w-10 h-1.5 rounded-full bg-white/40 mx-auto mb-4 sm:hidden" />

              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-white/18">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-wider text-[#E8D7C5]">
                    News Room Studio
                  </p>
                  <h2 className="text-xl font-bold text-white">Publish New Dispatch</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  aria-label="Close post composer"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/16 border border-white/35 text-white hover:bg-white/25 cursor-pointer"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <form onSubmit={handlePublishArticle} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={draftAuthor}
                      onChange={(e) => setDraftAuthor(e.target.value)}
                      placeholder="e.g. Rufus Adeyemi"
                      className="min-h-[44px] w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                      Author Title / Position
                    </label>
                    <input
                      type="text"
                      value={draftAuthorRole}
                      onChange={(e) => setDraftAuthorRole(e.target.value)}
                      placeholder="e.g. Co-Founder, CEO, Lead Developer"
                      className="min-h-[44px] w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                    Article Headline
                  </label>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="Clear, outcome-oriented article title"
                    className="min-h-[44px] w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                    Short Summary
                  </label>
                  <input
                    type="text"
                    value={draftExcerpt}
                    onChange={(e) => setDraftExcerpt(e.target.value)}
                    placeholder="Concise 1–2 sentence overview shown on article cards"
                    className="min-h-[44px] w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                    Quantified Outcome (Optional)
                  </label>
                  <input
                    type="text"
                    value={draftMetric}
                    onChange={(e) => setDraftMetric(e.target.value)}
                    placeholder="e.g. 64% Faster Deployment Cycle in Q4"
                    className="min-h-[44px] w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F4ECE3] mb-1.5">
                    Article Content (Separate paragraphs with a blank line)
                  </label>
                  <textarea
                    rows={5}
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    placeholder="Write your engineering notes, benchmarks, and practical implementation guidance..."
                    className="w-full px-3.5 py-2.5 rounded-2xl champagne-glass-input text-sm text-white placeholder:text-[#DFCDBD]/75 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                {composerError && (
                  <p className="text-xs text-rose-200 font-medium">{composerError}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className={`min-h-[44px] px-4 rounded-2xl text-xs font-semibold cursor-pointer ${SECONDARY_GLASS_BTN}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs cursor-pointer ${PRIMARY_CHAMPAGNE_CTA}`}
                  >
                    <span>Publish Article</span>
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
