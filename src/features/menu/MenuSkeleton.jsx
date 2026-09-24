import React from 'react';

export default function MenuSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse" aria-busy="true" aria-label="Memuat menu...">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200/70 flex gap-4 items-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-stone-200 shrink-0" />
          <div className="flex flex-col justify-between h-20 md:h-24 w-full">
            <div className="space-y-2">
              <div className="h-5 bg-stone-200 rounded w-3/4" />
              <div className="h-3.5 bg-stone-100 rounded w-full" />
              <div className="h-3.5 bg-stone-100 rounded w-1/2" />
            </div>
            <div className="h-4 bg-stone-200 rounded w-1/3 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
