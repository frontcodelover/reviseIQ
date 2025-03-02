import { Folder } from '@/domain/entities/Folder';
import { ThemaGroupProps } from '@/domain/entities/User';

export interface GroupedDecks {
  [key: string]: Folder[];
}

export interface ThemaGroupExtendedProps extends ThemaGroupProps {
  onDeckDeleted: () => void;
}

export interface NewFolderBtnProps {
  onFolderCreated: () => void;
}
