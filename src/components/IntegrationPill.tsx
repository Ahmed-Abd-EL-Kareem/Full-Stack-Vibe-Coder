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
  Check,
  Plus
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
      className={`group relative flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left transition-all duration-200 ${
        isSelected
          ? 'border-stunning-500 bg-stunning-950/70 text-white shadow-lg shadow-stunning-500/10 ring-1 ring-stunning-500/50'
          : 'border-surface-border bg-surface-card/60 text-gray-300 hover:border-gray-600 hover:bg-surface-hover/80 hover:text-white'
      }`}
    >
      {/* Icon with Brand Accent */}
      <div
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 transition-colors"
        style={{
          backgroundColor: isSelected ? `${integration.brandColor}22` : 'rgba(255, 255, 255, 0.05)',
          color: integration.brandColor,
        }}
      >
        <IconComponent className="h-4 w-4" />
      </div>

      {/* Text Info */}
      <div className="flex flex-col">
        <span className="text-xs font-semibold leading-tight">{integration.name}</span>
        <span className="text-[10px] text-surface-muted leading-tight">{integration.tagline}</span>
      </div>

      {/* Indicator */}
      <div
        className={`ml-auto flex h-4 w-4 items-center justify-center rounded-full transition-all ${
          isSelected
            ? 'bg-stunning-500 text-white shadow-sm'
            : 'bg-surface-border text-surface-muted group-hover:text-gray-200'
        }`}
      >
        {isSelected ? <Check className="h-2.5 w-2.5" /> : <Plus className="h-2.5 w-2.5" />}
      </div>
    </button>
  );
}
