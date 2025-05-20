'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formSchema } from '@/app/lib/validation';
import { FormFieldRow } from '@/app/users/components/UserModal/FormFieldRow';
import { ProfileImageUpload } from '@/app/users/components/UserModal/ProfileImageUpload';
import { Gender, Occupation, GENDER_LABELS, OCCUPATION_LABELS } from '@/app/types/enums';
import { User } from '@/app/types/user';

interface EditFormProps {
  onClose: () => void;
  userData?: User;
}

const EditForm = ({ onClose, userData }: EditFormProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  const isEditMode = !!userData;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: Gender.MALE,
      birthday: new Date(),
      occupation: Occupation.STUDENT,
      phone: '',
      profileImage: '',
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (userData) {
      const { name, gender, birthday, occupation, phone, profileImage } = userData;
      form.reset({
        name,
        gender: gender as Gender,
        birthday: new Date(birthday),
        occupation: occupation as Occupation,
        phone,
        profileImage: profileImage || '',
      });
    }
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isEditMode) {
        await axios.patch(`/api/users/${userData?.id}`, values);
        refresh();
      } else {
        await axios.post('/api/users', values);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`);
      }
      toast.success('User saved successfully');
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Failed to save user');
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
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormFieldRow label="Gender">
                <FormControl>
                  <RadioGroup
                    onValueChange={onChange}
                    defaultValue={value}
                    value={value}
                    className="flex space-x-4"
                  >
                    {Object.values(Gender).map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <FormLabel htmlFor={value}>{GENDER_LABELS[value]}</FormLabel>
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
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormFieldRow label="Birthday">
                <FormControl>
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="yyyy/MM/dd"
                    maxDate={new Date()}
                    placeholderText="YYYY/MM/DD"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className={cn(
                      'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
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
          render={({ field: { onChange, value } }) => {
            const occupationValue = value || Occupation.STUDENT;
            return (
              <FormItem>
                <FormFieldRow label="Occupation">
                  <FormControl>
                    <Select
                      onValueChange={(newValue) => {
                        if (Object.values(Occupation).includes(newValue as Occupation)) {
                          onChange(newValue);
                        }
                      }}
                      value={occupationValue}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Occupation).map((value) => (
                          <SelectItem key={value} value={value}>
                            {OCCUPATION_LABELS[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormFieldRow>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormFieldRow label="Phone">
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    onChange={onChange}
                    value={value}
                  />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormFieldRow label="Profile Image">
                <FormControl>
                  <ProfileImageUpload value={value || ''} onChange={onChange} />
                </FormControl>
              </FormFieldRow>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Save' : 'Create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
