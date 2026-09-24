import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { useMenu } from './useMenu';
import MenuSkeleton from './MenuSkeleton';
import { DEFAULT_MENU_CATEGORIES } from './menu.constants';

export default function MenuList({
  activeCategory = 'semua',
  onSelectCategory,
  sectionRefs,
  categories = DEFAULT_MENU_CATEGORIES,
  menuState,
}) {
  const internalState = useMenu();
  const { data, isLoading, isError, error, refetch } = menuState || internalState;

  const groupedData = useMemo(() => {
    if (!data) return {};
    const itemsByCategory = new Map();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let items = itemsByCategory.get(item.category);
      if (!items) {
        items = [];
        itemsByCategory.set(item.category, items);
      }
      items.push(item);
    }

    const result = {};
    for (let i = 1; i < categories.length; i++) {
      const cat = categories[i];
      const items = itemsByCategory.get(cat.id);
      if (items && items.length > 0) {
        result[cat.id] = { ...cat, items };
      }
    }
    return result;
  }, [data, categories]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return activeCategory === 'semua'
      ? data
      : data.filter((item) => item.category === activeCategory);
  }, [data, activeCategory]);

  if (isLoading) {
    return <MenuSkeleton count={6} />;
  }

  if (isError) {
    return (
      <MenuError
        message={error?.message || 'Gagal memuat data menu'}
        onRetry={refetch}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 font-medium">Menu belum tersedia saat ini.</p>
      </div>
    );
  }

  if (activeCategory === 'semua') {
    return (
      <div className="space-y-12">
        {Object.entries(groupedData).map(([catId, catData]) => (
          <section
            key={catId}
            ref={(el) => {
              if (sectionRefs?.current) {
                sectionRefs.current[catId] = el;
              }
            }}
            className="scroll-mt-32"
          >
            {/* Section Header */}
            <div className="border-b-2 border-stone-300/80 pb-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs border border-stone-200/80">
                    {catData.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 leading-none mb-1">
                      {catData.label}
                    </h2>
                    <span className="text-sm text-slate-600 font-medium bg-stone-200/60 px-2.5 py-0.5 rounded-full">
                      {catData.items.length} pilihan menu
                    </span>
                  </div>
                </div>
                {onSelectCategory && (
                  <button
                    onClick={() => onSelectCategory(catId)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-950 transition shadow-md active:scale-95"
                  >
                    Lihat Semua
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catData.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredData.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
