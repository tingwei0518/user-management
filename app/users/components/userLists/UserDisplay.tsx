import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CardView } from '@/app/users/components/userLists/CardView';
import { TableView } from '@/app/users/components/userLists/TableView';
import SearchBar from '@/app/users/components/userLists/SearchBar';
import { User } from '@/app/types/user';

export interface CardListsProps {
  users: User[];
}

const UserDisplay = ({ users }: CardListsProps) => {
  return (
    <div className="pb-4 bg-white rounded-lg border border-gray-200 overflow-hidden w-full h-full flex flex-col">
      <Tabs defaultValue="card" className="flex flex-col h-full relative">
        <div className="sticky top-0 left-0 right-0 bg-white z-10 border-b py-3 px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar />
            </div>
            <TabsList>
              <TabsTrigger value="card">Card View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="card" className="p-4 h-full">
            <CardView users={users} />
          </TabsContent>
          <TabsContent value="table" className="p-4 h-full">
            <TableView users={users} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserDisplay;
