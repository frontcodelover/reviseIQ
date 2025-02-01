import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { styled } from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { useTranslation } from 'react-i18next';

import { Folder } from '@/domain/entities/Folder';
import HeadingTwo from '../../ui/text/heading/HeadingTwo';
import HeadingThree from '../../ui/text/heading/HeadingThree';
import Text from '../../ui/text/Text';
import { formatDate } from '@/lib/FormatDate';

const Card = styled.div`
  border-radius: 8px;
  border: 1px solid ${COLORS.gray};
  background-color: ${COLORS.white};
  overflow: hidden;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 0.2rem;
`;

const CardHeader = styled.div``;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerFooter = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const CardFolder = ({ ...props }: Folder) => {
  const { id, name, thema, user_id, created_at } = props;
  const { profile, loading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card id={id}>
      <CardHeader>
        <CardContent>
          <HeadingTwo size="regular" color="black" weight="semibold">
            <Link to={`/dashboard/folders/${id}`}>{name}</Link>
          </HeadingTwo>
          <HeadingThree size="small" color="secondary" weight="regular">
            {thema}
          </HeadingThree>
        </CardContent>
      </CardHeader>

      {!loading && profile && (
        <ContainerFooter>
          <img
            src={`/src/assets/${profile.avatar}.webp`}
            alt="avatar"
            className="h-8 w-8 rounded-full"
          />
          <CardFooter>
            <Text>
              {t('dashboard.folder.by')} {profile?.firstname}
            </Text>
            <Text size="small" color="secondary" weight="regular">
              {created_at ? formatDate(created_at) : ''}
            </Text>
          </CardFooter>
        </ContainerFooter>
      )}
    </Card>
  );
};

export default CardFolder;
