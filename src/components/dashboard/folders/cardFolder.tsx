import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, Users, Trash2, EditIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getBackend } from '@/services/backend';
import { useState } from 'react';

const CardFolder = ({ id, ...props }: CardFolderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { name, description, color, is_public } = props;
  const { t } = useTranslation();
  const backend = getBackend();

  const deleteFolder = async () => {
    try {
      await backend.deleteFolder(id);
      setIsVisible(false);
    } catch (error) {
      console.error('Error while deleting folder', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card
      id={id}
      className="w-full border-t-4 shadow-none"
      style={{ borderTopColor: color }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>
              <div className="flex h-full items-start justify-between">
                <div className="flex flex-col justify-center">
                  <h2 className="truncate pb-1 font-bold text-slate-900">
                    <Link to={`/dashboard/folders/${id}`}>{name}</Link>
                  </h2>
                  <span className="text-sm font-normal text-slate-600">
                    Informatique
                  </span>
                </div>
                <div className="flex h-full gap-1">
                  <span className="rounded border border-green-200 bg-green-100 p-2 text-green-400">
                    <Link to={`/dashboard/folders/${id}/edit`}>
                      <EditIcon className="h-4 w-4" />
                    </Link>
                  </span>
                  <span className="rounded border border-red-200 bg-red-100 p-2 text-red-400">
                    <button onClick={deleteFolder}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                </div>
              </div>
            </CardTitle>
            <Separator className="my-1" />
          </CardHeader>

          <CardDescription className="line-clamp-2 text-pretty px-6 text-base text-slate-600">
            {description}
          </CardDescription>
        </div>

        <CardFooter>
          <div className="mt-6 flex w-full items-center justify-end text-xs">
            {is_public ? (
              <div className="flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-green-700">
                <Users className="h-4" />
                <span>{t('dashboard.folder.publicfolder')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-lg bg-red-50 px-2 py-1 text-red-700">
                <Lock className="h-4" />
                <span>{t('dashboard.folder.privatefolder')}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardFolder;
