"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function TextGenerationEffect({
  children,
  textColor,
  dataRole,
  isLoading
}: {
  children: string;
  textColor: string;
  dataRole: string;
  isLoading: boolean;
}) {

  if (!isLoading){
    if (dataRole === "user") {
      return <p className={textColor}>{children}</p>;
    }
    else{
      return <p>{children}</p>;
    }
  }

  if (isLoading){
      if (dataRole === "user") {
        return <p className={textColor}>{children}</p>;
      }
      else{
        return <TextGenerateEffect words={children} textColor={textColor} />;
      }
  }
}
