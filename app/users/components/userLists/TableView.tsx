import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardListsProps } from '@/app/users/components/userLists/UserDisplay';

export const TableView = ({ users }: CardListsProps) => {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="text-left px-2 pt-2 pb-4">Name</th>
            <th className="text-left px-2 pt-2 pb-4">Gender</th>
            <th className="text-left px-2 pt-2 pb-4">Birthday</th>
            <th className="text-left px-2 pt-2 pb-4">Occupation</th>
            <th className="text-left px-2 pt-2 pb-4">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, phone, gender, occupation, birthday }) => (
            <tr key={id} className="hover:bg-muted border-b">
              <td className="px-2 py-4">{name}</td>
              <td className="px-2 py-4 capitalize">{gender}</td>
              <td className="px-2 py-4">{birthday.toLocaleDateString()}</td>
              <td className="px-2 py-4 capitalize">{occupation}</td>
              <td className="px-2 py-4">{phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default TableView;
