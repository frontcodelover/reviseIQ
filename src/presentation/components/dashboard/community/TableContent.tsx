import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/FormatDate';
import { US } from 'country-flag-icons/react/3x2';
import { FR } from 'country-flag-icons/react/3x2';
import styled from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { useProfileUserById } from '@/presentation/hooks/useProfileUserById';
import { appContainer } from '@/infrastructure/config/container';
import { useQuery } from 'react-query';

interface TableContentProps {
  id: string;
  name?: string;
  description?: string;
  user_id: string;
  lang: string;
  thema?: string;
  created_at?: string;
}

const TableContent: React.FC<TableContentProps> = ({
  id,
  name,
  user_id,
  lang,
  thema,
  created_at,
}) => {
  const { profile, isLoading } = useProfileUserById(user_id);

  const { data: result, isLoading: isLoadingFlashcards } = useQuery(
    ['flashcards', id],
    async () => {
      const flashcards = await appContainer.GetFlashcards().execute(id);
      return flashcards;
    }
  );

  if (!name || !user_id || !lang || !created_at) {
    return null;
  }

  const flashcardsLength = !isLoadingFlashcards && Array.isArray(result) ? result.length : 0;

  return (
    <TableTRRow key={id}>
      <TableTDName>
        <Link to={`/dashboard/folders/${id}`}>{name}</Link>
      </TableTDName>
      <TableTDThema>{thema ? thema : 'Aucune thématique'}</TableTDThema>
      <TableTDAuthor>{!isLoading && profile?.firstname}</TableTDAuthor>
      <TableTDCards>{flashcardsLength}</TableTDCards>
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
};

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
  font-weight: 600;
  white-space: nowrap;
  font-size: 0.75rem;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const TableTDThema = styled(TableTD)`
  width: 25%;
  text-align: left;
  font-weight: 400;
  font-size: 0.75rem;
`;

const TableTDAuthor = styled(TableTD)`
  width: 10%;
  text-align: left;
  font-weight: 400;
  font-size: 0.75rem;
`;

const TableTDCards = styled(TableTD)`
  width: 5%;
  text-align: right;
  font-weight: 400;
  font-size: 0.75rem;
`;

const TableTDLang = styled(TableTD)`
  width: 10%;
  font-size: 0.75rem;
`;

const TableTDDate = styled(TableTD)`
  width: 10%;
  text-align: left;
  font-weight: 400;
  font-size: 0.75rem;
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

export default TableContent;
