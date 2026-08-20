"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import RevealText from "@/components/RevealText";

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
      className={`inline-block rounded-full px-10 py-4 text-xs sm:text-sm text-white font-sans font-light uppercase tracking-[0.2em] border border-white/20 hover:bg-white hover:text-black transition-all duration-500 ease-out ${className}`}
    >
      Contact Me
    
  );
};

const LiveProjectButton = ({ href }: { href: string }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full border border-white/20 text-[#D7E2EA] font-sans font-light uppercase tracking-[0.2em] px-8 py-3 text-xs hover:bg-white hover:text-black transition-all duration-500 ease-out"
    >
      Live Project
    
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
          
        ))}
      </FadeIn>

      {/* Hero Heading */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-20 px-4">
        <div className="overflow-hidden w-full text-center mt-6 sm:mt-4 md:-mt-5">
          <RevealText 
            text="HI, I'M TSEGAYE" 
            className="hero-heading font-serif font-medium uppercase tracking-tight leading-none w-full text-[clamp(2.5rem,10.5vw,180px)]" 
            delay={0.15} 
          />
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
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 50%"]
  });

  const text = "I am a Computer Science graduate with over three years of hands-on experience managing enterprise IT operations. Most developers only know what happens on the screen. I know how the data actually travels through the building. Whether I am coding a Next.js frontend, configuring a Prisma database, or running underground conduit for a complex IP camera network, my focus is always the same: building systems that are fast, secure, and reliable.";
  const words = text.split(" ");

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-32 md:py-48 bg-transparent" ref={container}>
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-24 w-full max-w-7xl mx-auto border-t border-white/10 pt-16">
        <h2 className="hero-heading font-serif font-medium uppercase leading-none tracking-tighter text-[clamp(4rem,14vw,200px)] text-white w-full text-left">
          About
        </h2>
        
        <div className="w-full">
          <p className="font-sans font-medium leading-[1.1] text-[clamp(1.5rem,4vw,3.5rem)] max-w-6xl text-white flex flex-wrap gap-x-[1vw] gap-y-[0.5vw]">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
              return (
                <motion.span key={i} style={{ opacity }}>
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>

        {/* Tech Stack Grid */}
        <FadeIn delay={0.4} y={30} className="w-full mt-12 sm:mt-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
            {/* Software */}
            <div className="flex-1 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 flex flex-col gap-8 shadow-2xl">
              <h3 className="text-white/90 font-serif font-light uppercase tracking-[0.2em] border-b border-white/10 pb-6 text-sm sm:text-base">
                Web Engineering
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Node.js", "PostgreSQL", "Framer Motion"].map(tech => (
                  <span key={tech} className="px-5 py-2.5 bg-white/[0.02] border border-white/10 rounded-full text-xs font-sans font-light text-white/70 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Hardware */}
            <div className="flex-1 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 backdrop-blur-xl rounded-[40px] p-8 sm:p-12 flex flex-col gap-8 shadow-2xl">
              <h3 className="text-white/90 font-serif font-light uppercase tracking-[0.2em] border-b border-white/10 pb-6 text-sm sm:text-base">
                Infrastructure & Security
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["CCTV IP/Analog", "NVR/DVR Systems", "PoE Switches", "Cat6 Structured Cabling", "Local Area Networks", "Windows Server", "Hardware Diagnostics"].map(tech => (
                  <span key={tech} className="px-5 py-2.5 bg-white/[0.02] border border-white/10 rounded-full text-xs font-sans font-light text-white/70 uppercase tracking-wider">
                    {tech}
                  </span>
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
    <section id="services" className="bg-[#030303]/40 backdrop-blur-3xl rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-32 sm:py-40 md:py-48 relative z-20 border-t border-white/10 shadow-[0_-30px_50px_rgba(0,0,0,0.5)]">
      <h2 className="hero-heading font-serif font-light uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-none">
        Services
      </h2>
      
      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((srv, i) => (
          <FadeIn key={srv.num} delay={i * 0.1} className="flex flex-col md:flex-row items-start md:items-center py-10 sm:py-12 md:py-16 border-b border-white/10 last:border-0 gap-6 md:gap-16 hover:bg-white/[0.02] transition-colors duration-500 rounded-3xl px-6 sm:px-10 -mx-6 sm:-mx-10">
            <span className="font-serif font-light text-white/90 text-[clamp(3rem,10vw,140px)] leading-none w-24 sm:w-32 md:w-48">
              {srv.num}
            </span>
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-light uppercase text-white/90 text-[clamp(1.2rem,2.2vw,2.1rem)] tracking-[0.2em]">
                {srv.name}
              </h3>
              <p className="font-sans font-light leading-loose max-w-2xl text-[clamp(0.9rem,1.3vw,1.1rem)] text-white/60">
                {srv.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

  );
};

const ProjectCard = ({ proj, index }: any) => {
  return (
    <div className="w-[90vw] md:w-[75vw] h-[80vh] shrink-0 flex flex-col gap-6 bg-[#050505] border border-white/10 rounded-[30px] p-6 md:p-10 shadow-2xl relative overflow-hidden group">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 shrink-0">
        <div className="flex items-center gap-6">
          <span className="font-serif font-light text-[#D7E2EA] text-[clamp(2.5rem,6vw,80px)] leading-none">{proj.id}</span>
          <div className="flex flex-col">
            <span className="uppercase text-[#D7E2EA] opacity-60 text-xs tracking-widest">{proj.label}</span>
            <h3 className="uppercase text-[#D7E2EA] font-medium text-xl md:text-2xl">{proj.name}</h3>
          </div>
        </div>
        
        {proj.liveUrl !== "#" ? (
          <LiveProjectButton href={proj.liveUrl} />
        ) : (
          <span className="inline-block rounded-full border border-white/10 text-white/40 font-sans font-light uppercase tracking-[0.2em] px-6 py-2 text-[10px] bg-white/5">
            Internal Project
          </span>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 w-full h-full overflow-hidden">
        <div className="w-full md:w-[40%] flex flex-col gap-4 shrink-0 h-full">
          <div className="flex-1 relative rounded-2xl overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5">
            <img src={proj.col1[0]} alt={`${proj.name} 1`} className="w-full h-auto block opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
          </div>
          <div className="flex-1 relative rounded-2xl overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5">
            <img src={proj.col1[1]} alt={`${proj.name} 2`} className="w-full h-auto block opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
          </div>
        </div>
        <div className="w-full md:w-[60%] relative rounded-2xl overflow-hidden h-full">
          <div className="absolute inset-0 overflow-y-auto hide-scrollbar bg-neutral-900 border border-white/5 rounded-2xl">
            <img src={proj.col2} alt={`${proj.name} dashboard`} className="w-full h-auto block opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-85%"]);

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
    target: targetRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-85%"]);

  return (
    <section id="projects" ref={targetRef} className="relative z-30 h-[500vh] bg-transparent border-t border-white/10">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <h2 className="absolute top-10 sm:top-20 left-5 sm:left-10 hero-heading font-serif font-medium uppercase tracking-tighter text-[clamp(2rem,5vw,80px)] text-white z-50 mix-blend-difference pointer-events-none">
          Selected Works
        </h2>
        
        <motion.div style={{ x }} className="flex gap-10 md:gap-20 items-center pl-[5vw] sm:pl-[10vw] pt-20">
          {projects.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="bg-transparent backdrop-blur-3xl pt-32 pb-16 px-5 sm:px-8 md:px-10 relative z-40 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h2 className="hero-heading font-serif font-medium uppercase tracking-tight text-[clamp(2.5rem,8vw,80px)] leading-none">
            Let&apos;s Build
          </h2>
          <p className="text-white/80 font-sans font-light leading-loose text-[clamp(1rem,1.5vw,1.25rem)] max-w-md mb-4">
            Whether you need a high-performance website, custom graphics, or a rock-solid network topology, I am ready to engineer it. Send me a message!
          </p>
          
          <div className="flex flex-col gap-4 text-[#D7E2EA]">
            <a href="mailto:tsegashu@gmail.com" className="text-xl sm:text-2xl font-medium hover:text-white transition-colors flex items-center gap-3">
              tsegashu@gmail.com
            
            <a href="tel:+251947626212" className="text-xl sm:text-2xl font-medium hover:text-white transition-colors flex items-center gap-3">
              +251 947 626 212
            
            <div className="flex gap-6 mt-4">
              <a href="https://github.com/Tse12ga" target="_blank" rel="noopener noreferrer" className="text-sm font-medium uppercase tracking-widest hover:text-white transition-colors border-b border-[#D7E2EA]/30 pb-1">
                GitHub
              
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
            <button type="submit" className="mt-2 rounded-xl bg-[#D7E2EA] text-[#0C0C0C] font-serif font-light uppercase tracking-widest py-4 hover:bg-white transition-colors shadow-[0_0_20px_rgba(215,226,234,0.3)]">
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
    <div className="w-full bg-transparent overflow-x-clip text-[#D7E2EA]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
