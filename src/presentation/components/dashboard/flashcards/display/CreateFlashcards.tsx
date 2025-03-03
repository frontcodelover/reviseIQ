import { Card } from '@/presentation/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function CreateFlashcards({ deckId }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">{t('flashcard.optionChoose')}</h1>
        <p className="text-lg text-muted-foreground">{t('flashcard.selectOption')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-ai`)}
          className="group h-[200px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full items-center justify-center gap-3">
            <span className="text-4xl">🤖</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              {t('flashcard.createWithIa')}
            </h3>
          </div>
        </Card>

        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/generate-manual`)}
          className="group h-[200px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full items-center justify-center gap-3">
            <span className="text-4xl">✍</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              {t('flashcard.createManual')}
            </h3>
          </div>
        </Card>

        <Card
          onClick={() => navigate(`/dashboard/folders/${deckId}/upload-document`)}
          className="group h-[200px] cursor-pointer p-6 transition-colors hover:bg-primary"
        >
          <div className="flex h-full items-center justify-center gap-3">
            <span className="text-4xl">📄</span>
            <h3 className="text-xl font-bold group-hover:text-primary-foreground">
              {t('flashcard.uploadDocument')}
            </h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
