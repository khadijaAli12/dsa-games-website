import React, { useState, useEffect } from 'react';

const ProjectMetrics = () => {
  const [metrics, setMetrics] = useState({
    visitors: 0,
    gamesPlayed: 0,
    avgSessionTime: 0,
    userSatisfaction: 0
  });

  // Simulate real metrics (in a real app, this would come from analytics)
  useEffect(() => {
    const simulateMetrics = () => {
      setMetrics({
        visitors: Math.floor(Math.random() * 10000) + 5000,
        gamesPlayed: Math.floor(Math.random() * 50000) + 20000,
        avgSessionTime: (Math.random() * 15 + 5).toFixed(1),
        userSatisfaction: (Math.random() * 20 + 80).toFixed(1)
      });
    };

    simulateMetrics();
    const interval = setInterval(simulateMetrics, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    {
      title: 'Total Visitors',
      value: metrics.visitors.toLocaleString(),
      icon: '👥',
      color: 'var(--primary-color)'
    },
    {
      title: 'Games Played',
      value: metrics.gamesPlayed.toLocaleString(),
      icon: '🎮',
      color: 'var(--success-color)'
    },
    {
      title: 'Avg Session (min)',
      value: metrics.avgSessionTime,
      icon: '⏱️',
      color: 'var(--warning-color)'
    },
    {
      title: 'Satisfaction Rate',
      value: `${metrics.userSatisfaction}%`,
      icon: '😊',
      color: 'var(--accent-color)'
    }
  ];

  return (
    <div className="project-metrics">
      <h3>Project Impact Metrics</h3>
      <div className="metrics-container">
        {metricCards.map((metric, index) => (
          <div 
            key={index} 
            className="metric-card"
            style={{ '--metric-color': metric.color }}
          >
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-content">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMetrics;