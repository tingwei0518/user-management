'use client'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get('query')?.toString() || '';

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, phone, gender or occupation..."
        className="pl-9 pr-9"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={query}
      />
    </div>
  );
}

export default SearchBar;
