import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

function CardNewFolder() {
  const { t } = useTranslation();
  return (
    <Card className="h-48 w-full border-2 border-dashed border-slate-400 bg-slate-50 hover:bg-slate-100">
      <div className="flex h-full items-center justify-center">
        <CardContent className="flex flex-col items-center justify-center p-0">
          <span className="font-bold text-slate-700">
            {t('dashboard.folder.createfolder')}
          </span>
          <Plus className="h-12 w-12 text-center text-slate-700" />
        </CardContent>
      </div>
    </Card>
  );
}

export default CardNewFolder;
