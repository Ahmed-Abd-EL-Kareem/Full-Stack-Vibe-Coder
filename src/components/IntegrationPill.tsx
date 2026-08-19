'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
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
  const pillRef = useRef<HTMLButtonElement>(null);
  const IconComponent = ICON_MAP[integration.icon] || Webhook;

  const handleClick = () => {
    if (pillRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(
          pillRef.current,
          { scale: 0.96 },
          { scale: 1, duration: 0.3, ease: 'back.out(2)' }
        );
      }
    }
    onToggle(integration.id);
  };

  return (
    <button
      ref={pillRef}
      type="button"
      onClick={handleClick}
      className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 select-none ${
        isSelected
          ? 'border-[#4A2545] dark:border-amber-500 bg-[#FFE9E2] dark:bg-amber-950/20 text-[#32102F] dark:text-white shadow-sm ring-1 ring-[#4A2545]/30 dark:ring-amber-500/40'
          : 'border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] text-[#4E444B] dark:text-[#94A3B8] hover:border-[#D9A5A0] dark:hover:border-[#383E4F] hover:bg-[#FFF1EC] dark:hover:bg-[#1A1D24] hover:text-[#32102F] dark:hover:text-white shadow-ballet-card dark:shadow-solaris-card'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${
          isSelected
            ? 'border-[#4A2545]/40 dark:border-amber-500/40 bg-[#4A2545] dark:bg-amber-500/20 text-white dark:text-amber-400'
            : 'border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF1EC] dark:bg-[#1A1D24] text-[#4A2545] dark:text-[#94A3B8] group-hover:bg-[#FFE9E2] dark:group-hover:text-white'
        }`}
      >
        <IconComponent className="h-4 w-4" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="font-sans text-xs font-bold text-[#32102F] dark:text-white truncate transition-colors">
            {integration.name}
          </span>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold transition-colors ${
              isSelected
                ? 'bg-[#4A2545] dark:bg-amber-500/20 text-white dark:text-amber-300'
                : 'bg-[#FFF1EC] dark:bg-[#222630] text-[#80747B] dark:text-[#94A3B8]'
            }`}
          >
            {integration.category}
          </span>
        </div>

        <span className="text-xs text-[#4E444B] dark:text-[#94A3B8] leading-tight mt-1 truncate font-sans transition-colors">
          {integration.tagline}
        </span>

        <span className="text-[11px] font-mono text-[#80747B] dark:text-[#64748B] mt-1.5 truncate">
          {integration.systemContext.apiEndpoints[0]}
        </span>
      </div>

      {/* Check indicator */}
      <div
        className={`ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all mt-0.5 ${
          isSelected
            ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11]'
            : 'border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#1A1D24] text-transparent group-hover:border-[#D9A5A0] dark:group-hover:border-[#383E4F]'
        }`}
      >
        <Check className="h-2.5 w-2.5 stroke-[3]" />
      </div>
    </button>
  );
}
