'use client';

import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary';
import { XIcon, ImageIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProfileImageUpload = ({ value, onChange }: ProfileImageUploadProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <Avatar className="w-24 h-24">
          <AvatarImage src={value} alt="Profile" className="object-cover" />
          <AvatarFallback className="bg-muted">
            <ImageIcon className="h-12 w-12 text-muted-foreground/25" />
          </AvatarFallback>
        </Avatar>
        {value && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-1 -right-1 h-6 w-6 shadow-sm"
            onClick={() => onChange('')}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <CldUploadWidget
          uploadPreset="e9voxzlj"
          options={{
            showPoweredBy: false,
            sources: ['local'],
            multiple: false,
            maxFiles: 1,
            showAdvancedOptions: false,
            singleUploadAutoClose: false,
          }}
          onSuccess={(result) => {
            if (typeof result.info === 'object' && 'secure_url' in result.info) {
              onChange(result.info.secure_url);
            }
          }}
        >
          {({ widget }) => (
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => widget?.open()}
            >
              <ImageIcon className="h-4 w-4" />
              {value ? 'Change Image' : 'Upload Image'}
            </Button>
          )}
        </CldUploadWidget>
        <p className="text-xs text-muted-foreground">Recommended: Square image, max 1MB</p>
      </div>
    </div>
  );
};
