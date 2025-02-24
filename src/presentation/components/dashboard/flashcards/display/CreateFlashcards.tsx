import { Card } from '@/presentation/components/ui/card';
import { useNavigate } from 'react-router-dom';

export function CreateFlashcards({ deckId }) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">
          Comment souhaitez-vous créer vos flashcards ?
        </h1>
        <p className="text-lg text-muted-foreground">Choisissez une option ci-dessous</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-ai`)}
          className="group h-[320px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <span className="text-4xl">🤖</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              Générer des flashcards avec l'IA
            </h3>
          </div>
        </Card>

        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-manual`)}
          className="group h-[320px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <span className="text-4xl">✍</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              Créer des flashcards manuellement
            </h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
