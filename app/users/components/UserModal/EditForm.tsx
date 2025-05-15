'use client'

import React from 'react'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formSchema } from "@/app/lib/validation"
import { cn } from "@/lib/utils"
import { FormFieldRow } from './FormFieldRow'
import { GENDER_OPTIONS, OCCUPATION_OPTIONS } from './constants'

interface EditFormProps {
  onSave: () => void;
}

const EditForm = ({ onSave }: EditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "MALE",
      birthday: new Date(),
      occupation: "STUDENT",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      const { profileImage, birthday, ...data } = values

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      formData.append('birthday', birthday.toISOString())

      if (profileImage) {
        formData.append('profileImage', profileImage)
      }

      await axios.post('/api/users', formData)
      form.reset()
      onSave()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormFieldRow label="Name">
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormFieldRow label="Gender">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    {GENDER_OPTIONS.map(({ value, label }) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <FormLabel htmlFor={value}>{label}</FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormFieldRow label="Birthday">
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy/MM/dd"
                    maxDate={new Date()}
                    placeholderText="YYYY/MM/DD"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                    calendarClassName="rounded-xl border shadow-md p-4 bg-white text-sm"
                    isClearable={false}
                  />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormFieldRow label="Occupation">
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {OCCUPATION_OPTIONS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormFieldRow label="Phone">
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone number" {...field} />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormFieldRow label="Profile Image">
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      onChange(file)
                    }}
                    {...field}
                  />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}

export default EditForm 