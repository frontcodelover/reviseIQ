import React, { useState, useCallback } from 'react';
import { UpsertUserUseCase } from '@/application/useCases/auth/UpsertUser.usecase';
import { SupabaseUserRepository } from '@/infrastructure/backend/SupabaseUserRepository';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  CircularProgress,
  Container,
  Paper,
  Grid2,
} from '@mui/material';
import { PhoneInput } from '@/presentation/components/firstTime/phoneInput';
import { AvatarUpload } from '@/presentation/components/firstTime/avatarSelection';
import { Typography } from '@mui/joy';
import { z } from 'zod';
import { FirstTimeFormData, FirstTimeFormSchema } from '@/domain/validation/FirstTimeFormSchema';
import { FirstTimeFormProps } from '@/domain/entities/User';

const FirstTimeForm: React.FC<FirstTimeFormProps> = ({ user, onSubmit }) => {
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [status, setStatus] = useState(user.status || 'student');
  const [avatar, setAvatar] = useState<string | null>(user.avatar || null); // Stocker l'URL de l'avatar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const userRepository = new SupabaseUserRepository();
  const upsertProfile = new UpsertUserUseCase(userRepository);

  const handleAvatarChange = useCallback((newAvatarUrl: string | null) => {
    setAvatar(newAvatarUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData: FirstTimeFormData = {
        firstname,
        lastname,
        phone,
        status,
        avatar,
      };

      FirstTimeFormSchema.parse(formData);

      await upsertProfile.execute({
        user_id: user.id,
        firstname,
        lastname,
        email: user.email,
        phone,
        status,
        avatar:
          avatar ||
          'https://zqiuulnsqmqcpdbjhgre.supabase.co/storage/v1/object/public/profile/public/avatarbase.png',
        created_at: user.created_at,
      });

      onSubmit(true);
    } catch (error: unknown) {
      console.error('❌ Erreur:', error);
      if (error instanceof z.ZodError) {
        setError(`Erreur de validation: ${error.errors.map((e) => e.message).join(', ')}`);
      } else {
        setError('Erreur lors de la mise à jour du profil');
      }
      onSubmit(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography level="h2" color="secondary">
            {t('dashboard.firstimeForm.title')}
          </Typography>
          {error && (
            <Typography color="warning" sx={{ fontWeight: 'bold' }}>
              {error}
            </Typography>
          )}

          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <AvatarUpload
                key={avatar}
                onChange={handleAvatarChange}
                initialAvatarUrl={avatar}
                user={{ id: user.id || '' }}
              />
            </Grid2>
            <Grid2 size={8} container direction="column" spacing={2}>
              <Grid2>
                <TextField
                  fullWidth
                  label={t('dashboard.firstimeForm.firstname')}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  placeholder={t('dashboard.firstimeForm.firstnameLabel')}
                />
              </Grid2>
              <Grid2>
                <TextField
                  fullWidth
                  label={t('dashboard.firstimeForm.name')}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  placeholder={t('dashboard.firstimeForm.nameLabel')}
                />
              </Grid2>
            </Grid2>

            <Grid2 size={12}>
              <Typography color="secondary">{t('dashboard.firstimeForm.phone')}</Typography>
              <PhoneInput phoneNumber={phone} onPhoneChange={setPhone} />
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">
                  {t('dashboard.firstimeForm.statut')}
                </InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={status}
                  label={t('dashboard.firstimeForm.statut')}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as 'student' | 'pupil' | 'apprentice' | 'teacher' | 'other'
                    )
                  }
                >
                  <MenuItem value="student">{t('dashboard.firstimeForm.student')}</MenuItem>
                  <MenuItem value="pupil">{t('dashboard.firstimeForm.pupil')}</MenuItem>
                  <MenuItem value="apprentice">{t('dashboard.firstimeForm.apprentice')}</MenuItem>
                  <MenuItem value="teacher">{t('dashboard.firstimeForm.teacher')}</MenuItem>
                  <MenuItem value="other">{t('dashboard.firstimeForm.other')}</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('dashboard.firstimeForm.submit')
                )}
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Container>
  );
};

export default FirstTimeForm;
