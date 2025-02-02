import styled from 'styled-components';
import Button from '@/presentation/components/ui/button/Button';

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
const PageButton = styled(Button)`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Pagination = ({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <PaginationContainer>
      {/* Corriger PageButtonPageButton en PageButton */}
      <PageButton
        variant="primary"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
      >
        Précédent
      </PageButton>

      <span>
        Page {page + 1} sur {totalPages}
      </span>

      <PageButton
        variant="primary"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
      >
        Suivant
      </PageButton>

      <Select value={limit} onChange={(e) => onLimitChange(Number(e.target.value))}>
        <option value={20}>20 par page</option>
        <option value={50}>50 par page</option>
        <option value={100}>100 par page</option>
      </Select>
    </PaginationContainer>
  );
};
