"use client";

import * as React from "react";
import {
  Users,
  Inbox,
  Package,
  MessageSquare,
  AlertTriangle,
  PhoneCall,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { SupportKpiMetric } from "../types";

interface SupportKpisProps {
  metrics: SupportKpiMetric[];
}

export function SupportKpis({ metrics }: SupportKpisProps) {
  const renderIcon = (type: SupportKpiMetric["iconType"], isPrimary?: boolean) => {
    const iconClass = "w-4 h-4";

    if (isPrimary) {
      return (
        <div className="w-8 h-8 rounded-lg bg-[#144A29]/70 border border-[#1E5C35] flex items-center justify-center text-[#F59E0B]">
          <Users className={iconClass} />
        </div>
      );
    }

    switch (type) {
      case "users":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <Users className={iconClass} />
          </div>
        );
      case "ticket":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <Inbox className={iconClass} />
          </div>
        );
      case "package":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#FFF4E5] text-[#DC851F] flex items-center justify-center">
            <Package className={iconClass} />
          </div>
        );
      case "pending":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <MessageSquare className={iconClass} />
          </div>
        );
      case "sos":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <AlertTriangle className={iconClass} />
          </div>
        );
      case "phone":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <PhoneCall className={iconClass} />
          </div>
        );
      case "clock":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <Clock className={iconClass} />
          </div>
        );
      case "check":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <CheckCircle2 className={iconClass} />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FA] text-[#0284C7] flex items-center justify-center">
            <Inbox className={iconClass} />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => {
        if (item.isPrimary) {
          return (
            <div
              key={item.id}
              className="bg-[#0B331E] rounded-2xl p-5 text-white flex flex-col justify-between shadow-xs transition-all hover:shadow-md"
            >
              <div>{renderIcon(item.iconType, true)}</div>

              <div className="mt-4">
                <span className="text-xs font-medium text-white/80 block font-body">
                  {item.title}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
                    {item.value}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#164D2B] text-[#4ADE80]">
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="bg-white border border-[#E3E3DC] rounded-2xl p-5 flex flex-col justify-between shadow-2xs transition-all hover:border-[#C9C9C0]"
          >
            <div>{renderIcon(item.iconType, false)}</div>

            <div className="mt-4">
              <span className="text-xs font-medium text-[#85857B] block font-body">
                {item.title}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171713] font-heading">
                  {item.value}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#16A34A]">
                  {item.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
