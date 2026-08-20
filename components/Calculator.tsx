"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const RadioCircle = ({ active }: { active: boolean }) => (
  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${active ? 'border-[#FF5656]' : 'border-neutral-500'}`}>
    {active && <div className="w-2 h-2 rounded-full bg-[#FF5656]" />}
  </div>
);

export default function Calculator() {
  const [serviceType, setServiceType] = useState<"design" | "development" | "both">("both");
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<"regular" | "fast" | "rush">("regular");

  const calculatePrice = () => {
    let base = 0;
    let perPage = 0;
    if (serviceType === "design") { base = 399; perPage = 100; }
    if (serviceType === "development") { base = 199; perPage = 100; }
    if (serviceType === "both") { base = 499; perPage = 200; }

    let total = Math.max(base, base + (pages - 1) * perPage);
    if (needContent) total += pages * 50;
    if (needSEO) total += pages * 50;
    if (timeline === "rush") total += pages * 100;
    if (timeline === "fast") total += pages * 25;
    
    return total;
  };

  const calculateAgencyCost = () => {
    const perPage = serviceType === "both" ? 1000 : 400;
    return 8000 + (pages - 1) * perPage;
  };

  const calculateFreelancerCost = () => {
    const perPage = serviceType === "both" ? 500 : 200;
    return 3000 + (pages - 1) * perPage;
  };

  return (
    <section id="calculator-section" className="w-full bg-black py-16 md:py-28 px-4 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-[0.2em] mb-4">
            Try project estimation calculator
          </p>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal">
            Get premium website within your budget
          </h2>
        </div>

        {/* Calculator Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* LEFT COLUMN: Calculator Form */}
          <div className="bg-[#0D0D0D] p-8 lg:p-12 flex flex-col divide-y divide-[#1E1E1E]">
            
            {/* Section 1: Service Type */}
            <div className="pb-8">
              <h3 className="text-white text-lg font-medium mb-6">What kind of service do you need?</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" className="hidden" checked={serviceType === "design"} onChange={() => setServiceType("design")} />
                  <RadioCircle active={serviceType === "design"} />
                  <span className="text-white group-hover:text-neutral-300 transition-colors">Only Design</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" className="hidden" checked={serviceType === "development"} onChange={() => setServiceType("development")} />
                  <RadioCircle active={serviceType === "development"} />
                  <span className="text-white group-hover:text-neutral-300 transition-colors">Only Development</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" className="hidden" checked={serviceType === "both"} onChange={() => setServiceType("both")} />
                  <RadioCircle active={serviceType === "both"} />
                  <span className="text-white group-hover:text-neutral-300 transition-colors">Design + Development</span>
                </label>
              </div>
            </div>

            {/* Section 2: Number of Pages */}
            <div className="py-8">
              <h3 className="text-white text-lg font-medium mb-6 flex items-center gap-2">
                Number of Pages: <span className="text-[#FF5656]">{pages}</span>
              </h3>
              <div className="relative w-full pt-2">
                <input 
                  type="range" 
                  min={1} 
                  max={30} 
                  step={1} 
                  value={pages} 
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1E1E1E] rounded-full appearance-none cursor-pointer accent-[#FF5656] focus:outline-none"
                />
                <style dangerouslySetInnerHTML={{__html: `
                  input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #FF5656;
                    cursor: pointer;
                    border: 3px solid #0D0D0D;
                    box-shadow: 0 0 0 1px #FF5656;
                  }
                  input[type=range]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #FF5656;
                    cursor: pointer;
                    border: 3px solid #0D0D0D;
                    box-shadow: 0 0 0 1px #FF5656;
                  }
                `}} />
                <div className="flex justify-between mt-3 text-neutral-500 text-sm">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* Section 3: Add-ons */}
            <div className="py-8">
              <h3 className="text-white text-lg font-medium mb-6">Add-ons</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="hidden" checked={needContent} onChange={(e) => setNeedContent(e.target.checked)} />
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 transition-colors ${needContent ? 'border-[#FF5656] bg-[#FF5656]' : 'border-neutral-500 bg-transparent'}`}>
                      {needContent && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-white text-sm md:text-base group-hover:text-neutral-300 transition-colors">I will need help with content</span>
                  </div>
                  <span className="text-[#FF5656] font-medium text-sm md:text-base">+$50/pages</span>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="hidden" checked={needSEO} onChange={(e) => setNeedSEO(e.target.checked)} />
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 transition-colors ${needSEO ? 'border-[#FF5656] bg-[#FF5656]' : 'border-neutral-500 bg-transparent'}`}>
                      {needSEO && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-white text-sm md:text-base group-hover:text-neutral-300 transition-colors">I want to optimize my website for SEO</span>
                  </div>
                  <span className="text-[#FF5656] font-medium text-sm md:text-base">+$50/pages</span>
                </label>
              </div>
            </div>

            {/* Section 4: Timeline */}
            <div className="pt-8">
              <h3 className="text-white text-lg font-medium mb-6">How fast do you need this?</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="radio" className="hidden" checked={timeline === "rush"} onChange={() => setTimeline("rush")} />
                    <RadioCircle active={timeline === "rush"} />
                    <span className="text-white group-hover:text-neutral-300 transition-colors">Within 7 Days</span>
                  </div>
                  <span className="text-[#FF5656] font-medium text-sm md:text-base">+$100/pages</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="radio" className="hidden" checked={timeline === "fast"} onChange={() => setTimeline("fast")} />
                    <RadioCircle active={timeline === "fast"} />
                    <span className="text-white group-hover:text-neutral-300 transition-colors">Within 14 Days</span>
                  </div>
                  <span className="text-[#FF5656] font-medium text-sm md:text-base">+$25/pages</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input type="radio" className="hidden" checked={timeline === "regular"} onChange={() => setTimeline("regular")} />
                    <RadioCircle active={timeline === "regular"} />
                    <span className="text-white group-hover:text-neutral-300 transition-colors">Regular Speed <span className="hidden sm:inline">(Based on discussion)</span></span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Estimation */}
          <div className="bg-[#111111] p-8 lg:p-12 border border-white/10 lg:rounded-r-2xl flex flex-col justify-center min-h-[717.98px]">
            <h3 className="text-white text-2xl md:text-3xl font-medium mb-2">Estimated Cost</h3>
            <p className="text-neutral-400 mb-10 text-sm md:text-base leading-relaxed">
              This is a rough estimate of what your project might cost. The final price can vary depending on the scope and complexity of your requirements.
            </p>

            <div className="space-y-4 w-full">
              
              {/* Agency Card */}
              <div className="bg-neutral-800/50 rounded-2xl p-6 flex flex-col gap-1 border border-white/5">
                <span className="text-neutral-400 text-sm">Typical Agency charges minimum</span>
                <span className="text-white text-3xl md:text-4xl font-bold line-through opacity-70">
                  ${calculateAgencyCost().toLocaleString()}
                </span>
                <span className="text-neutral-500 text-sm mt-2">+ Too much extra time & additional cost</span>
              </div>

              {/* Freelancer Card */}
              <div className="bg-neutral-800/50 rounded-2xl p-6 flex flex-col gap-1 border border-white/5">
                <span className="text-neutral-400 text-sm">Regular Freelancer charges minimum</span>
                <span className="text-white text-3xl md:text-4xl font-bold line-through opacity-70">
                  ${calculateFreelancerCost().toLocaleString()}
                </span>
                <span className="text-neutral-500 text-sm mt-2">+ Too much headache & back-and-forth</span>
              </div>

              {/* Your Price Card */}
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl p-6 flex flex-col gap-1 shadow-xl">
                <span className="text-white/90 text-sm font-medium">With Webfluin Studio</span>
                <span className="text-white text-4xl md:text-5xl font-bold">
                  ${calculatePrice().toLocaleString()}
                </span>
                <span className="text-white/80 text-sm mt-2">+ Save your money, time & headache</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
