'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import DeleteConfirmation from '@/app/users/components/userLists/DeleteConfirmation';
import FormModal from '@/app/users/components/userModal/FormModal';
import { User } from '@/app/types/user';
interface UserActionButtonsProps {
  userData: User;
}

export const UserActionButtons = ({ userData }: UserActionButtonsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { refresh } = useRouter();
  const { name: userName, id: userId } = userData;

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${userId}`);
      toast.success('Deleted user successfully');
      setIsDeleteModalOpen(false);
      refresh();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userName={userName}
      />
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
      />
    </>
  );
};

export default UserActionButtons;
