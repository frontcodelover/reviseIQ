import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';

const CardFolder = ({ ...props }: Deck) => {
  const { id, name, description, color, thema, user_id } = props;
  const { profile, loading } = useProfileUserById(user_id || '');

  return (
    <Card id={id} className="w-full border-t-4 shadow-sm" style={{ borderTopColor: color }}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>
              <div className="flex h-full items-start justify-between">
                <div className="flex flex-col justify-center">
                  <h2 className="max-w-72 truncate pb-1 text-sm font-bold text-gray-800 sm:max-w-48 xl:max-w-64">
                    <Link to={`/dashboard/folders/${id}`}>{name}</Link>
                  </h2>
                  <span className="text-sm font-normal text-gray-600">{thema}</span>
                </div>
              </div>
            </CardTitle>
            <Separator className="my-1" />
          </CardHeader>
          <CardDescription className="line-clamp-2 max-w-80 truncate text-pretty px-6 text-gray-500">
            {description ? description : 'Pas de description'}
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
              <span className="tracking-tight text-indigo-600">{profile?.firstname}</span>
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default CardFolder;
