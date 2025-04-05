import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { TextGenerationEffect } from "./TextGenerationEffect";

const NonMemoizedMarkdown = ({ children,dataRole,isLoading }: { children: string,dataRole:string,isLoading:boolean }) => {

  const textColor = dataRole === "user" ? "text-white dark:text-black" : "text-black dark:text-white"

  const components: Partial<Components> = {
    // @ts-expect-error
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        // @ts-expect-error
        <pre
          {...props}
          className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2 dark:bg-zinc-800`}
        >
          <code className={match[1]}><TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect></code>
        </pre>
      ) : (
        <code
          className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
          {...props}
        >
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </code>
      );
    },
    ol: ({ node, children, ...props }) => {
      return (
        <ol className="list-decimal list-outside ml-4" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </ol>
      );
    },
    li: ({ node, children, ...props }) => {
      return (
        <li className="py-1" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </li>
      );
    },
    ul: ({ node, children, ...props }) => {
      return (
        <ul className="list-decimal list-outside ml-4" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </ul>
      );
    },
    strong: ({ node, children, ...props }) => {
      return (
        <span className="font-semibold" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </span>
      );
    },
    a: ({ node, children, ...props }) => {
      return (
        // @ts-expect-error
        <Link
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer"
          {...props}
        >
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </Link>
      );
    },
    p: ({ node, children, ...props }) => {
      return (
        <p {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </p>
      );
    },
    h1: ({ node, children, ...props }) => {
      return (
        <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h1>
      );
    },
    h2: ({ node, children, ...props }) => {
      return (
        <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      return (
        <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h3>
      );
    },
    h4: ({ node, children, ...props }) => {
      return (
        <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h4>
      );
    },
    h5: ({ node, children, ...props }) => {
      return (
        <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h5>
      );
    },
    h6: ({ node, children, ...props }) => {
      return (
        <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
          <TextGenerationEffect isLoading={isLoading} dataRole={dataRole} textColor={textColor}>{String(children)}</TextGenerationEffect>
        </h6>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.dataRole === nextProps.dataRole && prevProps.isLoading == nextProps.isLoading
);
