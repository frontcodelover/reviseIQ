export interface Folder {
  id?: string;
  name: string;
  description: string;
  is_public: boolean;
  color: string;
  thema: string;
  user_id?: string | undefined;
  lang: string;
  created_at?: string;
  score?: number;
}

export interface FormData {
  name: string;
  description: string;
  isPublic: boolean;
  thema: string;
  color: string;
  lang: string;
}

export interface CardFolderProps {
  id: string;
  name: string;
  description: string;
  color: string;
  is_public: boolean;
  thema: string;
  lang: string;
  user_id: string;
}

export interface FolderWithScore extends Folder {
  score: number;
  votes?: { vote: number }[];
}
