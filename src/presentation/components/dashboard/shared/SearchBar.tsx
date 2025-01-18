// presentation/components/dashboard/shared/SearchBar.tsx
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from 'react-query';
import { SupabaseFolderRepository } from '@/infrasctructure/backend/SupabaseFolderRespository';
import { SearchFoldersUseCase } from '@/application/useCases/SearchFolders.usecase';
import { Folder } from '@/domain/entities/Folder';

const folderRepository = new SupabaseFolderRepository();
const searchFoldersUseCase = new SearchFoldersUseCase(folderRepository);

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

  const { data: folders, isLoading, error } = useQuery<Folder[], Error>(
    ['searchFolders', debouncedQuery],
    () => searchFoldersUseCase.execute(debouncedQuery),
    { enabled: !!debouncedQuery }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
    <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" style={{ height: '1.5rem', width: '1.5rem' }} />
    <Input
      type='text'
      placeholder="Rechercher"
      className="pl-12 border mb-6"
      value={query}
      onChange={handleSearch}
      style={{ paddingLeft: '3rem' }} // Ajoutez ce style en ligne
      />
  </div>
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