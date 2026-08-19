'use client';

import React from 'react';
import {
  CreditCard,
  ShoppingBag,
  Mail,
  MessageSquare,
  Table,
  Database,
  Webhook,
  Check
} from 'lucide-react';
import { Integration } from '@/lib/integrations';

interface IntegrationPillProps {
  integration: Integration;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  ShoppingBag,
  Mail,
  MessageSquare,
  Table,
  Database,
  Webhook,
};

export default function IntegrationPill({
  integration,
  isSelected,
  onToggle,
}: IntegrationPillProps) {
  const IconComponent = ICON_MAP[integration.icon] || Webhook;

  return (
    <button
      type="button"
      onClick={() => onToggle(integration.id)}
      className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 select-none ${
        isSelected
          ? 'border-[#4A2545] bg-[#FFE9E2] text-[#32102F] shadow-sm ring-1 ring-[#4A2545]/30'
          : 'border-[#E8D5CE] bg-[#FFFFFF] text-[#4E444B] hover:border-[#D9A5A0] hover:bg-[#FFF1EC] hover:text-[#32102F] shadow-ballet-card'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${
          isSelected
            ? 'border-[#4A2545]/40 bg-[#4A2545] text-white'
            : 'border-[#E8D5CE] bg-[#FFF1EC] text-[#4A2545] group-hover:bg-[#FFE9E2]'
        }`}
      >
        <IconComponent className="h-4 w-4" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="font-sans text-xs font-bold text-[#32102F] truncate">
            {integration.name}
          </span>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
              isSelected
                ? 'bg-[#4A2545] text-white'
                : 'bg-[#FFF1EC] text-[#80747B]'
            }`}
          >
            {integration.category}
          </span>
        </div>

        <span className="text-xs text-[#4E444B] leading-tight mt-1 truncate font-sans">
          {integration.tagline}
        </span>

        <span className="text-[11px] font-mono text-[#80747B] mt-1.5 truncate">
          {integration.systemContext.apiEndpoints[0]}
        </span>
      </div>

      {/* Check indicator */}
      <div
        className={`ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all mt-0.5 ${
          isSelected
            ? 'bg-[#4A2545] text-white'
            : 'border border-[#E8D5CE] bg-white text-transparent group-hover:border-[#D9A5A0]'
        }`}
      >
        <Check className="h-2.5 w-2.5 stroke-[3]" />
      </div>
    </button>
  );
}
