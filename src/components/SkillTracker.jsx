import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillTracker = () => {
  const [skills, setSkills] = useState({
    sorting: { level: 1, xp: 0, completedChallenges: 0, mastery: 'Beginner' },
    searching: { level: 1, xp: 0, completedChallenges: 0, mastery: 'Beginner' },
    graphs: { level: 1, xp: 0, completedChallenges: 0, mastery: 'Beginner' },
    trees: { level: 1, xp: 0, completedChallenges: 0, mastery: 'Beginner' },
    dynamicProgramming: { level: 1, xp: 0, completedChallenges: 0, mastery: 'Beginner' }
  });

  const [achievements, setAchievements] = useState([]);
  const [showAchievements, setShowAchievements] = useState(false);

  // XP thresholds for level progression
  const xpThresholds = {
    1: 0,
    2: 100,
    3: 250,
    4: 500,
    5: 1000,
    6: 2000,
    7: 4000,
    8: 8000,
    9: 16000,
    10: 32000
  };

  // Achievement definitions
  const achievementList = [
    { id: 'first_sort', name: 'First Sort', description: 'Complete your first sorting challenge', xp: 50 },
    { id: 'sorting_master', name: 'Sorting Master', description: 'Master all sorting algorithms', xp: 500 },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a challenge in under 30 seconds', xp: 100 },
    { id: 'perfect_score', name: 'Perfect Score', description: 'Score 100% on a quiz', xp: 150 },
    { id: 'algorithm_expert', name: 'Algorithm Expert', description: 'Reach level 5 in any category', xp: 300 },
    { id: 'completionist', name: 'Completionist', description: 'Complete 10 different challenges', xp: 400 }
  ];

  // Function to update skills
  const updateSkill = (category, xpGained, challengeCompleted = false) => {
    setSkills(prev => {
      const currentSkill = prev[category];
      const newXp = currentSkill.xp + xpGained;
      const newLevel = calculateLevel(newXp);
      const newCompleted = challengeCompleted ? currentSkill.completedChallenges + 1 : currentSkill.completedChallenges;
      const newMastery = calculateMastery(newLevel);
      
      return {
        ...prev,
        [category]: {
          level: newLevel,
          xp: newXp,
          completedChallenges: newCompleted,
          mastery: newMastery
        }
      };
    });

    // Check for new achievements
    checkAchievements(xpGained, challengeCompleted);
  };

  const calculateLevel = (xp) => {
    for (let level = 10; level >= 1; level--) {
      if (xp >= xpThresholds[level]) {
        return level;
      }
    }
    return 1;
  };

  const calculateMastery = (level) => {
    if (level >= 8) return 'Expert';
    if (level >= 5) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    return 'Beginner';
  };

  const checkAchievements = (xpGained, challengeCompleted) => {
    const newAchievements = [];
    
    // Check for "First Sort" achievement
    if (challengeCompleted && !achievements.some(a => a.id === 'first_sort')) {
      newAchievements.push(achievementList.find(a => a.id === 'first_sort'));
    }
    
    // Check for "Perfect Score" achievement
    if (xpGained >= 150 && !achievements.some(a => a.id === 'perfect_score')) {
      newAchievements.push(achievementList.find(a => a.id === 'perfect_score'));
    }
    
    // Check for "Speed Demon" achievement
    if (xpGained >= 100 && !achievements.some(a => a.id === 'speed_demon')) {
      newAchievements.push(achievementList.find(a => a.id === 'speed_demon'));
    }
    
    // Add new achievements
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  const getMasteryColor = (mastery) => {
    switch (mastery) {
      case 'Beginner': return '#6b7280';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#3b82f6';
      case 'Expert': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getLevelProgress = (xp) => {
    const currentLevel = calculateLevel(xp);
    const currentThreshold = xpThresholds[currentLevel];
    const nextThreshold = xpThresholds[currentLevel + 1] || xpThresholds[10];
    const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    
    return {
      currentLevel,
      progress: Math.min(progress, 100),
      xpToNext: nextThreshold - xp
    };
  };

  return (
    <div className="skill-tracker">
      <div className="tracker-header">
        <h3>Skill Progress Tracker</h3>
        <button 
          className="achievements-toggle"
          onClick={() => setShowAchievements(!showAchievements)}
        >
          🏆 Achievements ({achievements.length})
        </button>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, skill]) => {
          const levelProgress = getLevelProgress(skill.xp);
          const masteryColor = getMasteryColor(skill.mastery);
          
          return (
            <motion.div 
              key={category}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="skill-header">
                <h4>{category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                <span 
                  className="mastery-badge"
                  style={{ backgroundColor: masteryColor }}
                >
                  {skill.mastery}
                </span>
              </div>
              
              <div className="level-display">
                <div className="level-number">Level {skill.level}</div>
                <div className="xp-display">
                  {skill.xp} XP
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${levelProgress.progress}%`,
                      backgroundColor: masteryColor
                    }}
                  />
                </div>
                <div className="progress-text">
                  {levelProgress.xpToNext > 0 
                    ? `${Math.round(levelProgress.progress)}% to Level ${levelProgress.currentLevel + 1}`
                    : 'MAX LEVEL!'
                  }
                </div>
              </div>
              
              <div className="skill-stats">
                <div className="stat-item">
                  <span className="stat-label">Challenges:</span>
                  <span className="stat-value">{skill.completedChallenges}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">XP:</span>
                  <span className="stat-value">{skill.xp}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {showAchievements && (
        <motion.div 
          className="achievements-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h4> unlocked achievements</h4>
          {achievements.length === 0 ? (
            <div className="no-achievements">
              <p>Complete challenges and quizzes to earn achievements!</p>
            </div>
          ) : (
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h5>{achievement.name}</h5>
                    <p>{achievement.description}</p>
                    <div className="achievement-xp">+{achievement.xp} XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SkillTracker;