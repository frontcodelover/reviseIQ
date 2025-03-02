import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useMatches } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
}

interface MatchData {
  name?: string;
  title?: string;
  label?: string;
  folder?: { name?: string };
  flashcard?: { question?: string };
  question?: string;
  [key: string]: unknown;
}

const routeTranslationMap: Record<string, string> = {
  dashboard: 'dashboard.title',
  folders: 'dashboard.folders',
  flashcards: 'dashboard.flashcards',
  community: 'dashboard.community',
  profile: 'dashboard.profile',
  settings: 'dashboard.settings',
  stats: 'dashboard.stats',
};

function extractItemName(data: MatchData | unknown): string | undefined {
  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const typedData = data as MatchData;

  if (typedData.name) {
    return typedData.name;
  }

  if (typedData.folder?.name) {
    return typedData.folder.name;
  }

  if (typedData.title) {
    return typedData.title;
  }

  if (typedData.label) {
    return typedData.label;
  }

  if (typedData.flashcard?.question) {
    return typedData.flashcard.question.length > 20
      ? `${typedData.flashcard.question.substring(0, 20)}...`
      : typedData.flashcard.question;
  }

  if (typedData.question) {
    return typedData.question.length > 20
      ? `${typedData.question.substring(0, 20)}...`
      : typedData.question;
  }

  return undefined;
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const location = useLocation();
  const { t } = useTranslation();
  const matches = useMatches();

  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter((segment) => segment.length > 0);

    const breadcrumbItems: BreadcrumbItem[] = [];

    breadcrumbItems.push({
      label: t('dashboard.title'),
      path: '/dashboard',
      isActive: pathSegments.length === 1 && pathSegments[0] === 'dashboard',
    });

    let currentPath = '/dashboard';

    for (let i = 1; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      if (
        segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      ) {
        const match = matches.find((m) => m.pathname === currentPath);

        if (match?.data) {
          const itemName = extractItemName(match.data);

          if (itemName) {
            breadcrumbItems.push({
              label: itemName,
              path: currentPath,
              isActive: i === pathSegments.length - 1,
            });
            continue;
          }
        }

        const previousSegment = pathSegments[i - 1]?.toLowerCase();
        let fallbackLabel = t('breadcrumb.item');

        if (previousSegment === 'flashcards') {
          fallbackLabel = t('breadcrumb.flashcard');
        } else if (previousSegment === 'folders') {
          fallbackLabel = t('breadcrumb.folder');
        }

        breadcrumbItems.push({
          label: fallbackLabel,
          path: currentPath,
          isActive: i === pathSegments.length - 1,
        });
      } else {
        const translationKey = routeTranslationMap[segment] || `breadcrumb.${segment}`;

        const translation = t(translationKey);

        const label =
          translation !== translationKey ? translation : t(`dashboard.${segment}`, segment); // Fallback au segment lui-même

        breadcrumbItems.push({
          label,
          path: currentPath,
          isActive: i === pathSegments.length - 1,
        });
      }
    }

    return breadcrumbItems;
  }, [location.pathname, t, matches]);
}
