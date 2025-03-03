{mport { supabase } from '@/infrastructure/backend/SupabaseClient';
  "title": "ReviseIQ",} from '@/infrastructure/config/AppContainer';
  "welcome": "Apprenez de nouvelles compétences avec les flashcards <WaveImage>intelligentes.</WaveImage> ",
  "login": "Connexion",ent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
  "signup": "Test Inscription",tation/components/ui/input';
  "signout": "Déconnexion",de-react';
  "language": "Langue",ffect } from 'react';
  "english": "Anglais", } from 'react-i18next';
  "french": "Français",
  "loading": "Chargement...",Password() {
  "changeLanguage": "Changer de langue",;
  "breadcrumb": {tStep] = useState<'initial' | 'sent' | 'reset'>('initial');
    "item": "Élément",nslation();
    "flashcard": "Flashcard",
    "folder": "Flashcard"
  },supabase.auth.onAuthStateChange(async (event) => {
  "home": {vent === 'PASSWORD_RECOVERY') {
    "title": "Apprenez de nouvelles compétences avec les flashcards intelligentes. ",
    "description": "Créez des flashcards intelligentes grâce à l'IA pour vous aider à mémoriser et apprendre plus rapidement.",
    "cta": "S'inscrire gratuitement",
    "community": "Rejoignez la communauté"
  },
  "fromPdf": {InitiateReset = async (e: React.FormEvent) => {
    "title": "Générer des flashcards depuis un fichier PDF",
    "uploadDocument": "Uploadez votre document PDF et générez des flashcards automatiquement",
    "upload": "Uploadez un document",ce().resetPassword(email);
    "fileSelected": "Fichier sélectionné",
    "numberFlashcards": "Nombre de flashcards",
    "generate": "Générer les flashcards",initialisation:', error);
    "processing": "Traitement en cours...",
    "error": "Une erreur s'est produite lors de la génération des flashcards",
    "readingError": "Erreur lors de la lecture du PDF. Veuillez réessayer.",
    "fileToBig": "Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 1 Mo."
  },<div className="container mx-auto flex min-h-screen items-center justify-center p-4">
  "flashcard": {sName="w-full max-w-md">
    "question": "Question",me="space-y-6">
    "answer": "Réponse",="flex items-center justify-center gap-2 text-primary">
    "edit": "Modifier",sName="h-7 w-7" />
    "delete": "Supprimer","text-2xl font-semibold">{t('title')}</h2>
    "save": "Sauvegarder",
    "cancel": "Annuler",
    "nextCard": "Suivante",pace-y-2 text-center">
    "backFolders": "Retour aux dossiers",l font-bold">{t('auth.resetPassword')}</CardTitle>
    "previousCard": "Précédente", text-muted-foreground">{t('auth.resetPasswordDescription')}</p>
    "randomCard": "Aléatoire",
    "quizMode": "Mode Quiz",
    "restart": "Recommencer",
    "congratulations": "Félicitations !",
    "congratulationsMessage": "Vous avez terminé toutes les flashcards de ce dossier.",
    "startAgain": "Recommencer ?",InitiateReset} className="space-y-4">
    "noFlashcard": "Il semblerait que vous le propriétaire n'est pas encore créé de flashcards.",
    "noFlashcardTitle": "Aucune flashcard trouvée",
    "hint": "Astuce : Appuyez sur la touche A pour afficher la réponse",
    "iaGeneratedProgress": "La génération des flashcards est en cours...",
    "iaGeneratedProgressInfos": "La durée de ce processus dépend de la taille du sujet (environ 30 secondes).",
    "processing": "Génération en cours...",(e.target.value)}
    "generate": "Générer les flashcards",
    "nbFlashcard": "Nombre de flashcards",
    "generateDescription": "Générez des flashcards automatiquement en entrant un sujet et le nombre de flashcards souhaité.",
    "generateWithIa": "Générer avec l'IA",
    "easy": "Facile",assName="flex justify-center">
    "medium": "Moyen",n type="submit" size="lg" className="min-w-[200px]">
    "hard": "Difficile",th.resetButton')}
    "chooseDifficulty": "Choisissez la difficulté",
    "subject": "Sujet de vos flashcards",
    "createWithIa": "Avec l'IA",
    "createManual": "Manuellement",
    "uploadDocument": "Importer un cours PDF",n-50 p-4 text-center dark:bg-green-900/20">
    "optionChoose": "Comment souhaitez-vous créer vos flashcards ?",auth.emailSended')}</p>
    "selectOption": "Choisissez une option ci-dessous pour commencer à créer vos flashcards.",
    "likeThisDeck": "Vous avez aimé ce dossier ?",
    "addToFavorite": "Ajoutez le dossier à vos favoris"
  },  </Card>
  "quiz": {
    "next": "Question suivante",
    "end": "Terminer le quiz",
    "congrats": "Félicitations ! Vous avez tout bon !",    "score": "Votre score :",    "retry": "Recommencer",    "continue": "Continuez à vous entraîner !",    "finised": "Vous avez terminé le quiz !",    "noQuiz": "Aucun quiz trouvé pour ce dossier",    "error": "Une erreur s'est produite lors de la récupération du quiz",    "revise": "Réviser les flashcards"  },  "auth": {    "title": "ReviseIQ",    "baseline": "Envie de réussir d'apprendre efficacement ? ReviseIQ votre meilleur atout pour réussir !",    "or": "ou",    "signInWithGoogle": "Se connecter avec Google",    "signup": "S'insrire gratuitement",    "password": "Mot de passe",    "passwordConfirm": "Confirmer le mot de passe",    "newPassword": "Nouveau mot de passe",    "passwordplaceholder": "Entrez votre mot de passe",    "updatePasswordButton": "Mettre à jour le mot de passe",    "emailInvalid": "Email invalide",    "content": "Le mot de passe doit contenir :",    "email": "Email",    "emailplaceholder": "Entrez votre email",    "login": "Se connecter",    "minLength": "6 caractères minimum",    "minLowercase": "1 lettre minuscule",    "minUppercase": "1 lettre majuscule",    "minNumber": "1 chiffre",    "minSpecial": "1 caractère spécial",    "alreadySignup": "Vous avez déjà un compte ? Se connecter",    "passwordMatch": "Les mots de passe ne correspondent pas",    "passwordInvalid": "Le mot de passe ne respecte pas les critères de sécurité",    "dontHaveAccount": "Vous n'avez pas de compte ?",    "haveAccount": "Vous avez déjà un compte ?",    "errorSignup": "Erreur lors de l'inscription",    "acceptTerms": "J'accepte les",    "terms": "conditions générales d'utilisation",    "cta": "S'inscrire pour commencer à réviser",    "forgotPassword": "Mot de passe oublié ?",    "invalid": "Email ou mot de passe invalide, veuillez réessayer",    "resetPassword": "Réinitialiser le mot de passe",    "resetPasswordDescription": "Entrez votre adresse email pour réinitialiser votre mot de passe, si l'adresse email est valide, un email vous sera envoyé pour réinitialiser votre mot de passe.",    "resetButton": "Envoyer l'email de réinitialisation",    "emailSended": "Un email de réinitialisation de mot de passe a été envoyé, veuillez vérifier votre boîte de réception.",    "backToLogin": "Se connecter",    "processing": "Traitement en cours...",    "passwordSameAsOldError": "New password must be different from the old one."  },  "dashboard": {    "account": "Compte",    "title": "Tableau de bord",    "folders": "Dossiers",    "top-ranked": "Classement",    "priority-review": "Révision prioritaire",    "toggleTheme": "Changer de thème",    "dark": "Sombre",    "light": "Clair",    "system": "Système",    "congrats": "Félicitations 🎉",    "congratsMessage": "Vous avez débloqué un nouveau badge 🎉",    "empty": "Vous n'avez aucune notification pour le moment.",    "top": "Classement",    "topTitle": "Classement des meilleurs dossiers",    "navigation": "Tableau de bord",    "billing": "Facturation",    "home": "Accueil",    "community": "Communauté",    "deck": "Dossiers",    "search": "Recherche",    "settings": "Paramètres",    "profile": "Profil",    "calendar": "Calendrier",    "review": "Réviser",    "stats": "Statistiques",    "greetings": "Bonjour",    "greetings2": "Que voulez-vous apprendre aujourd'hui ?",    "lastPublicFolders": "Les derniers dossiers publics",    "folderDay": "Le dossier du jour ⭐",    "folderDayText": "Chaque jour nous mettons en avant un dossier public aléatoire pour vous inspirer et apprendre de nouvelles choses.",    "noPublicFolder": "Il semblerait qu'il n'y ait pas de dossier public pour le moment.",    "firstimeForm": {      "title": "Complétez votre profil",      "firstnameLabel": "Entrez votre prénom",      "firstname": "Prénom",      "nameLabel": "Entrez votre nom",      "name": "Nom",      "emailLabel": "Entrez votre email",      "email": "Email",      "phoneLabel": "Entrez votre numéro de téléphone",      "phone": "Numéro de téléphone",      "statut": "Vous êtes :",      "student": "Étudiant",      "pupil": "Élève",      "apprentice": "Apprenti",      "teacher": "Enseignant",      "other": "Autre",      "submit": "Soumettre",      "loading": "Chargement...",      "avatar": "Selectionnez votre avatar",      "clear": "Supprimer",      "description": "Avant de commencer à réviser, merci de compléter votre profil.",      "personalInfo": "Informations personnelles",      "contactInfo": "Informations de contact",      "phoneHelper": "Votre numéro de téléphone ne sera pas partagé avec les autres utilisateurs. (optionnel)",      "profile": "Quel est votre profil ?"    },    "folder": {      "yourfolder": "Vos dossiers",      "createfolder": "Créer un dossier",      "nofolder": "Il semblerait que vous n'avez pas encore créé de dossier.",      "publicfolder": "Public",      "privatefolder": "Privé",      "moreFolder": "Voir plus de dossiers publics",      "by": "par",      "themaLabel": "Thème",      "somethingWentWrong": "Quelque chose s'est mal passé lors de la récupération des dossiers",      "mostLikedFolders": "Les dossiers les plus aimés",      "form": {        "title": "Créer un dossier",        "name": "Nom du dossier",        "nameplaceholder": "Entrez le nom de votre dossier",        "description": "Description",        "descriptionplaceholder": "Entrez une description de votre dossier",        "thema": "Thème",        "color": "Couleur",        "visibility": "Visibilité",        "public": "Dossier public",        "private": "Privé",        "submit": "Créer",        "loading": "Chargement..."      },      "thema": {        "search": "Rechercher un thème",        "sciences_tech": "Sciences et technologies",        "sciences_humaines": "Sciences humaines et sociales",        "arts_culture": "Arts, culture et design",        "economy_law": "Économie, droit et politique",        "education": "Éducation et communication",        "environment": "Environnement et société",        "health": "Santé et sport",        "other": "Autre"      }    },    "communityTable": {      "name": "Nom",      "thema": "Thèmatique",      "creator": "Créateur",      "created": "Créé le",      "lang": "Langue",      "flashcards": "Flashcards",      "publicFolers": "dossiers publics",      "twenty": "20 par page",      "fifty": "50 par page",      "hundred": "100 par page",      "next": "Suivant",      "previous": "Précédent",      "to": "à",      "searchPlaceholder": "Rechercher un dossier...",      "sortBy": "Trier par",      "sortAsc": "Tri croissant",      "sortDesc": "Tri décroissant",      "resetFilters": "Réinitialiser les filtres",      "noFoldersFound": "Aucun dossier ne correspond à votre recherche",      "noPublicFolders": "Aucun dossier public disponible",      "foundFolders": "dossiers trouvés",      "outOf": "sur"    }  },  "notfound": {    "title": "Page non trouvée",    "message": "La page que vous recherchez n'existe pas.",    "back": "Retour à l'accueil"  }}
