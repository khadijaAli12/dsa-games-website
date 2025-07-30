import { create } from 'zustand';

const useGameStore = create((set, get) => ({
  // Game state
  currentGame: null,
  gameHistory: [],
  userProgress: {},
  
  // UI state
  isLoading: false,
  showTutorial: false,
  
  // Actions
  setCurrentGame: (gameId) => set({ currentGame: gameId }),
  
  addToHistory: (gameData) => set((state) => ({
    gameHistory: [...state.gameHistory, {
      ...gameData,
      timestamp: new Date().toISOString()
    }]
  })),
  
  updateProgress: (gameId, progress) => set((state) => ({
    userProgress: {
      ...state.userProgress,
      [gameId]: {
        ...state.userProgress[gameId],
        ...progress
      }
    }
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  toggleTutorial: () => set((state) => ({ showTutorial: !state.showTutorial })),
  
  // Computed values
  getGameProgress: (gameId) => {
    const state = get();
    return state.userProgress[gameId] || { completed: false, score: 0, attempts: 0 };
  },
  
  getTotalScore: () => {
    const state = get();
    return Object.values(state.userProgress).reduce((total, progress) => {
      return total + (progress.score || 0);
    }, 0);
  }
}));

export default useGameStore; 