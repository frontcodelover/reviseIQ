import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { styled } from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { useTranslation } from 'react-i18next';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';

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
  gap: 1rem;
  align-items: center;
`;

const ConatainerLang = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FlagIcon = styled.div`
  width: 20px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Avatar = styled.img`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 8px;
`;

const HeadingTwoLink = styled(HeadingTwo)`
  color: ${COLORS.black};
  transition: ease-in-out 0.2s;
  width: fit-content;
  &:hover {
    color: ${COLORS.primary};
  }
`;

const CardFolder = ({ ...props }: Folder) => {
  const { id, name, thema, lang, user_id, created_at } = props;
  const { profile, loading } = useProfileUserById(user_id || '');
  const { t } = useTranslation();

  return (
    <Card id={id}>
      <CardHeader>
        <CardContent>
          <HeadingTwoLink size="regular" color="black" weight="semibold">
            <Link to={`/dashboard/folders/${id}`}>{name}</Link>
          </HeadingTwoLink>
          <HeadingThree size="small" color="secondary" weight="regular">
            {thema}
          </HeadingThree>
        </CardContent>
      </CardHeader>

      {!loading && profile && (
        <ContainerFooter>
          <Avatar src={`/src/assets/${profile.avatar}.webp`} alt="avatar user" />
          <CardFooter>
            <Text color="black" weight="medium">
              {t('dashboard.folder.by')} {profile?.firstname}
            </Text>
            <Text size="small" color="secondary" weight="regular">
              {created_at ? formatDate(created_at) : ''}
            </Text>
            <ConatainerLang>
              <Text size="small" color="secondary" weight="regular">
                {t('language')}
              </Text>
              {lang === 'fr' ? (
                <FlagIcon>
                  <FR />
                </FlagIcon>
              ) : (
                <FlagIcon>
                  <US />
                </FlagIcon>
              )}
            </ConatainerLang>
          </CardFooter>
        </ContainerFooter>
      )}
    </Card>
  );
};

export default CardFolder;
