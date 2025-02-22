import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import { Button } from '@/presentation/components/ui/button';
import { Label } from '@/presentation/components/ui/label';
import { useAvatarUploadDebug } from '@/presentation/hooks/useAvatarUploadDebug';
import { Camera, Loader2, X } from 'lucide-react';
import { ChangeEvent, useCallback } from 'react';

interface AvatarUploadProps {
  onChange: (avatarUrl: string | null) => void;
  initialAvatarUrl?: string | null;
  user: { id: string };
}

export function AvatarUpload({ onChange, initialAvatarUrl, user }: AvatarUploadProps) {
  const { uploading, uploadAvatar, clearAvatar } = useAvatarUploadDebug({
    userId: user.id,
    onChange,
  });

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        uploadAvatar(files[0]);
      }
    },
    [uploadAvatar]
  );

  const handleClearAvatar = useCallback(() => {
    clearAvatar();
  }, [clearAvatar]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 rounded-full">
        <AvatarImage src={initialAvatarUrl ?? undefined} className="object-cover" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-2">
        <Label
          htmlFor="avatar-upload"
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground',
            uploading && 'opacity-50'
          )}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={uploading}
            className="sr-only"
          />
        </Label>

        {initialAvatarUrl && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearAvatar}
            disabled={uploading}
            className="flex h-10 w-10 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
