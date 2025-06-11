"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import React from "react";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    maxSteps: 5,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b bg-white print:hidden flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-gray-600">Powered by AWS Bedrock Claude 3.7 Sonnet</p>
        </div>
        <Button onClick={handlePrint} type="button" className="ml-4" variant="outline">
          Print as PDF
        </Button>
      </div>

      {/* Messages - Scrollable */}
      <div
        className="flex-1 overflow-y-auto p-6 print:overflow-visible print:p-0 print:bg-white print:text-black"
        id="conversation-area"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages?.map((message) => (
            <div key={message.id} className="mb-6">
              <div className="text-sm text-gray-600 mb-2">{message.role}:</div>
              {message.parts?.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div key={index} className="text-gray-900 prose prose-sm max-w-none">
                        <ReactMarkdown>{part.text}</ReactMarkdown>
                      </div>
                    );

                  case "tool-invocation": {
                    const callId = part.toolInvocation.toolCallId;

                    switch (part.toolInvocation.state) {
                      case "partial-call":
                        return (
                          <div key={callId} className="mb-2">
                            <div className="text-sm text-gray-600 mb-1">Tool Call (Partial):</div>
                            <pre className="bg-yellow-50 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(part.toolInvocation, null, 2)}
                            </pre>
                          </div>
                        );

                      case "call":
                        return (
                          <div key={callId} className="mb-2">
                            <div className="text-sm text-gray-600 mb-1">Tool Call: {part.toolInvocation.toolName}</div>
                            <div className="text-sm text-gray-500 mb-1">Parameters:</div>
                            <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(part.toolInvocation.args, null, 2)}
                            </pre>
                          </div>
                        );

                      case "result":
                        return (
                          <div key={callId} className="space-y-2">
                            <div className="text-sm text-gray-600 mb-1">Tool Call: {part.toolInvocation.toolName}</div>
                            <div className="text-sm text-gray-500 mb-1">Parameters:</div>
                            <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(part.toolInvocation.args, null, 2)}
                            </pre>
                            <div className="text-sm text-gray-600">Tool Result:</div>
                            <pre className="bg-green-50 p-3 rounded text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(part.toolInvocation.result, null, 2)}
                            </pre>
                          </div>
                        );

                      default:
                        return null;
                    }
                  }

                  case "reasoning":
                    return (
                      <pre key={index}>
                        {part.details.map((detail) => (detail.type === "text" ? detail.text : "<redacted>"))}
                      </pre>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))
        )}
      </div>

      {/* Input - Fixed at bottom */}
      <div className="border-t bg-white p-4 print:hidden">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input value={input} onChange={handleInputChange} placeholder="Ask me anything..." className="flex-1" />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
