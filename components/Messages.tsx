"use client"

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { AnimatedGradientText } from "./magicui/animated-gradient-text";
import { TOOL_RESPONSE_REGISTRY } from "@/lib/registry";
import { Markdown } from "./markdown";

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



type Message = {
  role: "user" | "system"
  content: string
  tool_type: TOOL_RESPONSE_REGISTRY
}


export const PreviewMessage = ({
  message,
}: {
  message: Message;
  isLoading: boolean;
}) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-4xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "group-data-[role=user]/message:bg-primary group-data-[role=user]/message:text-primary-foreground flex items-center gap-1 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
        )}
      >
        {message.role === "system" && (
          <div className="size-8 flex items-center rounded-full justify-center">
          <SparklesIcon size={14} />
        </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          {message.content && (
            <div className="flex flex-col gap-4">
              <Markdown>{message.content}</Markdown>
            </div>
          )}

          {/* {message.toolInvocations && message.toolInvocations.length > 0 && (
            <div className="flex flex-col gap-4">
              {message.toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "get_current_weather" ? (
                        <Weather weatherAtLocation={result} />
                      ) : (
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                }
                return (
                  <div
                    key={toolCallId}
                    className={cn({
                      skeleton: ["get_current_weather"].includes(toolName),
                    })}
                  >
                    {toolName === "get_current_weather" ? <Weather /> : null}
                  </div>
                );
              })}
            </div>
          )}

          {message.experimental_attachments && (
            <div className="flex flex-row gap-2">
              {message.experimental_attachments.map((attachment) => (
                <PreviewAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
};