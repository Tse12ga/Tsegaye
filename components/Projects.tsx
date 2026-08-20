"use client";

import { useRef, useState, useCallback } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useInView 
} from "motion/react";

const caseStudies = [
  { id: "gollagul", title: "Gollagul Trading", category: "Web Development", year: "Next.js", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800", squares: [{x:5,y:30,s:16}, {x:10,y:42,s:10}, {x:3,y:52,s:7}, {x:80,y:70,s:14}, {x:85,y:82,s:9}, {x:78,y:60,s:6}] },
  { id: "debredamo", title: "Debredamo Hotel", category: "Full Stack Development", year: "Prisma", image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800", squares: [{x:82,y:55,s:16}, {x:88,y:68,s:10}, {x:78,y:72,s:7}, {x:85,y:42,s:6}, {x:90,y:80,s:8}] },
  { id: "gullit", title: "Gullit", category: "E-commerce", year: "WordPress", image: "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=800", squares: [{x:4,y:24,s:16}, {x:10,y:36,s:10}, {x:2,y:44,s:7}, {x:78,y:78,s:14}, {x:84,y:88,s:8}] },
  { id: "amibara", title: "Amibara Security", category: "Infrastructure", year: "PoE & CCTV", image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800", squares: [{x:82,y:26,s:14}, {x:88,y:38,s:10}, {x:78,y:44,s:7}, {x:84,y:54,s:5}, {x:90,y:60,s:8}] }
];

const logos = [
  { name: "Codecraft_", type: "code" },
  { name: "ennLabs", type: "dots" },
  { name: "GlobalBank", type: "circle-ring" },
  { name: "45 Degrees°", type: "arrow" },
  { name: "AlphaWave", type: "wave-circle" },
  { name: "Biosynthesis", type: "lines" },
  { name: "Boltshift", type: "bolt" },
  { name: "Clandestine", type: "plus" }
];

const renderIcon = (type: string) => {
  switch (type) {
    case "code": return (
      <svg width="22" height="18" viewBox="0 0 22 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline points="6 4 1 9 6 14" /><polyline points="16 4 21 9 16 14" /><line x1="13" y1="2" x2="9" y2="16" />
      </svg>
    );
    case "dots": return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        {[3, 10, 17].map(x => [3, 10, 17].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}
      </svg>
    );
    case "circle-ring": return (
      <svg width="22" height="22" viewBox="0 0 22 22" stroke="currentColor" strokeWidth="2" fill="none">
        <circle cx="11" cy="11" r="9" /><circle cx="11" cy="11" r="4" />
      </svg>
    );
    case "arrow": return (
      <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="2" y1="16" x2="16" y2="2" /><polyline points="7 2 16 2 16 11" />
      </svg>
    );
    case "wave-circle": return (
      <svg width="22" height="22" viewBox="0 0 22 22" stroke="currentColor" strokeWidth="1.5" fill="none">
        <circle cx="11" cy="11" r="9" /><path d="M5 11Q8 7 11 11Q14 15 17 11" />
      </svg>
    );
    case "lines": return (
      <svg width="24" height="18" viewBox="0 0 24 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="0" y1="3" x2="24" y2="3" /><line x1="6" y1="9" x2="24" y2="9" /><line x1="0" y1="15" x2="18" y2="15" />
      </svg>
    );
    case "bolt": return (
      <svg width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
        <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
      </svg>
    );
    case "plus": return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
        <rect x="7.5" y="0" width="3" height="18" /><rect x="0" y="7.5" width="18" height="3" />
      </svg>
    );
    default: return null;
  }
};

const HeaderSquares = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const squares = [
    {x:6, y:20, s:12}, {x:12, y:32, s:8}, {x:8, y:44, s:6}, {x:88, y:18, s:10},
    {x:92, y:30, s:14}, {x:85, y:42, s:7}, {x:90, y:52, s:5}, {x:14, y:56, s:5}
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {squares.map((sq, i) => {
        const yOffset = useTransform(scrollYProgress, [0, 1], [0, -(80 + i * 30)]);
        const smoothY = useSpring(yOffset, { stiffness: 40, damping: 20 });
        return (
          <motion.div key={i} className="absolute z-0" style={{ left: `${sq.x}%`, top: `${sq.y}%`, y: smoothY }}>
            <motion.div
              className="bg-black"
              style={{ width: sq.s, height: sq.s }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i * 0.4, ease: "easeInOut", repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

import Image from "next/image";

// ... existing imports ...

const Card = ({ study, index }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent | React.TouchEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Support both mouse and touch coordinates
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.PointerEvent).clientY;
    
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rows = 8;
  const cols = 12;
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delayIn = (r + c) * 0.018;
      const delayOut = ((rows - 1 - r) + (cols - 1 - c)) * 0.012;
      blocks.push(
        <div
          key={`${r}-${c}`}
          className="absolute bg-black/80 transition-all"
          style={{
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
            left: `${(c * 100) / cols}%`,
            top: `${(r * 100) / rows}%`,
            transform: isHovered ? "scale(1)" : "scale(0)",
            opacity: isHovered ? 1 : 0,
            transitionDuration: "0.25s",
            transitionDelay: `${isHovered ? delayIn : delayOut}s`,
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        />
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onTouchStart={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchEnd={handlePointerLeave}
      className="group relative overflow-hidden aspect-[4/3] bg-neutral-100 cursor-pointer"
    >
      <Image 
        src={study.image} 
        alt={study.title} 
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover" 
      />
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-wrap">{blocks}</div>

      {study.squares.map((sq: any, i: number) => {
        const springX = useSpring(useTransform(mouseX, val => (val - (sq.x/100)) * 40), { stiffness: 80, damping: 18, mass: 0.6 });
        const springY = useSpring(useTransform(mouseY, val => (val - (sq.y/100)) * 40), { stiffness: 80, damping: 18, mass: 0.6 });
        return (
          <motion.div
            key={i}
            className="absolute bg-black pointer-events-none z-10"
            style={{
              left: `${sq.x}%`,
              top: `${sq.y}%`,
              width: sq.s,
              height: sq.s,
              x: isHovered ? springX : 0,
              y: isHovered ? springY : 0
            }}
          />
        );
      })}

      <div className="absolute right-4 top-4 h-7 w-7 flex items-center justify-center border border-white/30 text-xs text-white z-10">
        +
      </div>

      <div className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5 z-20 max-w-[70%]">
        <h3 className="text-[clamp(1.4rem,2.2vw,2rem)] font-normal leading-tight text-black">
          {study.title}
        </h3>
        <div className="flex flex-row mt-1.5 gap-4">
          <span className="text-[12px] text-black/60">{study.category}</span>
          <span className="text-[12px] font-medium text-black">{study.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative bg-white text-black font-dm-sans">
      {/* Top Area */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
        <HeaderSquares containerRef={sectionRef} />
        
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-7xl text-center z-10"
        >
          <span className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
            Projects
          </span>
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.25] tracking-tight">
            <span className="text-black">Insights from </span>
            <span className="text-black/40">My</span>
            <br />
            <span className="text-black/40">Case Studies</span>
          </h2>
        </motion.div>
      </div>

      {/* Case Study Cards */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Card key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>

      {/* Footer Area */}
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-end md:justify-between">
        
        <div className="max-w-md">
          <div className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs text-black">
            +
          </div>
          <p className="text-[14px] leading-[1.7] text-black/60">
            I partner with ambitious brands to build systems that scale. From designing high-converting web applications to engineering the physical infrastructure that keeps them secure.
          </p>
          
          <a href="mailto:contact@example.com" className="mt-6 group flex items-end w-fit">
            <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white hover:bg-black/85 transition-colors">
              Let's work together
            </span>
            <div className="mb-6 h-6 w-6 bg-black flex items-center justify-center group-hover:mb-9 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
              </svg>
            </div>
          </a>
        </div>

        <div className="flex-1 overflow-hidden md:ml-12 border-t border-black/10 md:border-t-0 mt-10 md:mt-0">
          <div className="overflow-hidden py-5">
            <div className="marquee-projects flex w-max">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex shrink-0 items-center gap-2.5 px-8">
                  {renderIcon(logo.type)}
                  <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className="h-12" />
    </section>
  );
}
