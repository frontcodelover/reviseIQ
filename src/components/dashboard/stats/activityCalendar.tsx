import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ActivityCalendarProps {
  data: Record<string, number>;
}

function ActivityCalendar({ data }: ActivityCalendarProps) {
  const [date] = useState<Date | null>(null);

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const dateKey = localDate.toISOString().split('T')[0];
      const activityCount = data[dateKey] || 0;

      return activityCount > 0 ? 'react-calendar__tile--hasActivity' : '';
    }
    return '';
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const dateKey = localDate.toISOString().split('T')[0];
      const activityCount = data[dateKey] || 0;

      if (activityCount > 0) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute inset-0 z-10 cursor-pointer">
                  <span className="z-10 flex h-full items-center justify-center">
                    {date.getDate()}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Vous avez étudié {activityCount} fois ce jour-là !</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    }
    return null;
  };

  return (
    <Calendar
      value={date}
      tileClassName={getTileClassName}
      tileContent={getTileContent}
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    />
  );
}

export default ActivityCalendar;
