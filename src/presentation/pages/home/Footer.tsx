import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useTranslation();

  const navigationItems = [
    {
      title: 'Navigation',
      items: [
        {
          title: t('home.menu.home'),
          href: '/',
        },
        {
          title: t('home.menu.dashboard'),
          href: '/dashboard',
        },
        {
          title: t('home.menu.community'),
          href: '/dashboard/community',
        },
      ],
    },
    {
      title: 'Produit',
      items: [
        {
          title: t('home.menu.flashcards'),
          href: '/dashboard/folders',
        },
        {
          title: t('home.menu.aiGenerator'),
          href: '/dashboard/create',
        },
        {
          title: t('home.menu.stats'),
          href: '/dashboard/stats',
        },
      ],
    },
    {
      title: 'Entreprise',
      items: [
        {
          title: t('home.menu.about'),
          href: '/about',
        },
        {
          title: t('home.menu.contact'),
          href: '/contact',
        },
        {
          title: t('home.menu.blog'),
          href: '/blog',
        },
      ],
    },
  ];

  return (
    <footer className="w-full bg-primary py-20 text-primary-foreground lg:py-24">
      <div className="container mx-auto">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Brain className="h-8 w-8" />
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">ReviseIQ</h2>
              </div>
              <p className="max-w-lg text-lg leading-relaxed tracking-tight text-primary-foreground/75">
                Apprenez plus vite, retenez plus longtemps avec nos flashcards intelligentes.
              </p>
            </div>

            <div className="flex flex-row gap-20">
              <div className="flex flex-col text-sm leading-relaxed text-primary-foreground/75">
                <Link to="/terms" className="hover:text-primary-foreground">
                  Conditions d'utilisation
                </Link>
                <Link to="/privacy" className="hover:text-primary-foreground">
                  Politique de confidentialité
                </Link>
                <Link to="/rgpd" className="hover:text-primary-foreground">
                  RGPD
                </Link>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-10 md:grid-cols-3">
            {navigationItems.map((section) => (
              <div key={section.title} className="flex flex-col items-start gap-4 text-base">
                <h3 className="text-xl font-medium">{section.title}</h3>
                <div className="flex flex-col gap-2">
                  {section.items?.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/75">
            © {new Date().getFullYear()} ReviseIQ. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
