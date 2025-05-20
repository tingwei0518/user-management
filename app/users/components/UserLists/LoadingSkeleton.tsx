import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoadingCardView = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col items-center space-y-4 pt-13">
          <Skeleton className="h-30 w-30 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const LoadingTableView = () => (
  <div className="h-[400px] rounded-md border p-2 bg-white">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b bg-gray-50">
          {[...Array(6)].map((_, i) => (
            <th key={i} className="text-left px-4 py-3">
              <Skeleton className="h-4 w-20" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, rowIndex) => (
          <tr key={rowIndex} className="border-b">
            {[...Array(6)].map((_, colIndex) => (
              <td key={colIndex} className="px-4 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div className="h-[inherit] flex flex-col bg-gray-100">
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <div className="pb-4 bg-white rounded-lg border border-gray-200 overflow-hidden w-full h-full flex flex-col">
          <Tabs defaultValue="card" className="flex flex-col h-full relative">
            <div className="sticky top-0 left-0 right-0 bg-white z-10 border-b py-3 px-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 max-w-md">
                  <Skeleton className="h-9 w-full" />
                </div>
                <TabsList>
                  <TabsTrigger value="card">Card View</TabsTrigger>
                  <TabsTrigger value="table">Table View</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="card" className="p-4 h-full">
                <LoadingCardView />
              </TabsContent>
              <TabsContent value="table" className="p-4 h-full">
                <LoadingTableView />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <div className="flex-none p-4 border-t bg-white">
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;