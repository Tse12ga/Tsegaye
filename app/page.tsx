"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

const Magnet = ({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out", className = "" }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < padding) {
        setIsActive(true);
        setPosition({ x: distX / strength, y: distY / strength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={magnetRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "", as = "div" }: any) => {
  const Component = motion.create(as as any);
  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

const ContactButton = ({ href = "#contact", className = "" }: { href?: string; className?: string }) => {
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest outline outline-2 outline-offset-[-3px] outline-white hover:scale-105 transition-transform ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
      }}
    >
      Contact Me
    </a>
  );
};

const LiveProjectButton = ({ href }: { href: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors"
    >
      Live Project
    </a>
  );
};

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const characters = text.split("");

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center relative`}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <span key={i} className="relative inline-block">
            <span className="opacity-0">{char === " " ? "\u00A0" : char}</span>
            <motion.span style={{ opacity }} className="absolute left-0 top-0">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

// ==========================================
// SECTIONS
// ==========================================

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col overflow-x-clip text-[#D7E2EA]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 w-full">
        {["About", "Services", "Projects", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider hover:opacity-70 transition-opacity duration-200">
            {item}
          </a>
        ))}
      </FadeIn>

      {/* Hero Heading */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20">
        <div className="overflow-hidden w-full text-center mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[12vw] sm:text-[13vw] md:text-[14vw] lg:text-[15.5vw]">
              Hi, i&apos;m Tsegaye
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full relative z-30">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)]">
            Web Developer & IT Infrastructure Engineer bridging software and hardware.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C]">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10 w-full max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2} y={30}>
          <p className="text-[#F2F5F8] font-medium leading-relaxed text-[clamp(1.1rem,2vw,1.5rem)] text-center max-w-4xl mx-auto">
            I am a Computer Science graduate with over three years of hands-on experience managing enterprise IT operations. Most developers only know what happens on the screen. I know how the data actually travels through the building. Whether I am coding a Next.js frontend, configuring a Prisma database, or running underground conduit for a complex IP camera network, my focus is always the same: building systems that are fast, secure, and reliable.
          </p>
        </FadeIn>

        {/* Tech Stack Grid */}
        <FadeIn delay={0.4} y={30} className="w-full mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full">
            {/* Software */}
            <div className="flex-1 bg-neutral-900/50 border border-white/10 rounded-[30px] p-8 sm:p-10 flex flex-col gap-6">
              <h3 className="text-[#D7E2EA] font-black uppercase tracking-widest border-b border-white/10 pb-4">Web Engineering</h3>
              <div className="flex flex-wrap gap-3">
                {["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Node.js", "PostgreSQL", "Framer Motion"].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-white/20 rounded-full text-sm font-medium text-white/80">{tech}</span>
                ))}
              </div>
            </div>
            {/* Hardware */}
            <div className="flex-1 bg-neutral-900/50 border border-white/10 rounded-[30px] p-8 sm:p-10 flex flex-col gap-6">
              <h3 className="text-[#D7E2EA] font-black uppercase tracking-widest border-b border-white/10 pb-4">Infrastructure & Security</h3>
              <div className="flex flex-wrap gap-3">
                {["CCTV IP/Analog", "NVR/DVR Systems", "PoE Switches", "Cat6 Structured Cabling", "Local Area Networks", "Windows Server", "Hardware Diagnostics"].map(tech => (
                  <span key={tech} className="px-4 py-2 border border-white/20 rounded-full text-sm font-medium text-white/80">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.6} y={30} className="mt-4 sm:mt-6">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { num: "01", name: "IT Support", desc: "Providing comprehensive enterprise IT support, hardware maintenance, and troubleshooting to ensure seamless daily operations." },
    { num: "02", name: "Website Development", desc: "Designing and building high-performance, responsive websites and web applications using modern technologies." },
    { num: "03", name: "CCTV Installation", desc: "Designing and executing complex IP camera architectures and NVR/DVR security systems for properties." },
    { num: "04", name: "Network Installation", desc: "Engineering robust physical network topologies, including conduit routing, cabling, and PoE switch configurations." },
    { num: "05", name: "Graphics Design", desc: "Crafting striking visual identities, branding materials, and digital interfaces that communicate a clear presence." }
  ];

  return (
    <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-none">
        Services
      </h2>
      
      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((srv, i) => (
          <FadeIn key={srv.num} delay={i * 0.1} className="flex flex-col md:flex-row items-start md:items-center py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-0 gap-6 md:gap-12">
            <span className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none">
              {srv.num}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                {srv.name}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60">
                {srv.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ proj, index, totalProjects, scrollYProgress }: any) => {
  const targetScale = 1 - (totalProjects - 1 - index) * 0.03;
  const start = index / totalProjects;
  const end = (index + 1) / totalProjects;
  
  const scale = useTransform(scrollYProgress, [start, end], [1, targetScale]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <motion.div 
      className="sticky top-24 md:top-32 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8"
      style={{ scale: smoothScale, top: `calc(6rem + ${index * 28}px)` }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-6 sm:gap-10">
          <span className="font-black text-[#D7E2EA] text-[clamp(3rem,10vw,140px)] leading-none">{proj.id}</span>
          <div className="flex flex-col gap-1">
            <span className="uppercase text-[#D7E2EA] opacity-60 text-sm tracking-wider">{proj.label}</span>
            <h3 className="uppercase text-[#D7E2EA] font-medium text-xl sm:text-2xl md:text-3xl">{proj.name}</h3>
          </div>
        </div>
        {proj.liveUrl !== "#" ? (
          <LiveProjectButton href={proj.liveUrl} />
        ) : (
          <span className="px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/50 border-2 border-[#D7E2EA]/20 rounded-full">Internal Project</span>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full">
        {/* Left Col */}
        <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6 shrink-0">
          <div className="w-full h-[clamp(130px,16vw,230px)] relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5">
            <img src={proj.col1[0]} alt={`${proj.name} screenshot 1`} className="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
          <div className="w-full h-[clamp(160px,22vw,340px)] relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5">
            <img src={proj.col1[1]} alt={`${proj.name} screenshot 2`} className="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
        </div>
        {/* Right Col */}
        <div className="w-full md:w-[60%] h-[400px] md:h-auto relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
            <img src={proj.col2} alt={`${proj.name} dashboard`} className="w-full h-auto block opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      id: "01",
      name: "Gollagul Trading",
      label: "Corporate",
      liveUrl: "https://gollagul.com",
      col1: ["/Gollagul/Gollagul 2.jpeg", "/Gollagul/Gollagul 3.jpeg"],
      col2: "/Gollagul/Gollagul 1.jpeg"
    },
    {
      id: "02",
      name: "Debredamo Hotel",
      label: "Hospitality",
      liveUrl: "https://debredamohotel.com",
      col1: ["/Debredamo/DDH 3.jpeg", "/Debredamo/DDH 4.jpeg"],
      col2: "/Debredamo/DDH 1.jpeg"
    },
    {
      id: "03",
      name: "Gullit",
      label: "E-commerce",
      liveUrl: "https://gullit.net",
      col1: ["/Gullit/Gullit 2.jpeg", "/Gullit/Gullit 3.jpeg"],
      col2: "/Gullit/gullit 1.jpeg"
    },
    {
      id: "04",
      name: "Properties in Addis",
      label: "Real Estate",
      liveUrl: "https://propertiesinaddis.com",
      col1: ["/Propertiesinaddis/PIA 2.jpeg", "/Propertiesinaddis/PIA 3.jpeg"],
      col2: "/Propertiesinaddis/PIA 1.jpeg"
    },
    {
      id: "05",
      name: "Hexagon Systems",
      label: "Corporate",
      liveUrl: "https://hexagonview.com",
      col1: ["/Hexagon Computer Systems/Hexagon 2.jpeg", "/Hexagon Computer Systems/Hexagon 3.jpeg"],
      col2: "/Hexagon Computer Systems/Hexagon 1.jpeg"
    },
    {
      id: "06",
      name: "Amibara Security",
      label: "Infrastructure",
      liveUrl: "#",
      col1: ["/Amibara/IMG_20260328_223803_554.JPG", "/Amibara/6048664174977992546.jpg"],
      col2: "/Amibara/6024023500924241636.jpg"
    },
    {
      id: "07",
      name: "IT Operations",
      label: "Enterprise IT",
      liveUrl: "#",
      col1: ["/IT Support/shared image (2).jpg", "/IT Support/shared image (3).jpg"],
      col2: "/IT Support/IMG_20260205_144326_780.jpg"
    }
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 pt-20 sm:pt-24 md:pt-32 pb-32">
      <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 leading-none">
        Projects
      </h2>
      
      <div ref={containerRef} className="px-5 sm:px-8 md:px-10 max-w-7xl mx-auto flex flex-col gap-8 relative pb-20">
        {projects.map((proj, i) => (
          <ProjectCard 
            key={proj.id} 
            proj={proj} 
            index={i} 
            totalProjects={projects.length} 
            scrollYProgress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#0C0C0C] pt-20 pb-10 px-5 sm:px-8 md:px-10 relative z-40 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h2 className="hero-heading font-black uppercase tracking-tight text-[clamp(2.5rem,8vw,80px)] leading-none">
            Let&apos;s Build
          </h2>
          <p className="text-[#F2F5F8] font-medium text-lg max-w-md opacity-80 mb-4">
            Whether you need a high-performance website, custom graphics, or a rock-solid network topology, I am ready to engineer it. Send me a message!
          </p>
          
          <div className="flex flex-col gap-4 text-[#D7E2EA]">
            <a href="mailto:tsegashu@gmail.com" className="text-xl sm:text-2xl font-medium hover:text-white transition-colors flex items-center gap-3">
              tsegashu@gmail.com
            </a>
            <a href="tel:+251947626212" className="text-xl sm:text-2xl font-medium hover:text-white transition-colors flex items-center gap-3">
              +251 947 626 212
            </a>
            <div className="flex gap-6 mt-4">
              <a href="https://github.com/Tse12ga" target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-widest hover:text-white transition-colors border-b border-[#D7E2EA]/30 pb-1">
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="w-full lg:w-1/2 bg-neutral-900/50 p-6 sm:p-8 md:p-10 rounded-[30px] border border-white/10">
          <form className="flex flex-col gap-6" action="https://formspree.io/f/mljrakzb" method="POST">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" className="bg-[#0C0C0C] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" className="bg-[#0C0C0C] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[#D7E2EA] text-sm font-medium uppercase tracking-wider">Project Details</label>
              <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project..." className="bg-[#0C0C0C] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="mt-2 rounded-xl bg-[#D7E2EA] text-[#0C0C0C] font-black uppercase tracking-widest py-4 hover:bg-white transition-colors shadow-[0_0_20px_rgba(215,226,234,0.3)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-[#D7E2EA]/50 text-sm font-medium">
        <span>© {new Date().getFullYear()} Tsegaye Shumet. All rights reserved.</span>
        <span className="uppercase tracking-wider">Addis Ababa, Ethiopia</span>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="w-full bg-[#0C0C0C] overflow-x-clip text-[#D7E2EA]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}