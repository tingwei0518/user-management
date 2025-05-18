'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:min-w-[300px] group-[.toaster]:bg-zinc-950 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-xl group-[.toaster]:rounded-lg group-[.toaster]:py-4 group-[.toaster]:px-5',
          title: 'group-[.toast]:font-semibold group-[.toast]:text-base group-[.toast]:mb-1',
          description: 'group-[.toast]:text-zinc-200 group-[.toast]:text-sm',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toast]:border-l-4 group-[.toast]:border-l-green-500',
          error: 'group-[.toast]:border-l-4 group-[.toast]:border-l-red-500',
          warning: 'group-[.toast]:border-l-4 group-[.toast]:border-l-yellow-500',
          info: 'group-[.toast]:border-l-4 group-[.toast]:border-l-blue-500',
        },
      }}
      position="bottom-center"
      expand={true}
      closeButton={false}
      {...props}
    />
  );
};

export { Toaster };
