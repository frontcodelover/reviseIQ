import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lock, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CardFolderProps {
  id: string;
  name: string;
  description: string;
  color: string;
  is_public: boolean;
}

const CardFolder = ({ id, ...props }: CardFolderProps) => {
  const { name, description, color, is_public } = props;
	const { t } = useTranslation();

  console.log('CardFolder', props);
  return (
    <Card id={id} className="w-full border-t-4" style={{ borderTopColor: color }}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>
              <div>
                <h2 className="truncate pb-1 font-bold text-slate-900">
                  {name}
                </h2>
                <span className="text-sm font-normal text-slate-600">
                  Informatique
                </span>
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
