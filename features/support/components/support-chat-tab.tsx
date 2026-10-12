"use client";

import * as React from "react";
import { Send, Phone, ShieldCheck } from "lucide-react";
import { LiveChatSession } from "../types";
import { cn } from "@/lib/utils";

interface SupportChatTabProps {
  sessions: LiveChatSession[];
}

export function SupportChatTab({ sessions }: SupportChatTabProps) {
  const [activeSessionId, setActiveSessionId] = React.useState<string>(
    sessions[0]?.id || ""
  );
  const [chatList, setChatList] = React.useState<LiveChatSession[]>(sessions);
  const [replyText, setReplyText] = React.useState("");

  const activeSession = chatList.find((s) => s.id === activeSessionId) || chatList[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "agent" as const,
      text: replyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatList((prev) =>
      prev.map((s) =>
        s.id === activeSession.id
          ? {
              ...s,
              messages: [...s.messages, newMessage],
              lastMessage: newMessage.text,
              timestamp: "Just now",
            }
          : s
      )
    );

    setReplyText("");
  };

  return (
    <div className="bg-white border border-[#E3E3DC] rounded-2xl shadow-2xs overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
      {/* Left Column: Active Chats List */}
      <div className="border-r border-[#E3E3DC] flex flex-col bg-[#FCFCFA]">
        <div className="p-4 border-b border-[#E3E3DC]">
          <h3 className="text-sm font-bold text-[#171713] font-heading">
            Live Conversations ({chatList.length})
          </h3>
          <p className="text-xs text-[#85857B] mt-0.5 font-body">
            Active real-time customer and traveler relays
          </p>
        </div>

        <div className="divide-y divide-[#E3E3DC] overflow-y-auto flex-1">
          {chatList.map((session) => {
            const isActive = session.id === activeSessionId;

            return (
              <button
                key={session.id}
                type="button"
                onClick={() => setActiveSessionId(session.id)}
                className={cn(
                  "w-full text-left p-4 transition-colors flex items-start gap-3 cursor-pointer",
                  isActive ? "bg-white border-l-4 border-l-[#0B331E]" : "hover:bg-[#F7F7F3]"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center shrink-0">
                  {session.customerName.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#171713] truncate">
                      {session.customerName}
                    </span>
                    <span className="text-[10px] text-[#85857B]">
                      {session.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-[#0B331E] font-medium bg-[#DCFCE7] px-1.5 py-0.2 rounded">
                      {session.customerRole}
                    </span>
                    <span className="text-[10px] font-mono text-[#85857B]">
                      {session.orderCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#66665D] truncate mt-1">
                    {session.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Window */}
      {activeSession ? (
        <div className="md:col-span-2 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-[#E3E3DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center">
                {activeSession.customerName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#171713]">
                    {activeSession.customerName}
                  </h4>
                  <span className="text-[10px] bg-[#E0F2FE] text-[#0284C7] px-2 py-0.5 rounded-full font-semibold">
                    {activeSession.customerRole}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#85857B] mt-0.5">
                  <span>Order Ref: <strong className="font-mono text-[#171713]">{activeSession.orderCode}</strong></span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[#16A34A]">
                    <ShieldCheck className="w-3.5 h-3.5" /> PII Masked Relay
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Connecting masked relay call to ${activeSession.customerName}...`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F7F3] hover:bg-[#EBEBE4] border border-[#E3E3DC] rounded-xl text-xs font-semibold text-[#171713] cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Masked Call</span>
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#F7F7F3]/40">
            {activeSession.messages.map((msg) => {
              const isAgent = msg.sender === "agent";

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    isAgent ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-xs font-body shadow-2xs",
                      isAgent
                        ? "bg-[#0B331E] text-white rounded-br-xs"
                        : "bg-white border border-[#E3E3DC] text-[#171713] rounded-bl-xs"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#85857B] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-[#E3E3DC] bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the user..."
              className="flex-1 px-4 py-2.5 bg-[#F7F7F3] border border-[#E3E3DC] rounded-xl text-xs text-[#171713] focus:outline-none focus:ring-1 focus:ring-[#0B331E]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#0B331E] hover:bg-[#062414] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="md:col-span-2 flex items-center justify-center p-8 text-[#85857B] text-xs">
          Select a conversation from the left to start responding.
        </div>
      )}
    </div>
  );
}
