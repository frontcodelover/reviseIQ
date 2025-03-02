import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function RootPage() {
  // Redirection côté client
  redirect(`/${defaultLocale}`);
  
  // Ne sera jamais atteint à cause de la redirection
  return null;
}