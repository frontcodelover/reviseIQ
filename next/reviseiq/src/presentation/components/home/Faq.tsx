import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/presentation/components/ui/accordion';
import { Badge } from '@/presentation/components/ui/badge';

export function Faq() {
  const faqItems = [
    {
      question: 'Comment fonctionne ReviseIQ ?',
      answer:
        'ReviseIQ utilise un système de flashcards intelligent pour optimiser votre apprentissage. Créez ou importez des cartes, révisez régulièrement et suivez votre progression.',
    },
    {
      question: "Qu'est-ce que la génération IA de flashcards ?",
      answer:
        "Notre IA analyse vos documents et génère automatiquement des flashcards pertinentes, vous permettant de vous concentrer sur l'apprentissage plutôt que sur la création.",
    },
    {
      question: 'Les flashcards sont-elles personnalisables ?',
      answer:
        'Oui ! Vous pouvez modifier les questions, réponses, ajouter des images, des tags et organiser vos cartes en dossiers thématiques.',
    },
    {
      question: "Comment fonctionne l'apprentissage collaboratif ?",
      answer:
        'Partagez vos flashcards avec la communauté, découvrez celles des autres apprenants et collaborez pour enrichir votre apprentissage.',
    },
    {
      question: 'Est-ce que ReviseIQ est gratuit ?',
      answer:
        'ReviseIQ propose une version gratuite complète. Des fonctionnalités premium sont disponibles pour les utilisateurs souhaitant aller plus loin.',
    },
  ];

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
                  Questions fréquentes
                </h4>
                <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
                  Découvrez comment ReviseIQ peut vous aider à apprendre plus efficacement et à
                  retenir plus longtemps vos connaissances.
                </p>
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b border-muted">
                <AccordionTrigger className="text-left text-lg hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
