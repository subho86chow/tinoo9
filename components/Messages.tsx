"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-4xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
      data-role={role}
    >
      <div
        className={cn(
          "flex items-center gap-1 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          },
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center">
          <SparklesIcon size={14} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <AnimatedGradientText className="text-sm font-medium">
            Thinking ...
          </AnimatedGradientText>
        </div>
      </div>
    </motion.div>
  );
};