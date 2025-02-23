//! need implement translation
import { Wand, User } from 'lucide-react';

export function Section() {
  return (
    <section className="mx-auto grid max-w-[1080px] grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Section d'introduction */}
      <div className="flex flex-col gap-8">
        <h1 className="text-balance text-4xl font-semibold text-foreground sm:text-5xl">
          Apprenez plus vite, retenez plus longtemps.
        </h1>
        <p className="text-pretty text-lg text-muted-foreground">
          Rejoignez des milliers d'apprenants et boostez vos connaissances avec des flashcards
          interactives créées par la communauté. 🚀
        </p>
      </div>

      {/* Section des bénéfices */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wand className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-balance text-xl font-semibold text-foreground">
            Créez des flashcards en un clic avec l'IA
          </h2>
          <p className="text-pretty text-muted-foreground">
            Générez instantanément des flashcards à partir de textes ou d'articles et
            concentrez-vous sur l'apprentissage, pas sur la création.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-balance text-xl font-semibold text-foreground">
            Apprenez seul ou avec la communauté
          </h2>
          <p className="text-pretty text-muted-foreground">
            Explorez des milliers de flashcards partagées par d'autres apprenants et échangez des
            connaissances avec la communauté.
          </p>
        </div>
      </div>
    </section>
  );
}
