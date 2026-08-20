"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function RevealText({ 
  text, 
  className = "", 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  delay?: number 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateZ: 2,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap justify-center overflow-hidden ${className}`}
    >
      {words.map((word, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          className="inline-block" 
          style={{ marginRight: index !== words.length - 1 ? "0.25em" : "0" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
