import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface StepData {
  id: number;
  title: string;
  details: string;
}

interface Props {
  step: StepData;
  index: number;
}

export default function Steps({ step, index }: Props) {
  // Conditionally set tailwind position based on the index
  const positionClasses =
    index === 0
      ? "top-1 md:top-12 lg:top-16 -left-2 md:-left-20 lg:-left-40"
      : index === 1
      ? "bottom-4 -left-2 md:-left-20 lg:-left-40"
      : "bottom-28 md:bottom-28 lg:bottom-20 -right-2 md:-right-24 lg:-right-56";

  const [ref, inView] = useInView({
    threshold: 0.5, // Trigger animation when 50% of the div is visible
  });

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.1, staggerChildren: 0.15 }}
        className={`w-full md:w-64 lg:w-72 md:absolute ${positionClasses} flex flex-col justify-center items-start gap-2 text-start p-4 bg-white rounded-lg`}
      >
        <p className="text-green-700 font-semibold">
          {step.id}. {step.title}
        </p>
        <p className="text-[#3A3A3A] text-xs md:text-sm">{step.details}</p>
      </motion.div>
    </AnimatePresence>
  );
}
