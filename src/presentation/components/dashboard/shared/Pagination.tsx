import { Button } from '@/presentation/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({ page, limit, total, onPageChange, onLimitChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const { t } = useTranslation();

  return (
    <div className="m:flex-row flex flex-col items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-2">{t('dashboard.communityTable.previous')}</span>
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page + 1} {t('dashboard.communityTable.to')} {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
        >
          <span className="mr-2">{t('dashboard.communityTable.next')}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sélectionner une limite">
            {' '}
            {t('dashboard.communityTable.twenty')}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="20">{t('dashboard.communityTable.twenty')}</SelectItem>
          <SelectItem value="50">{t('dashboard.communityTable.fifty')}</SelectItem>
          <SelectItem value="100">{t('dashboard.communityTable.hundred')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
