import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function CardNewFolder() {
  const { t } = useTranslation();

  return (
    <Card className="h-48 w-full border-2 border-dashed border-gray-400 bg-gray-50 shadow-none hover:bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-0">
          <Link
            to="/dashboard/folders/new"
            className="flex flex-col items-center justify-center"
          >
            <div className="font-bold text-gray-700">
              {t('dashboard.folder.createfolder')}
            </div>
            <Plus className="h-12 w-12 text-center text-gray-700" />
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}

export default CardNewFolder;
