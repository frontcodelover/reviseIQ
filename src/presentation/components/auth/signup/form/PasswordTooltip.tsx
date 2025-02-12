import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { Validation } from '@/domain/entities/User';
import { Typography } from '@mui/material';

export function PasswordTooltip({ validation }: { validation: Validation }) {
  const { t } = useTranslation();

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  return (
    <HtmlTooltip
      title={
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
      }
    >
      <Typography
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'ActiveCaption',
          borderRadius: '100%',
          padding: '0',
          margin: '0',
          width: '20px',
          height: '20px',
        }}
      >
        ?
      </Typography>
    </HtmlTooltip>
  );
}
