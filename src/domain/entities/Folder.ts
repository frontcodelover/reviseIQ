export interface Folder {
  id?: string;
  name: string;
  description: string;
  is_public: boolean;
  color: string;
  thema: string;
  user_id?: string | undefined;
}

export interface FormData {
  name: string;
  description: string;
  isPublic: boolean;
  thema: string;
  color: string;
}

export interface CardFolderProps {
  id: string;
  name: string;
  description: string;
  color: string;
  is_public: boolean;
  thema: string;
}
