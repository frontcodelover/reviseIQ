import { formatDate } from '@/lib/FormatDate';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';
import styled from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { Link } from 'react-router-dom';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { SupabaseFlashCardRepository } from '@/infrastructure/backend/SupabaseFlashcardRepository';
import { GetFlashcardsUseCase } from '@/application/useCases/flashcard/GetFlashcards.usecase';
import { useQuery } from 'react-query';

const TableTRRow = styled.tr`
  border-bottom: 1px solid ${COLORS.lightgray};

  &:last-child {
    border-bottom: none;
  }
`;

const TableTD = styled.td`
  padding: 16px 12px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${COLORS.gray};
`;

const TableTDName = styled(TableTD)`
  width: 40%;
  font-weight: 800;
  white-space: nowrap;
  font-size: 1rem;
  color: ${COLORS.black};
`;

const TableTDThema = styled(TableTD)`
  width: 25%;
  text-align: left;
  font-weight: 400;
`;

const TableTDAuthor = styled(TableTD)`
  width: 10%;
  text-align: left;
  font-weight: 400;
`;

const TableTDCards = styled(TableTD)`
  width: 5%;
  text-align: right;
  font-weight: 400;
`;

const TableTDLang = styled(TableTD)`
  width: 10%;
`;

const TableTDDate = styled(TableTD)`
  width: 10%;
  text-align: left;
  font-weight: 400;
`;

const FlagIcon = styled.div`
  width: 20px;
  height: 20px;
  margin: auto;
  svg {
    width: 100%;
    height: 100%;
  }
`;
function TableContent({ ...props }) {
  const { id, name, user_id, lang, thema, created_at } = props;
  const { profile, isLoading } = useProfileUserById(user_id);
  const flashcardRepository = new SupabaseFlashCardRepository();
  const getFlashcardsUseCase = new GetFlashcardsUseCase(flashcardRepository);

  const { data: result, isLoading: isLoadingFlashcards } = useQuery(
    ['flashcards', id],
    async () => {
      const result = await getFlashcardsUseCase.execute(id);
      return result;
    }
  );

  if (!name || !user_id || !lang || !created_at) {
    return null;
  }

  return (
    <TableTRRow key={id}>
      <TableTDName>
        <Link to={`/dashboard/folders/${id}`}>{name}</Link>
      </TableTDName>

      <TableTDThema>{thema ? thema : 'Aucune thématique'}</TableTDThema>
      <TableTDAuthor>{!isLoading && profile?.firstname}</TableTDAuthor>
      <TableTDCards>{!isLoadingFlashcards && result?.length}</TableTDCards>
      <TableTDLang>
        {lang === 'fr' ? (
          <FlagIcon>
            <FR />
          </FlagIcon>
        ) : (
          <FlagIcon>
            <US />
          </FlagIcon>
        )}
      </TableTDLang>
      <TableTDDate>{created_at ? formatDate(created_at) : 'N/A'}</TableTDDate>
    </TableTRRow>
  );
}

export default TableContent;
