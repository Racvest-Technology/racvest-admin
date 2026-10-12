"use client";

import * as React from "react";
import { MapPin, Phone, CheckCircle2, Siren } from "lucide-react";
import { SosAlert } from "../types";
import { cn } from "@/lib/utils";

interface SupportSosTabProps {
  alerts: SosAlert[];
}

export function SupportSosTab({ alerts }: SupportSosTabProps) {
  const [sosList, setSosList] = React.useState<SosAlert[]>(alerts);

  const handleEscalate = (id: string) => {
    setSosList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Escalated to Dispatch" } : a))
    );
    alert("Emergency SOS successfully escalated to live dispatch operations!");
  };

  const handleResolve = (id: string) => {
    setSosList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Resolved" } : a))
    );
    alert("Emergency SOS marked as resolved.");
  };

  return (
    <div className="space-y-4">
      {/* Alert Banner */}
      <div className="bg-[#FEF2F0] border border-[#FDE0DB] rounded-2xl p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#FDE0DB] text-[#C83B2B] flex items-center justify-center shrink-0">
          <Siren className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#912018]">
            Urgent Incident Management Protocol
          </h4>
          <p className="text-xs text-[#C83B2B] mt-0.5 font-body">
            Active SOS incidents bypass normal queueing. Review courier safety coordinates and escalate immediately to field emergency responders.
          </p>
        </div>
      </div>

      {/* SOS Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sosList.map((alert) => (
          <div
            key={alert.id}
            className="bg-white border border-[#E3E3DC] rounded-2xl p-5 shadow-2xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#85857B]">
                  INCIDENT #{alert.id.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-[#171713] mt-0.5">
                  {alert.reporterName} ({alert.role})
                </h4>
              </div>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                  alert.severity === "Critical"
                    ? "bg-[#FEF2F0] text-[#C83B2B] border-[#FDE0DB]"
                    : "bg-[#FFF8E7] text-[#D97706] border-[#FDECC8]"
                )}
              >
                {alert.severity} Priority
              </span>
            </div>

            <div className="bg-[#F7F7F3] p-3 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#171713]">
                <MapPin className="w-4 h-4 text-[#C83B2B] shrink-0" />
                <span className="font-medium">{alert.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#66665D]">
                <Phone className="w-4 h-4 text-[#85857B] shrink-0" />
                <span>Masked Contact: <strong className="font-mono text-[#171713]">{alert.phoneMasked}</strong></span>
              </div>
              <div className="text-[11px] text-[#66665D] pt-1 border-t border-[#E3E3DC]">
                <strong>Incident Report:</strong> {alert.reason}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-[#85857B]">
                Status:{" "}
                <span className="font-semibold text-[#171713]">
                  {alert.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {alert.status !== "Resolved" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleEscalate(alert.id)}
                      className="px-3 py-1.5 bg-[#FEF2F0] text-[#C83B2B] hover:bg-[#FDE0DB] rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Escalate Dispatch
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResolve(alert.id)}
                      className="px-3 py-1.5 bg-[#0B331E] text-white hover:bg-[#062414] rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Resolve
                    </button>
                  </>
                )}
                {alert.status === "Resolved" && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A]">
                    <CheckCircle2 className="w-4 h-4" /> Case Closed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
