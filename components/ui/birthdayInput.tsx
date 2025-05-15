'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils"
import InputMask from '@mona-health/react-input-mask';

export default function BirthdayInput() {
  const [birthday, setBirthday] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setBirthday(input);
  };

  return (
    <div className="flex flex-col col-span-3">
      <InputMask
        mask="9999/99/99"
        value={birthday}
        onChange={handleChange}
        placeholder="YYYY/MM/DD"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
      />
    </div>
  );
}
