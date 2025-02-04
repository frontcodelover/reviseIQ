// presentation/components/dashboard/shared/SearchBar.tsx
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from 'react-query';
import { SupabaseFolderRepository } from '@/infrastructure/backend/SupabaseFolderRespository';
import { SearchFoldersUseCase } from '@/application/useCases/folder/SearchFolders.usecase';
import { Folder } from '@/domain/entities/Folder';
import SearchInput from '@/presentation/components/ui/search/SearchInput';
import styled from 'styled-components';

const folderRepository = new SupabaseFolderRepository();
const searchFoldersUseCase = new SearchFoldersUseCase(folderRepository);

const SearchContainer = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 1.5rem;
  width: 1.5rem;
  color: #9ca3af;
`;

function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        setDebouncedQuery(query);
      } else {
        setDebouncedQuery('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const {
    data: folders,
    isLoading,
    error,
  } = useQuery<Folder[], Error>(
    ['searchFolders', debouncedQuery],
    () => searchFoldersUseCase.execute(debouncedQuery),
    { enabled: !!debouncedQuery }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <SearchContainer>
        <SearchIcon />
        <SearchInput type="text" placeholder="Rechercher" value={query} onChange={handleSearch} />
      </SearchContainer>

      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur : {error.message}</p>}
      {folders && (
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>{folder.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchBar;
