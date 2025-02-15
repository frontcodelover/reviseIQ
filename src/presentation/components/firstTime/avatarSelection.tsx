import { useAvatarUploadDebug } from '@/presentation/hooks/useAvatarUploadDebug';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  RadioGroup,
  RadioGroupProps,
  IconButton,
  Avatar,
  Box,
  styled,
  CircularProgress,
  Button,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface AvatarSelectProps extends Omit<RadioGroupProps, 'children'> {
  onChange: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

interface AvatarUploadProps {
  onChange: (avatarUrl: string | null) => void;
  initialAvatarUrl?: string | null;
  user: { id: string }; // Ensure user prop is correctly typed
}

export const AvatarSelect: React.FC<AvatarSelectProps> = ({ value, onChange }) => {
  const avatars = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <RadioGroup
      row
      aria-label="avatars"
      name="row-radio-buttons-group"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, e.target.value)}
    >
      {avatars.map((num) => (
        <StyledFormControlLabel
          key={num}
          value={`avatar-${num}`}
          control={<Radio />}
          label={
            <img
              src={`/src/assets/avatar-${num}.webp`}
              alt={`Avatar ${num}`}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
          }
        />
      ))}
    </RadioGroup>
  );
};

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ onChange, initialAvatarUrl, user }) => {
  const { t } = useTranslation();
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {initialAvatarUrl ? (
        <Avatar
          key={initialAvatarUrl}
          src={initialAvatarUrl}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
          onError={(e) => {
            console.error("Erreur de chargement de l'image:", initialAvatarUrl);
            e.currentTarget.onerror = null; // prevents looping
            // Optionally display a fallback image or message
          }}
        />
      ) : (
        <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }}>U</Avatar>
      )}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          disabled={uploading}
        >
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleAvatarChange} />
          {uploading ? <CircularProgress size={24} /> : <PhotoCamera />}
        </IconButton>
        {initialAvatarUrl && (
          <Button
            onClick={handleClearAvatar}
            disabled={uploading}
            sx={{ color: 'error.main', textTransform: 'none' }}
          >
            {t('dashboard.firstimeForm.clear')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '.MuiSvgIcon-root': {
    width: 50,
    height: 50,
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
