'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FormModal from '@/app/users/components/UserModal/FormModal';

const CreateUserModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Button variant="default" onClick={() => setIsEditModalOpen(true)}>
        Create User
      </Button>
      <FormModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
};

export default CreateUserModal;
