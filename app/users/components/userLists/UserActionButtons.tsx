'use client'

import React, { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import DeleteConfirmation from '@/app/users/components/userLists/DeleteConfirmation'
import { User } from '@/app/users/components/userLists/UserDisplay'

interface UserActionButtonsProps {
  user: User
}

export const UserActionButtons = ({ user }: UserActionButtonsProps) => {
  const { id: userId, name: userName } = user
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {

  }

  const handleEdit = () => {

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
    </>
  )
}

export default UserActionButtons 