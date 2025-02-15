import { useTheme } from '@mui/joy';
import { Theme } from '@mui/joy/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CalendarMUI = () => {
  const theme: Theme = useTheme();
  const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          '.MuiCalendar-root': {
            backgroundColor: theme.palette.primary.main,
            color: textColor,
          },
          '.Mui-selected': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          '.MuiPickersDay-root': {
            color: textColor,
          },
          '.MuiPickersDay-today': {
            color: textColor,
          },
          '.MuiPickersDay-weekend': {
            color: theme.palette.text.secondary,
          },
          '.MuiIconButton-root': {
            color: textColor,
          },
          '.MuiPickersArrowSwitcher-button': {
            color: textColor,
          },
          '.css-1191e5t-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
            color: textColor,
          },
        })}
      />
    </LocalizationProvider>
  );
};

export default CalendarMUI;
