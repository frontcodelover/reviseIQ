'use client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
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

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();
  const t = useTranslations();

  return useMemo(() => {
    // Supprimer la locale du chemin si présente
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const pathSegments = pathWithoutLocale.split('/').filter((segment) => segment.length > 0);

    const breadcrumbItems: BreadcrumbItem[] = [];

    // Ajouter le dashboard comme premier élément
    breadcrumbItems.push({
      label: t('dashboard.title'),
      path: '/dashboard',
      isActive: pathSegments.length === 1 && pathSegments[0] === 'dashboard',
    });

    let currentPath = '/dashboard';

    for (let i = 1; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      // Vérifier si le segment est un UUID
      if (segment.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        // Gestion des IDs (dossiers, flashcards, etc.)
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
        // Gestion des segments normaux
        const translationKey = routeTranslationMap[segment] || `breadcrumb.${segment}`;
        const translation = t(translationKey);
        const label = translation !== translationKey ? translation : t(`dashboard.${segment}`, { fallback: segment });

        breadcrumbItems.push({
          label,
          path: currentPath,
          isActive: i === pathSegments.length - 1,
        });
      }
    }

    return breadcrumbItems;
  }, [pathname, t]);
}
