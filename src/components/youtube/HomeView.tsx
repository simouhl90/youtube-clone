'use client';

import Header from './Header';
import CategoryChips from './CategoryChips';
import VideoGrid from './VideoGrid';
import { useAppStore } from '@/store/useAppStore';

export default function HomeView() {
  const { selectedCategory } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryChips />
      <div className="pb-20 pt-1">
        <VideoGrid category={selectedCategory} />
      </div>
    </div>
  );
}
