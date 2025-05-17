'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import EditForm from '@/app/users/components/userModal/EditForm'
import { User } from '@/app/types/user'

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: User;
}

const UserFormModal = ({ isOpen, onClose, userData }: UserFormModalProps) => {
  const isEditMode = !!userData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(event) => { event.preventDefault() }}>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit User' : 'Create User'}</DialogTitle>
        </DialogHeader>
        <EditForm
          userData={userData}
          onSave={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default UserFormModal 