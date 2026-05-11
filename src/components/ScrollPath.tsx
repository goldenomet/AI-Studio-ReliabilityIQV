import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Users, Wallet, Settings2, Zap, MessageSquare, ArrowRight } from "lucide-react";

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

    const createTimeline = () => {
      ctx && ctx.revert();
      ctx = gsap.context(() => {
        const box = root.querySelector<HTMLElement>(".sp-box");
        if (!box) return;
        const boxStartRect = box.getBoundingClientRect();

        const containers = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(".sp-container:not(.sp-initial)")
        );

        containers.forEach((container) => {
          gsap.fromTo(
            container,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        });

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

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.querySelector(".sp-container.sp-initial"),
            start: "clamp(top center)",
            endTrigger: root.querySelector(".sp-final"),
            end: "clamp(top center)",
            scrub: 1,
          },
        });

        tl.to(box, {
          duration: 1,
          ease: "none",
          motionPath: { path: points, curviness: 1.5 },
        });
      }, root);
    };

    createTimeline();
    window.addEventListener("resize", createTimeline);
    return () => {
      window.removeEventListener("resize", createTimeline);
      ctx && ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="overflow-hidden font-mono bg-bg-primary transition-colors duration-500">
      <div className="sp-spacer" />
      <div className="sp-main">
        {/* Intro */}
        <div className="sp-container sp-initial !border-none !bg-transparent text-center !w-auto !h-auto max-w-2xl">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tighter uppercase italic transition-colors duration-500">Why Choose Us?</h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed transition-colors duration-500">Innovative solutions, relentless support, and stunning designs for every tech need.</p>
          </div>
          <div className="sp-box absolute -bottom-24 left-1/2 -translate-x-1/2" />
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

