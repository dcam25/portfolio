"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User } from "lucide-react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000") + "/api/chat", // Corrected fallback logic
    onError: (error) => {
      toast.error("Failed to fetch response: " + error.message);
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col min-h-full max-w-4xl mx-auto p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col justify-center items-center text-center mt-12 mb-16"
      >
        <div className="inline-block p-4 rounded-full bg-blue-500/10 mb-6">
          <Bot className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground/90">
          Hi, I&apos;m the AI Assistant for this Portfolio.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-foreground/60">
          I&apos;m a Next.js & Node.js Developer specializing in E-commerce & CMS Solutions.
          Ask me about my experience, skills, or specific projects!
        </p>
      </motion.div>

      {messages.length > 0 && (
        <div className="flex-1 w-full space-y-6 mb-24 transition-all">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] ${m.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-background border border-border/50 shadow-sm rounded-tl-sm glass-panel text-foreground/80'
                  }`}
              >
                <div className="prose prose-sm dark:prose-invert break-words">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 shrink-0 rounded-full bg-muted-foreground/20 flex items-center justify-center mt-1">
                  <User className="w-5 h-5 opacity-70" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white mt-1">
                <Bot className="w-5 h-5" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-background border border-border/50 shadow-sm rounded-tl-sm glass-panel flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Form Fixed to Bottom constraint of max-w */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 z-20">
        <div className="h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <div className="bg-background pb-6 px-4">
          <div className="max-w-3xl mx-auto shadow-sm rounded-2xl border border-border/50 glass-panel">
            <form onSubmit={handleSubmit} className="flex items-end p-2 gap-2">
              <textarea
                className="w-full max-h-48 min-h-[44px] p-3 mx-2 resize-none bg-transparent placeholder:text-muted-foreground focus-visible:outline-none text-foreground text-sm"
                value={input}
                placeholder="Ask about my full-stack background..."
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }}
                rows={1}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="mb-1 mr-1 p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors text-white"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
          <div className="text-center mt-2 pb-2 text-xs text-foreground/40">
            AI Assistant may produce inaccurate information about my resume.
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
