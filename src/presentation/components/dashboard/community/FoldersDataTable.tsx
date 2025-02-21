import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from '@/lib/FormatDate'
import { type Folder } from '@/presentation/components/dashboard/community/Folder.schema'
import { useTranslation } from "react-i18next"

interface FoldersDataTableProps {
  folders: Folder[]
}

export function FoldersDataTable({ folders }: FoldersDataTableProps) {
	const { t } = useTranslation()

  return (
    <div className="rounded-md border w-full">
      <Table>
        <TableHeader>
          <TableRow>
						<TableHead className="w-[40%]">{t('dashboard.communityTable.name')}</TableHead>
            <TableHead className="w-[25%]">{t('dashboard.communityTable.thema')}</TableHead>
            <TableHead className="w-[10%]">{t('dashboard.communityTable.creator')}</TableHead>
            <TableHead className="w-[5%] text-right">{t('dashboard.communityTable.flashcards')}</TableHead>
            <TableHead className="w-[10%]">{t('dashboard.communityTable.lang')}</TableHead>
            <TableHead className="w-[10%]">{t('dashboard.communityTable.created')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell className="font-medium">
                <Link to={`/dashboard/folders/${folder.id}`} className="hover:underline">
                  {folder.name}
                </Link>
              </TableCell>
              <TableCell>{folder.thema || 'Aucune thématique'}</TableCell>
              <TableCell>{folder.author?.firstname}</TableCell>
              <TableCell className="text-right">{folder.flashcardsCount}</TableCell>
              <TableCell>
                <div className="w-5 h-5 mx-auto">
									{folder.lang}
                </div>
              </TableCell>
              <TableCell>{formatDate(folder.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}