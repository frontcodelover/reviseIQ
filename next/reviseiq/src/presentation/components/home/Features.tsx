import { Badge } from '@/presentation/components/ui/badge';
import { Wand, User, Check } from 'lucide-react';

export function Features() {
  const items = [
    {
      icon: <Wand className="mt-2 h-4 w-4 text-primary" />,
      title: "Générez des flashcards avec l'IA",
      description:
        "Créez instantanément des cartes à partir de n'importe quel texte grâce à l'intelligence artificielle.",
    },
    {
      icon: <User className="mt-2 h-4 w-4 text-primary" />,
      title: 'Apprenez en communauté',
      description: 'Partagez vos connaissances et apprenez des autres membres de la communauté.',
    },
    {
      icon: <Check className="mt-2 h-4 w-4 text-primary" />,
      title: 'Interface intuitive',
      description: "Une expérience d'apprentissage fluide et agréable, conçue pour vous.",
    },
    {
      icon: <Check className="mt-2 h-4 w-4 text-primary" />,
      title: 'Progression personnalisée',
      description: 'Suivez votre évolution et adaptez votre apprentissage à votre rythme.',
    },
    {
      icon: <Check className="mt-2 h-4 w-4 text-primary" />,
      title: 'Révision optimisée',
      description: 'Un système intelligent qui vous aide à réviser au bon moment.',
    },
    {
      icon: <Check className="mt-2 h-4 w-4 text-primary" />,
      title: 'Multiplateforme',
      description: 'Accédez à vos flashcards partout, sur tous vos appareils.',
    },
  ];

  return (
    <div className="w-full py-20 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-start gap-4 py-20 lg:py-40">
          <div>
            <Badge variant="outline">ReviseIQ</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
              Apprenez plus vite, retenez plus longtemps.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-xl">
              Rejoignez des milliers d'apprenants et boostez vos connaissances avec des flashcards
              interactives créées par la communauté. 🚀
            </p>
          </div>
          <div className="flex w-full flex-col gap-10 pt-12">
            <div className="grid grid-cols-2 items-start gap-10 lg:grid-cols-3">
              {items.map((feature, index) => (
                <div key={index} className="flex flex-row items-start gap-6">
                  {feature.icon}
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
