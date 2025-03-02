import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Récupérer le hash de l'URL
  const url = new URL(request.url);
  const hash = url.hash;
  
  // Rediriger avec la locale préférée (fr par défaut)
  return redirect(`/fr/update-password${hash}`);
}