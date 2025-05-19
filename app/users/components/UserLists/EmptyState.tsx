'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

export const EmptyState = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const isSearching = !!query;

  const title = isSearching ? 'No Search Results' : 'No Users Found';
  const message = isSearching
    ? `No users match your search criteria "${query}". Try adjusting your search query.`
    : 'There are no users to display. Try adding a new user.';

  return (
    <div className="flex flex-col items-center justify-center h-[400px] w-full border border-dashed rounded-lg p-10">
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
