import { Badge } from '@/presentation/components/ui/badge';
import { Button } from '@/presentation/components/ui/button';
import { ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Cta() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="mx-auto">
        <div className="flex flex-col items-center gap-8 bg-muted/50 p-8 text-center lg:p-14">
          <div>
            <Badge variant="outline" className="gap-2">
              <Brain className="h-4 w-4" />
              ReviseIQ
            </Badge>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-regular max-w-xl text-3xl tracking-tighter md:text-5xl">
              Prêt à améliorer votre apprentissage ?
            </h3>
            <p className="mx-auto max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground">
              Rejoignez des milliers d'étudiants qui ont déjà transformé leur façon d'apprendre.
              Créez vos flashcards en quelques clics et commencez à réviser intelligemment.
            </p>
          </div>

          <div className="flex flex-row gap-4">
            <Button variant="outline" size="lg" className="group gap-2">
              Découvrir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link to="/signup">
              <Button size="lg" className="group gap-2">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Pas besoin de carte bancaire • Annulez à tout moment
          </p>
        </div>
      </div>
    </div>
  );
}
