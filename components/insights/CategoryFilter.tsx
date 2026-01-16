/**
 * [Filter] Category Filter Component
 * Client-side filtering for blog posts
 */

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCategoryColor } from "@/lib/category-colors";

interface Category {
  slug: string;
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  totalPosts: number;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory, totalPosts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* All Button */}
      <button
        onClick={() => onSelectCategory('all')}
        className={cn(
          "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95",
          selectedCategory === 'all'
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
            : "bg-white text-slate-600 border border-slate-200 hover:border-blue-600 hover:text-blue-600"
        )}
      >
        전체
        <span className="ml-2 text-xs opacity-70">
          {totalPosts}
        </span>
      </button>

      {/* Category Buttons */}
      {categories.map((category) => {
        const colors = getCategoryColor(category.name);
        const isSelected = selectedCategory === category.slug;
        
        // Extract hex color from bg class
        const bgColorMatch = colors.hoverBg.match(/\[([#\w]+)\]/);
        const bgColor = bgColorMatch ? bgColorMatch[1] : '#4285F4';
        
        return (
          <button
            key={category.slug}
            onClick={() => onSelectCategory(category.slug)}
            className={cn(
              "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 relative overflow-hidden group hover:scale-105 active:scale-95"
            )}
            style={
              isSelected
                ? {
                    backgroundColor: bgColor,
                    color: colors.text === 'text-white' ? 'white' : '#0f172a',
                    boxShadow: `0 10px 25px -5px ${bgColor}40`,
                  }
                : {
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                  }
            }
          >
            {/* Hover overlay */}
            {!isSelected && (
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: bgColor }}
              />
            )}
            
            <span className="relative z-10">
              {category.name}
              <span className="ml-2 text-xs opacity-70">{category.count}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
