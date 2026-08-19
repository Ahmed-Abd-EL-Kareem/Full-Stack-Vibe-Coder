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
          { scale: 1, duration: 0.3, ease: 'back.out(2)', overwrite: 'auto' }
        );
      }
    }
    onToggle(integration.id);
  };

  const handleMouseEnter = () => {
    if (pillRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.to(pillRef.current, { y: -2, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
      }
    }
  };

  const handleMouseLeave = () => {
    if (pillRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.to(pillRef.current, { y: 0, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
      }
    }
  };

  return (
    <button
      ref={pillRef}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`integration-pill-item group relative flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors duration-150 select-none ${
        isSelected
          ? 'border-[#6B2D5B] dark:border-[#C98DB8] bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 text-[#2A1525] dark:text-[#F2EDE9] shadow-sm ring-1 ring-[#6B2D5B]/30 dark:ring-[#C98DB8]/40'
          : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] text-[#5A4550] dark:text-[#A89B9F] hover:border-[#D4764E] dark:hover:border-[#5A4550] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025] hover:text-[#2A1525] dark:hover:text-white shadow-ballet-card dark:shadow-velvet-card'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${
          isSelected
            ? 'border-[#6B2D5B]/40 dark:border-[#C98DB8]/40 bg-[#6B2D5B] dark:bg-[#C98DB8]/20 text-white dark:text-[#C98DB8]'
            : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#F5EBE8] dark:bg-[#2D2025] text-[#6B2D5B] dark:text-[#C98DB8] group-hover:bg-[#F5EBE8] dark:group-hover:bg-[#3D2E35]'
        }`}
      >
        <IconComponent className="h-4 w-4" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="font-sans text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9] truncate transition-colors">
            {integration.name}
          </span>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold transition-colors ${
              isSelected
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8]/20 text-white dark:text-[#D4A3C8]'
                : 'bg-[#F5EBE8] dark:bg-[#3D2E35] text-[#80747B] dark:text-[#A89B9F]'
            }`}
          >
            {integration.category}
          </span>
        </div>

        <span className="text-xs text-[#5A4550] dark:text-[#A89B9F] leading-tight mt-1 truncate font-sans transition-colors">
          {integration.tagline}
        </span>

        <span className="text-[11px] font-mono text-[#80747B] dark:text-[#7A6B70] mt-1.5 truncate">
          {integration.systemContext.apiEndpoints[0]}
        </span>
      </div>

      {/* Check indicator */}
      <div
        className={`ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-all mt-0.5 ${
          isSelected
            ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216]'
            : 'border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#2D2025] text-transparent group-hover:border-[#D4764E] dark:group-hover:border-[#5A4550]'
        }`}
      >
        <Check className="h-2.5 w-2.5 stroke-[3]" />
      </div>
    </button>
  );
}
