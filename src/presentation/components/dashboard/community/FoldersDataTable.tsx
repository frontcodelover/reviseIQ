import { formatDate } from '@/lib/FormatDate';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ThemaLabelKeys } from '../folders/form/themaLabel';
import { type Folder } from './Folder.schema';
import { ScrollableTable } from './ScrollableTable';

type SortField = 'name' | 'created_at' | 'thema';
type SortOrder = 'asc' | 'desc';

interface FoldersDataTableProps {
  folders: Folder[];
  sortField?: SortField;
  sortOrder?: SortOrder;
  onSort?: (field: SortField) => void;
}

export function FoldersDataTable({ folders, sortField, sortOrder, onSort }: FoldersDataTableProps) {
  const { t } = useTranslation();

  const getThemaLabel = (thema: string | null): string => {
    if (!thema) return t('dashboard.folder.thema.other');

    const themaLabel = ThemaLabelKeys.find((label) => label.key === thema.toUpperCase());

    return themaLabel ? t(themaLabel.i18nKey) : t('dashboard.folder.thema.other');
  };

  const renderSortableHeader = (field: SortField, label: string) => {
    if (!onSort) {
      return <TableHead>{label}</TableHead>;
    }

    return (
      <TableHead>
        <button
          className="flex items-center gap-1 font-medium hover:text-primary focus:outline-none"
          onClick={() => onSort(field)}
        >
          {label}
          {sortField === field &&
            (sortOrder === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            ))}
        </button>
      </TableHead>
    );
  };

  // Utiliser le conteneur ScrollableTable au lieu d'un div directement
  return (
    <ScrollableTable>
      <Table>
        <TableHeader>
          <TableRow>
            {renderSortableHeader('name', t('dashboard.communityTable.name'))}
            {renderSortableHeader('thema', t('dashboard.communityTable.thema'))}
            <TableHead className="w-[10%]">{t('dashboard.communityTable.creator')}</TableHead>
            <TableHead className="w-[5%] text-right">
              {t('dashboard.communityTable.flashcards')}
            </TableHead>
            <TableHead className="w-[10%]">{t('dashboard.communityTable.lang')}</TableHead>
            {renderSortableHeader('created_at', t('dashboard.communityTable.created'))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell className="max-w-xs truncate font-medium">
                <Link to={`/dashboard/folders/${folder.id}`} className="hover:underline">
                  {folder.name}
                </Link>
              </TableCell>
              <TableCell>{getThemaLabel(folder.thema)}</TableCell>
              <TableCell>{folder.author?.firstname}</TableCell>
              <TableCell className="text-right">{folder.flashcardsCount}</TableCell>
              <TableCell>
                <div className="mx-auto h-5 w-5">{folder.lang}</div>
              </TableCell>
              <TableCell>{formatDate(folder.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollableTable>
  );
}
