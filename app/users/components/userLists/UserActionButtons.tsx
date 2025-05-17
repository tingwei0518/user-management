'use client'

import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import DeleteConfirmation from '@/app/users/components/userLists/DeleteConfirmation'
import UserFormModal from '@/app/users/components/userModal/UserFormModal'
import { User } from '@/app/types/user'

interface UserActionButtonsProps {
  userData: User;
}

export const UserActionButtons = ({ userData }: UserActionButtonsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { name: userName } = userData;

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  }

  const confirmDelete = () => { }

  const handleEdit = () => {
    setIsEditModalOpen(true);
  }

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleEdit}
        >
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
      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
      />
    </>
  )
}

export default UserActionButtons 