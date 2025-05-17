import React from 'react'
import { FormLabel, FormMessage } from "@/components/ui/form"

interface FormFieldRowProps {
  label: string
  children: React.ReactNode
}

export const FormFieldRow = ({ label, children }: FormFieldRowProps) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <FormLabel className="form-field-label">{label}</FormLabel>
    <div className="col-span-3">
      {children}
      <FormMessage />
    </div>
  </div>
) 