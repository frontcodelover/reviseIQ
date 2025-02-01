export const formatDate = (date: string) => {
  const locale = localStorage.getItem('i18nextLng');
  if (locale === 'en') {
    return new Intl.DateTimeFormat('en-EN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  }
  // Default to 'fr-FR' if locale is not 'en'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};
