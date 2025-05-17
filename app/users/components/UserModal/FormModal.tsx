'use client'

import React from 'react'
import { XIcon } from "lucide-react"
import EditForm from '@/app/users/components/userModal/EditForm'
import { User } from '@/app/types/user'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: User;
}

const FormModal = ({ isOpen, onClose, userData }: FormModalProps) => {
  const isEditMode = !!userData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto user-modal-container">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <Card
        className="relative w-full max-w-[425px] shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <CardHeader className="pb-0">
          <CardTitle>{isEditMode ? 'Edit User' : 'Create User'}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <EditForm
            userData={userData}
            onClose={onClose}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormModal 