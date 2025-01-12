import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function CardNewFolder() {
  const { t } = useTranslation();

  return (
    <Link
      to="/dashboard/folders/new"
      className="group flex w-fit items-center gap-2 py-6"
    >
      <div className="rounded-full group-hover:bg-red-600">
        <Plus className="h-4 w-4 text-red-600 group-hover:text-white" />
      </div>
      <span className="text-gray-600 group-hover:text-red-700">
        {t('dashboard.folder.createfolder')}
      </span>
    </Link>
  );
}

export default CardNewFolder;
