import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardListsProps } from '@/app/users/components/userLists/UserDisplay';
import UserActionButtons from '@/app/users/components/userLists/UserActionButtons';
import { OCCUPATION_LABELS, GENDER_LABELS } from '@/app/types/enums';

export const TableView = ({ users }: CardListsProps) => {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-2 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left px-4 py-3 text-gray-700 font-medium">Name</th>
            <th className="text-left px-4 py-3 text-gray-700 font-medium">Gender</th>
            <th className="text-left px-4 py-3 text-gray-700 font-medium">Birthday</th>
            <th className="text-left px-4 py-3 text-gray-700 font-medium">Occupation</th>
            <th className="text-left px-4 py-3 text-gray-700 font-medium">Phone</th>
            <th className="text-right px-4 py-3 text-gray-700 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id, name, phone, gender, occupation, birthday } = user;
            return (
              <tr key={id} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-4 font-medium">{name}</td>
                <td className="px-4 py-4 capitalize">
                  {GENDER_LABELS[gender as keyof typeof GENDER_LABELS]}
                </td>
                <td className="px-4 py-4">{birthday.toLocaleDateString()}</td>
                <td className="px-4 py-4 capitalize">
                  {OCCUPATION_LABELS[occupation as keyof typeof OCCUPATION_LABELS]}
                </td>
                <td className="px-4 py-4">{phone}</td>
                <td className="px-4 py-4 text-right">
                  <UserActionButtons userData={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default TableView;
