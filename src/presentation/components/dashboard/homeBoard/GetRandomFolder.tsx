import styled from 'styled-components';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { useQuery } from 'react-query';
import { GetRandomFolderUseCase } from '@/application/useCases/folder/GetRandomFolder.usecase';
import { Folder } from '@/domain/entities/Folder';
import Text from '../../ui/text/Text';
import HeadingTwo from '../../ui/text/heading/HeadingTwo';
import { COLORS } from '../../ui/colors/ColorsVariant';
import CardFolder from '../folders/CardFolder';

export default function GetRandomFolder() {
  const folderRepository = new SupabaseFolderRepository();
  const getRandomFolderUseCase = new GetRandomFolderUseCase(folderRepository);

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[]>('randomPublicFolder', () => getRandomFolderUseCase.execute());

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {(error as Error).message}</div>;
  if (!folders) return <div>Aucun dossier public trouvé</div>;

  return (
    <Container>
      <ContainerTitle>
        <Title>La dossier du jour ⭐</Title>
        <Text $color="lightBlueTwo" $weight="regular">
          Chaque jour nous mettons en avant un dossier public aléatoire pour vous inspirer et
          apprendre de nouvelles choses.
        </Text>
      </ContainerTitle>
      {folders.map((folder) => (
        <Card>
          <CardFolder {...folder} />
        </Card>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray};
  padding: 1.5rem;
  background-color: ${COLORS.primary};
  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
  }
`;

const Card = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  flex: 1;
  background-color: ${COLORS.white};
`;

const Title = styled(HeadingTwo)`
  color: ${COLORS.white};
  font-size: 2rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  flex: 1;
  padding: 1.5rem;
`;
