import styled from 'styled-components';
import { COLORS } from '@/presentation/components/ui/colors/ColorsVariant';
import { Folder } from '@/domain/entities/Folder';
import TableContent from './TableContent';

function CommunityTable({ folders }: { folders: Folder[] }) {
  return (
    <Table>
      <THead>
        <TableTR>
          <NameColumn>Nom du dossier</NameColumn>
          <ThemaColumn>Thème</ThemaColumn>
          <AuthorColumn>Créateur</AuthorColumn>
          <CardsColumn>Cartes</CardsColumn>
          <LangColumn>Langue</LangColumn>
          <DateColumn>Création</DateColumn>
        </TableTR>
      </THead>
      <tbody>
        {folders.map((folder) => (
          <TableContent key={folder.id} {...folder} />
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  tr:first-child {
    th {
      &:first-child {
        border-top-left-radius: 10px;
      }
      &:last-child {
        border-top-right-radius: 10px;
      }
    }
  }
  tr {
    &:not(:last-child) {
      border-bottom: 1px solid ${COLORS.lightgray};
    }
  }
`;

const TableTR = styled.tr`
  background-color: ${COLORS.lightgray};
`;

const THead = styled.thead``;

const TableTH = styled.th`
  padding: 20px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${COLORS.secondary};
  color: ${COLORS.black};
`;

const NameColumn = styled(TableTH)`
  width: 40%;
  text-align: left;
`;

const ThemaColumn = styled(TableTH)`
  width: 25%;
  text-align: left;
`;

const AuthorColumn = styled(TableTH)`
  width: 10%;
  text-align: left;
`;

const CardsColumn = styled(TableTH)`
  width: 10%;
  text-align: right;
`;

const LangColumn = styled(TableTH)`
  width: 10%;
  text-align: center;
`;

const DateColumn = styled(TableTH)`
  width: 10%;
  text-align: left;
`;

export default CommunityTable;
