import { useTranslation } from 'react-i18next';

import { Validation } from '@/domain/entities/User';
import { Typography } from '@mui/material';

export function PasswordTooltip({ validation }: { validation: Validation }) {
  const { t } = useTranslation();

  return (
    <>
      <Typography>{t('auth.content')}</Typography>

      <Typography
        sx={() => ({
          color: validation.minLength ? 'green' : 'red',
        })}
      >
        ✓ {t('auth.minLength')}
      </Typography>
      <Typography
        sx={() => ({
          color: validation.minLength ? 'green' : 'red',
        })}
      >
        ✓ {t('auth.minLowercase')}
      </Typography>
      <Typography
        sx={() => ({
          color: validation.minLength ? 'green' : 'red',
        })}
      >
        ✓ {t('auth.minUppercase')}
      </Typography>
      <Typography
        sx={() => ({
          color: validation.minLength ? 'green' : 'red',
        })}
      >
        ✓ {t('auth.minNumber')}
      </Typography>
      <Typography
        sx={() => ({
          color: validation.minLength ? 'green' : 'red',
        })}
      >
        ✓ {t('auth.minSpecial')}
      </Typography>
    </>
  );
}
