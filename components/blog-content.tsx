"use client";

import ReactMarkdown from "react-markdown";

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
