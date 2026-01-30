import { useState, useEffect } from 'react';

// Custom hook for game data fetching and management
export const useGameData = (initialGames = []) => {
  const [games, setGames] = useState(initialGames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addGame = (game) => {
    setGames(prev => [...prev, game]);
  };

  const updateGame = (gameId, updatedData) => {
    setGames(prev => 
      prev.map(game => 
        game.id === gameId ? { ...game, ...updatedData } : game
      )
    );
  };

  const removeGame = (gameId) => {
    setGames(prev => prev.filter(game => game.id !== gameId));
  };

  const getGameById = (gameId) => {
    return games.find(game => game.id === gameId);
  };

  const getGamesByCategory = (category) => {
    return games.filter(game => game.category === category);
  };

  // Simulate async data fetching
  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/games');
      // const data = await response.json();
      // setGames(data);
      
      // For now, we'll just use the initial games
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setGames(initialGames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialGames.length > 0 && games.length === 0) {
      fetchGames();
    }
  }, [initialGames]);

  return {
    games,
    loading,
    error,
    addGame,
    updateGame,
    removeGame,
    getGameById,
    getGamesByCategory,
    fetchGames,
    setGames
  };
};

// Custom hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    interactionTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    // Measure initial load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const memory = performance.memory;
      setMetrics(prev => ({ 
        ...prev, 
        memoryUsage: Math.round(memory.usedJSHeapSize / 1048576) // MB
      }));
    }

    // Monitor first interaction
    const handleFirstInteraction = () => {
      const interactionTime = performance.now();
      setMetrics(prev => ({ ...prev, interactionTime }));
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return metrics;
};