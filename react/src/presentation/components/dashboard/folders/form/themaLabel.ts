export const ThemaKeys = {
  OTHER: 'other',
  SCIENCES_TECHNOLOGIES: 'sciences_technologies',
  SCIENCES_HUMAINES: 'sciences_humaines',
  ARTS_CULTURE: 'arts_culture_design',
  ECONOMY_LAW: 'economy_law_politics',
  EDUCATION: 'education_communication',
  ENVIRONMENT: 'environment_society',
  HEALTH: 'health_sports',
} as const;

export type ThemaKey = keyof typeof ThemaKeys;

export const ThemaLabelKeys = [
  { key: 'OTHER', i18nKey: 'dashboard.folder.thema.other' },
  { key: 'SCIENCES_TECH', i18nKey: 'dashboard.folder.thema.sciences_tech' },
  { key: 'SCIENCES_HUMAINES', i18nKey: 'dashboard.folder.thema.sciences_humaines' },
  { key: 'ARTS_CULTURE', i18nKey: 'dashboard.folder.thema.arts_culture' },
  { key: 'ECONOMY_LAW', i18nKey: 'dashboard.folder.thema.economy_law' },
  { key: 'EDUCATION', i18nKey: 'dashboard.folder.thema.education' },
  { key: 'ENVIRONMENT', i18nKey: 'dashboard.folder.thema.environment' },
  { key: 'HEALTH', i18nKey: 'dashboard.folder.thema.health' },
] as const;
