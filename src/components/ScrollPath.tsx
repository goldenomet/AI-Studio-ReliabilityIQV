import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ArrowRight, MessageSquare } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface ScrollPathProps {
  onNavigate?: (page: string) => void;
}

export default function ScrollPath({ onNavigate }: ScrollPathProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let ctx: gsap.Context | undefined;
    let lastWidth = window.innerWidth;
    let resizeTimer: number | undefined;

    const createTimeline = () => {
      ctx && ctx.revert();
      ctx = gsap.context(() => {
        const box = root.querySelector<HTMLElement>(".sp-box");
        const pivot = root.querySelector<HTMLElement>(".laptop-3d-pivot");
        if (!box || !pivot) return;

        pivot.style.transform = "translate3d(0, 0, 0) rotateY(0deg)";
        const boxStartRect = box.getBoundingClientRect();

        const containers = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(".sp-container:not(.sp-initial)")
        );

        const points = containers.map((container) => {
          const marker =
            container.querySelector<HTMLElement>(".sp-marker") ?? container;
          const r = marker.getBoundingClientRect();
          return {
            x:
              r.left + r.width / 2 -
              (boxStartRect.left + boxStartRect.width / 2),
            y:
              r.top + r.height / 2 -
              (boxStartRect.top + boxStartRect.height / 2),
          };
        });

        // Precompute exact arc-length milestone progresses for each card waypoint
        // so rotateY peaks smoothly mid-glide (±45deg) and resets cleanly to 0deg upon arrival.
        const waypoints = [{ x: 0, y: 0 }, ...points];
        const rawPath = MotionPathPlugin.arrayToRawPath(waypoints, {
          curviness: 1.5,
        });
        MotionPathPlugin.cacheRawPathMeasurements(rawPath);

        const SAMPLES = 600;
        const milestoneProgress: number[] = [0];
        let searchStartIdx = 0;

        for (let k = 1; k < waypoints.length - 1; k++) {
          const target = waypoints[k];
          let bestIdx = searchStartIdx + 1;
          let bestDistSq = Infinity;
          const maxIdx = SAMPLES - (waypoints.length - 1 - k);
          for (let i = searchStartIdx + 1; i <= maxIdx; i++) {
            const pos = MotionPathPlugin.getPositionOnPath(
              rawPath,
              i / SAMPLES,
              false
            );
            const dx = pos.x - target.x;
            const dy = pos.y - target.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < bestDistSq) {
              bestDistSq = distSq;
              bestIdx = i;
            }
          }
          milestoneProgress.push(bestIdx / SAMPLES);
          searchStartIdx = bestIdx;
        }
        milestoneProgress.push(1);

        const updateLaptopYaw = (progress: number) => {
          const clamped = Math.max(0, Math.min(1, progress));
          if (clamped <= 0.0005 || clamped >= 0.9995) {
            pivot.style.transform = "translate3d(0, 0, 0) rotateY(0deg)";
            return;
          }

          let segIdx = 0;
          for (let k = 0; k < milestoneProgress.length - 1; k++) {
            if (clamped >= milestoneProgress[k] && clamped <= milestoneProgress[k + 1]) {
              segIdx = k;
              break;
            }
          }

          const tStart = milestoneProgress[segIdx];
          const tEnd = milestoneProgress[segIdx + 1];
          const u = (clamped - tStart) / Math.max(0.0001, tEnd - tStart);

          const dx = waypoints[segIdx + 1].x - waypoints[segIdx].x;
          // Moving center->left or right->left turns toward -45deg; left->right turns toward +45deg.
          // Falls back to a gentler alternating swivel on single-column mobile viewports.
          const peakYaw =
            Math.abs(dx) > 30
              ? dx < 0
                ? -45
                : 45
              : segIdx % 2 === 0
                ? -24
                : 24;

          // Raised-sine bell envelope: 0 at u=0 (card departure) and u=1 (card lock), peak at u=0.5
          const s = Math.sin(Math.PI * u);
          const bell = s * s;
          const yaw = peakYaw * bell;

          pivot.style.transform = `translate3d(0, 0, 0) rotateY(${yaw.toFixed(3)}deg)`;
        };

        containers.forEach((container) => {
          gsap.fromTo(
            container,
            { opacity: 0, y: 80, force3D: true },
            {
              opacity: 1,
              y: 0,
              force3D: true,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 45%",
                scrub: 0.6,
              },
            }
          );
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.querySelector(".sp-container.sp-initial"),
            start: "clamp(top center)",
            endTrigger: root.querySelector(".sp-final"),
            end: "clamp(top center)",
            scrub: 0.6,
          },
          onUpdate: () => {
            updateLaptopYaw(tl.progress());
          },
        });

        tl.to(box, {
          duration: 1,
          ease: "none",
          force3D: true,
          motionPath: { path: points, curviness: 1.5 },
        });

        updateLaptopYaw(tl.progress());
      }, root);
    };

    createTimeline();
    const handleResize = () => {
      const nextWidth = window.innerWidth;
      if (nextWidth === lastWidth) return;
      lastWidth = nextWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(createTimeline, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ctx && ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-hidden font-mono bg-transparent pb-6 md:pb-10 transition-colors duration-500 relative">
      {/* Dynamic Drifting Aurora Light Sweep Overlay for Prismatic Glass Refraction */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.92) 7%, rgba(0,0,0,1) 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.92) 7%, rgba(0,0,0,1) 92%, transparent 100%)',
        }}
      >
        {/* Upper Aurora Curtain (Why Choose Us -> Expert Team -> Affordable Prices) */}
        <div
          className="aurora-sweep-ribbon-1 absolute top-[6%] -left-[20%] w-[140%] h-[460px] rounded-full blur-[95px]"
          style={{
            background:
              'linear-gradient(95deg, rgba(56,189,248,0.28) 0%, rgba(37,99,235,0.22) 34%, rgba(167,139,250,0.20) 64%, rgba(45,212,191,0.24) 100%)',
          }}
        />

        {/* Mid Aurora Curtain (Affordable Prices -> Custom Solutions) */}
        <div
          className="aurora-sweep-ribbon-2 absolute top-[38%] -left-[25%] w-[150%] h-[520px] rounded-full blur-[110px]"
          style={{
            background:
              'linear-gradient(105deg, rgba(45,212,191,0.22) 0%, rgba(56,189,248,0.28) 38%, rgba(99,102,241,0.24) 72%, rgba(236,72,153,0.14) 100%)',
          }}
        />

        {/* Lower Aurora Curtain (Custom Solutions -> Fast Delivery -> Contact Us) */}
        <div
          className="aurora-sweep-ribbon-1 absolute top-[70%] -left-[20%] w-[140%] h-[480px] rounded-full blur-[100px]"
          style={{
            background:
              'linear-gradient(88deg, rgba(99,102,241,0.20) 0%, rgba(14,165,233,0.28) 42%, rgba(34,211,238,0.24) 75%, rgba(192,132,252,0.18) 100%)',
          }}
        />

        {/* Travelling Diagonal Prismatic Light Sweep Beam */}
        <div
          className="aurora-sweep-beam absolute -inset-y-12 left-[10%] w-[75%] blur-[72px]"
          style={{
            background:
              'linear-gradient(112deg, transparent 10%, rgba(255,255,255,0.42) 34%, rgba(125,211,252,0.34) 48%, rgba(196,181,253,0.26) 62%, rgba(94,234,212,0.24) 74%, transparent 90%)',
          }}
        />
      </div>

      <div className="sp-spacer" />
      <div className="sp-main">
        {/* Intro */}
        <div className="sp-container sp-initial !border-none !bg-transparent text-center !w-full max-w-[540px] min-h-[380px] md:min-h-[520px] !p-6 flex items-center justify-center">
          <div className="space-y-3 relative z-20 max-w-sm md:max-w-md mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tighter uppercase italic transition-colors duration-500">Why Choose Us?</h2>
            <p className="text-text-secondary text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto transition-colors duration-500">Innovative solutions, relentless support, and stunning designs for every tech need.</p>
          </div>
          <div className="sp-box absolute inset-0 m-auto pointer-events-none">
            <div className="laptop-3d-pivot w-full h-full flex items-center justify-center">
              <img
                src="/assets/aistudio/file_0000000029508210b45aa0b4a15231b2_675d1a5d.png"
                alt="ReliabilityIQ 3D Laptop"
                draggable={false}
                className="w-full h-full object-contain translate-y-[9%] select-none pointer-events-none drop-shadow-[0_22px_38px_rgba(15,37,71,0.24)]"
              />
            </div>
          </div>
        </div>

        {/* 1. Expert Team */}
        <div className="sp-container sp-second group">
          <div className="space-y-4">
            <h3 className="text-text-primary font-sans font-bold text-4xl md:text-5xl tracking-tight leading-none transition-colors duration-500">Expert Team</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed transition-colors duration-500 font-sans">Our squad of tech aficionados specializes in transforming your ideas into reality. Yes, we do speak fluent geek.</p>
            <button 
              onClick={() => onNavigate?.('about')}
              className="bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2"
            >
              Meet Team <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 2. Affordable Prices */}
        <div className="sp-container sp-third group">
          <div className="space-y-4">
            <h3 className="text-text-primary font-sans font-bold text-4xl md:text-5xl tracking-tight leading-none transition-colors duration-500">Affordable Prices</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed transition-colors duration-500 font-sans">Get premium tech services without shredding your wallet. Enjoy value without compromise.</p>
            <button 
              onClick={() => onNavigate?.('services')}
              className="bg-accent/80 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2"
            >
              Pricing <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 3. Custom Solutions */}
        <div className="sp-container sp-fourth group">
          <div className="space-y-4">
            <h3 className="text-text-primary font-sans font-bold text-4xl md:text-5xl tracking-tight leading-none transition-colors duration-500">Custom Solutions</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed transition-colors duration-500 font-sans">No cookie-cutter approaches here. We tailor our services to fit your unique style and needs.</p>
            <button 
              onClick={() => onNavigate?.('services')}
              className="bg-accent/60 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2"
            >
              Solutions <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4. Fast Delivery */}
        <div className="sp-container sp-fifth group">
          <div className="space-y-4">
            <h3 className="text-text-primary font-sans font-bold text-4xl md:text-5xl tracking-tight leading-none transition-colors duration-500">Fast Delivery</h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed transition-colors duration-500 font-sans">When you're ready to launch, we are too. Speedy services with no compromises on quality.</p>
            <button 
              onClick={() => onNavigate?.('services')}
              className="bg-accent/40 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity w-fit mt-2 dark:text-text-primary"
            >
              Our Process <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="sp-container sp-sixth group !h-auto">
          <div className="p-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent uppercase tracking-[0.2em] text-sm font-bold">
                <MessageSquare size={18} />
                Let's Connect
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-text-primary leading-tight transition-colors duration-500">Contact Us Today</h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed uppercase font-bold tracking-wider transition-colors duration-500">Want to chat? We’re all ears! Get in touch with us for any inquiries or just to talk tech. We’re your partners in navigating the IT galaxy. Reach out and let’s make magic happen.</p>
            </div>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="w-full bg-accent text-white py-6 rounded-2xl flex items-center justify-center gap-3 font-bold hover:opacity-90 transition-opacity duration-300 group/btn uppercase tracking-widest text-base md:text-lg"
            >
              Contact us <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <div className="sp-final" />
    </div>
  );
}
