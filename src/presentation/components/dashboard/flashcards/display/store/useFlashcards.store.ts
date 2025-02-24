import { create } from 'zustand'
import { type Flashcard } from '@/domain/entities/Flashcard'
import { appContainer } from '@/infrastructure/config/AppContainer'

interface FlashcardsState {
  // État
  userId: string | null
  flashcards: Flashcard[]
  currentIndex: number
  showAnswer: boolean
  loading: boolean
  error: string | null
  hasLoggedCompletion: boolean
  shuffledCards: Flashcard[]
  isShuffled: boolean
  isLastCard: boolean

  // Actions
  setCurrentIndex: (index: number) => void
  setShowAnswer: (show: boolean) => void
  handleShuffle: () => void
  handleRestart: () => void
  resetState: () => void  // Nouvelle action

  // Thunks
  fetchUserId: () => Promise<void>
  fetchFlashcards: (deckId: string) => Promise<void>
  logCompletion: (deckId: string) => Promise<void>
	
}

export const useFlashcardsStore = create<FlashcardsState>()((set, get) => ({
  // État initial
  userId: null,
  flashcards: [],
  currentIndex: 0,
  showAnswer: false,
  loading: true,
  error: null,
  hasLoggedCompletion: false,
  shuffledCards: [],
  isShuffled: false,
  isLastCard: false,

  // Actions
  setCurrentIndex: (index) => 
    set((state) => ({
      currentIndex: index,
      isLastCard: index >= state.flashcards.length - 1,
      showAnswer: false
    })),

  setShowAnswer: (show) => set({ showAnswer: show }),

  handleShuffle: () => 
    set((state) => {
      const shuffled = [...state.flashcards].sort(() => Math.random() - 0.5)
      return {
        shuffledCards: shuffled,
        isShuffled: true,
        currentIndex: 0,
        showAnswer: false
      }
    }),

  handleRestart: () => 
    set({
      currentIndex: 0,
      showAnswer: false,
      isShuffled: false
    }),

  resetState: () => set({
    flashcards: [],
    currentIndex: 0,
    showAnswer: false,
    loading: true,
    error: null,
    hasLoggedCompletion: false,
    shuffledCards: [],
    isShuffled: false,
    isLastCard: false
  }),

  // Thunks
  fetchUserId: async () => {
    try {
      const id = await appContainer.getUserService().getUserId()
      set({ userId: id })
    } catch (error) {
      console.error("Erreur lors de la récupération de l'userId:", error)
    }
  },

  fetchFlashcards: async (deckId: string) => {
    try {
      // Réinitialiser le state avant de charger les nouvelles flashcards
      set({ 
        flashcards: [],
        currentIndex: 0,
        showAnswer: false,
        loading: true,
        error: null,
        hasLoggedCompletion: false,
        shuffledCards: [],
        isShuffled: false,
        isLastCard: false
      })
      
      const cards = await appContainer.getFlashcardService().getFlashcardsList(deckId)
      set({ 
        flashcards: cards, 
        error: null,
        loading: false 
      })
    } catch (error) {
      set({ 
        error: 'Erreur lors du chargement des flashcards' + error,
        loading: false
      })
    }
  },

  logCompletion: async (deckId: string) => {
    const state = get()
    if (state.isLastCard && !state.hasLoggedCompletion && state.flashcards.length > 0) {
      try {
        await appContainer.getLogService().logAction(deckId, 'flashcard_completion')
        set({ hasLoggedCompletion: true })
      } catch (error) {
        console.error("Erreur lors du log de la complétion:", error)
      }
    }
  }
}))