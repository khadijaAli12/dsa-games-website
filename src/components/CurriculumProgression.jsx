import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CurriculumProgression = ({ onSkillUnlock, onLevelComplete }) => {
  const [unlockedSkills, setUnlockedSkills] = useState(['sorting']);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);

  const curriculum = {
    1: {
      title: "Foundations",
      skills: ['sorting', 'searching'],
      prerequisites: [],
      description: "Master basic algorithms and data structures",
      xpRequired: 0
    },
    2: {
      title: "Intermediate Concepts",
      skills: ['trees', 'graphs'],
      prerequisites: ['sorting', 'searching'],
      description: "Learn tree and graph algorithms",
      xpRequired: 200
    },
    3: {
      title: "Advanced Techniques",
      skills: ['dynamicProgramming', 'backtracking'],
      prerequisites: ['trees', 'graphs'],
      description: "Master optimization and recursive algorithms",
      xpRequired: 500
    },
    4: {
      title: "Expert Level",
      skills: ['complexityAnalysis', 'algorithmDesign'],
      prerequisites: ['dynamicProgramming', 'backtracking'],
      description: "Analyze and design efficient algorithms",
      xpRequired: 1000
    }
  };

  const checkLevelUnlock = (level) => {
    const levelData = curriculum[level];
    if (!levelData) return false;
    
    // Check if all prerequisites are met
    const hasPrerequisites = levelData.prerequisites.every(skill => 
      unlockedSkills.includes(skill)
    );
    
    // Check if XP requirement is met
    const totalXP = unlockedSkills.reduce((sum, skill) => {
      // This would come from actual skill tracking
      return sum + 100; // placeholder XP
    }, 0);
    
    return hasPrerequisites && totalXP >= levelData.xpRequired;
  };

  const unlockLevel = (level) => {
    const levelData = curriculum[level];
    if (!levelData || completedLevels.includes(level)) return;
    
    // Unlock new skills
    const newSkills = levelData.skills.filter(skill => 
      !unlockedSkills.includes(skill)
    );
    
    setUnlockedSkills(prev => [...prev, ...newSkills]);
    setCompletedLevels(prev => [...prev, level]);
    setCurrentLevel(level + 1);
    
    // Notify parent components
    newSkills.forEach(skill => {
      if (onSkillUnlock) onSkillUnlock(skill);
    });
    
    if (onLevelComplete) onLevelComplete(level);
  };

  const getLevelStatus = (level) => {
    if (completedLevels.includes(level)) return 'completed';
    if (level === currentLevel && checkLevelUnlock(level)) return 'available';
    if (level < currentLevel) return 'unlocked';
    return 'locked';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'available': return '#3b82f6';
      case 'unlocked': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'available': return '🔓';
      case 'unlocked': return '🔒';
      default: return '🔒';
    }
  };

  return (
    <div className="curriculum-progression">
      <div className="curriculum-header">
        <h3>Learning Path</h3>
        <div className="progress-summary">
          <span>Level {currentLevel} of {Object.keys(curriculum).length}</span>
          <span>{unlockedSkills.length} skills unlocked</span>
        </div>
      </div>

      <div className="curriculum-timeline">
        {Object.entries(curriculum).map(([levelNum, levelData]) => {
          const level = parseInt(levelNum);
          const status = getLevelStatus(level);
          const isAvailable = status === 'available';
          const statusColor = getStatusColor(status);
          
          return (
            <motion.div
              key={level}
              className={`level-card ${status}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: level * 0.1 }}
            >
              <div className="level-header">
                <div className="level-icon" style={{ color: statusColor }}>
                  {getStatusIcon(status)}
                </div>
                <div className="level-info">
                  <h4>Level {level}: {levelData.title}</h4>
                  <p className="level-description">{levelData.description}</p>
                </div>
                {status === 'available' && (
                  <button 
                    className="unlock-button"
                    onClick={() => unlockLevel(level)}
                  >
                    Start Level
                  </button>
                )}
              </div>

              <div className="level-content">
                <div className="skills-section">
                  <h5>Skills to Master:</h5>
                  <div className="skills-list">
                    {levelData.skills.map(skill => (
                      <span 
                        key={skill}
                        className={`skill-tag ${
                          unlockedSkills.includes(skill) ? 'unlocked' : 'locked'
                        }`}
                      >
                        {skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prerequisites-section">
                  <h5>Prerequisites:</h5>
                  <div className="prerequisites-list">
                    {levelData.prerequisites.length > 0 ? (
                      levelData.prerequisites.map(prereq => (
                        <span 
                          key={prereq}
                          className={`prereq-tag ${
                            unlockedSkills.includes(prereq) ? 'completed' : 'pending'
                          }`}
                        >
                          {prereq.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      ))
                    ) : (
                      <span className="no-prereqs">None required</span>
                    )}
                  </div>
                </div>

                <div className="requirements-section">
                  <div className="xp-requirement">
                    <span>XP Required: </span>
                    <span className={status === 'available' ? 'met' : 'pending'}>
                      {levelData.xpRequired} XP
                    </span>
                  </div>
                </div>
              </div>

              {status === 'completed' && (
                <div className="completion-badge">
                  <span>✓ Completed</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="curriculum-footer">
        <div className="unlocked-skills">
          <h4>Currently Unlocked Skills:</h4>
          <div className="skills-tags">
            {unlockedSkills.map(skill => (
              <span key={skill} className="unlocked-skill-tag">
                {skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumProgression;