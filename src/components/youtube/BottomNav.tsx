'use client';

import { Home, Clapperboard, Plus, Users, Library } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { AppView } from '@/types';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  view: AppView;
  isCreate?: boolean;
}

const navItems: NavItem[] = [
  {
    icon: <Home className="size-5" />,
    label: 'Home',
    view: { type: 'home' },
  },
  {
    icon: <Clapperboard className="size-5" />,
    label: 'Shorts',
    view: { type: 'shorts' },
  },
  {
    icon: <Plus className="size-6" />,
    label: 'Create',
    view: { type: 'home' },
    isCreate: true,
  },
  {
    icon: <Users className="size-5" />,
    label: 'Subscriptions',
    view: { type: 'subscriptions' },
  },
  {
    icon: <Library className="size-5" />,
    label: 'Library',
    view: { type: 'library' },
  },
];

export default function BottomNav() {
  const { currentView, navigate } = useAppStore();

  const isActive = (view: AppView) => {
    if (view.type === 'home' && currentView.type === 'video') return true;
    if (view.type === 'home' && currentView.type === 'home') return true;
    return currentView.type === view.type;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-1">
        {navItems.map((item) => {
          const active = item.isCreate ? false : isActive(item.view);

          if (item.isCreate) {
            return (
              <button
                key={item.label}
                className="flex flex-col items-center justify-center gap-0.5"
                aria-label={item.label}
              >
                <div className="flex size-9 items-center justify-center rounded-full border border-foreground/20">
                  <div className="text-[#FF0000]">{item.icon}</div>
                </div>
                <span className="text-[10px] leading-tight text-muted-foreground">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.view)}
              className="flex min-w-[56px] flex-col items-center justify-center gap-0.5 py-1 transition-colors"
              aria-label={item.label}
            >
              <span className={active ? 'text-foreground' : 'text-muted-foreground'}>
                {item.icon}
              </span>
              <span
                className={`text-[10px] leading-tight ${
                  active ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
