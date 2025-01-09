import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, EditIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBackend } from '@/services/backend';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';

const CardFolder = ({ id, ...props }: CardFolderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { name, description, color, thema } = props;
  const { profile, loading } = useProfile();

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
      className="w-full border-t-4 shadow-sm"
      style={{ borderTopColor: color }}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>
              <div className="flex h-full items-start justify-between">
                <div className="flex flex-col justify-center">
                  <h2 className="max-w-72 truncate pb-1 text-lg font-bold text-slate-800 sm:max-w-48 xl:max-w-64">
                    <Link to={`/dashboard/folders/${id}`}>{name}</Link>
                  </h2>
                  <span className="text-sm font-normal text-slate-600">
                    {thema}
                  </span>
                </div>
                <div className="flex h-full gap-1">
                  <span className="rounded border border-green-200 bg-green-100 p-2 text-green-600">
                    <Link to={`/dashboard/folders/${id}/edit`}>
                      <EditIcon className="h-4 w-4" />
                    </Link>
                  </span>
                  <span className="rounded border border-red-200 bg-red-100 p-2 text-red-600">
                    <button onClick={deleteFolder}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                </div>
              </div>
            </CardTitle>
            <Separator className="my-1" />
          </CardHeader>
          <CardDescription className="line-clamp-2 max-w-80 truncate text-pretty px-6 text-slate-500">
            {description}
          </CardDescription>
        </div>

        <CardFooter>
          {!loading && profile && (
            <div className="text- mt-6 flex w-full items-center gap-2 text-sm font-semibold">
              <img
                src={`/src/assets/${profile.avatar}.webp`}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="tracking-tight text-indigo-600">
                {profile?.firstname}
              </span>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardFolder;
