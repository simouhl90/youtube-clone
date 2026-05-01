'use client';

export function HeroBannerSkeleton() {
  return (
    <div className="w-full h-[70vh] min-h-[500px] skeleton-shimmer rounded-none" />
  );
}

export function SeriesRowSkeleton() {
  return (
    <div>
      {/* Title shimmer */}
      <div className="w-32 h-5 rounded-lg skeleton-shimmer mb-4" />
      {/* Row of skeleton cards */}
      <div className="flex gap-3 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[140px] aspect-[2/3] rounded-2xl skeleton-shimmer flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export function SeriesDetailSkeleton() {
  return (
    <div>
      {/* Backdrop */}
      <div className="h-[45vh] min-h-[340px] skeleton-shimmer" />

      {/* Content */}
      <div className="px-5 pt-20">
        {/* Title */}
        <div className="w-48 h-8 rounded-lg skeleton-shimmer mt-4" />

        {/* Meta row - 4 dots */}
        <div className="flex items-center gap-2 mt-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-3 rounded-full skeleton-shimmer"
            />
          ))}
        </div>

        {/* Genre pills */}
        <div className="flex items-center gap-2 mt-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-16 h-6 rounded-full skeleton-shimmer"
            />
          ))}
        </div>

        {/* Button */}
        <div className="w-full h-12 rounded-xl skeleton-shimmer mt-5" />

        {/* Synopsis lines */}
        <div className="mt-5 space-y-2">
          <div className="w-full h-3 rounded skeleton-shimmer" />
          <div className="w-full h-3 rounded skeleton-shimmer" />
          <div className="w-3/4 h-3 rounded skeleton-shimmer" />
        </div>

        {/* Episodes header */}
        <div className="w-40 h-4 rounded skeleton-shimmer mt-6 mb-3" />

        {/* Episode rows */}
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              {/* Thumbnail */}
              <div className="w-[130px] flex-shrink-0 aspect-video rounded-lg skeleton-shimmer" />
              {/* Text lines */}
              <div className="flex-1 py-0.5 space-y-2">
                <div className="w-3/4 h-3 rounded skeleton-shimmer" />
                <div className="w-1/2 h-3 rounded skeleton-shimmer" />
                <div className="w-full h-3 rounded skeleton-shimmer" />
                <div className="w-2/3 h-3 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-center">
          <div className="w-[140px] aspect-[2/3] rounded-2xl skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full skeleton-shimmer mt-8" />
      {/* Name */}
      <div className="w-32 h-6 rounded-lg skeleton-shimmer mt-4" />
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 px-5 w-full">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-16 rounded-2xl skeleton-shimmer"
          />
        ))}
      </div>
      {/* Settings rows */}
      <div className="mt-6 px-5 w-full space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-full h-14 rounded-xl skeleton-shimmer"
          />
        ))}
      </div>
    </div>
  );
}
