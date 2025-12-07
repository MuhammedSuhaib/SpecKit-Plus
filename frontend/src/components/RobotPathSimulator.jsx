import React, { useState, useEffect } from 'react';

const RobotPathSimulator = () => {
  const [robotPosition, setRobotPosition] = useState({ x: 1, y: 1 });
  const [targetPosition, setTargetPosition] = useState({ x: 8, y: 8 });
  const [obstacles, setObstacles] = useState([
    { x: 3, y: 3 }, { x: 4, y: 6 }, { x: 7, y: 4 }
  ]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);

  // Simple grid size
  const gridSize = 10;

  // Simple pathfinding visualization (not a real algorithm, just for demo)
  useEffect(() => {
    if (isRunning) {
      const newPath = [];
      let current = { ...robotPosition };

      // Simple path towards target (for visualization)
      const interval = setInterval(() => {
        if (current.x < targetPosition.x) current.x++;
        else if (current.x > targetPosition.x) current.x--;

        if (current.y < targetPosition.y) current.y++;
        else if (current.y > targetPosition.y) current.y--;

        newPath.push({ ...current });
        setPath([...newPath]);
        setRobotPosition({ ...current });

        // Stop when reached target
        if (current.x === targetPosition.x && current.y === targetPosition.y) {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isRunning, robotPosition, targetPosition, speed]);

  const resetSimulation = () => {
    setRobotPosition({ x: 1, y: 1 });
    setPath([]);
    setIsRunning(false);
  };

  const startSimulation = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const updateTarget = (x, y) => {
    if (x !== robotPosition.x || y !== robotPosition.y) {
      // Check if it's an obstacle
      const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
      if (!isObstacle) {
        setTargetPosition({ x, y });
      }
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isRobot = robotPosition.x === x && robotPosition.y === y;
        const isTarget = targetPosition.x === x && targetPosition.y === y;
        const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
        const isPath = path.some(p => p.x === x && p.y === y);
        const isVisited = path.some(p => p.x === x && p.y === y);

        let cellClass = 'grid-cell';
        let cellContent = '';

        if (isRobot) {
          cellClass += ' robot';
          cellContent = '🤖';
        } else if (isTarget) {
          cellClass += ' target';
          cellContent = '🎯';
        } else if (isObstacle) {
          cellClass += ' obstacle';
          cellContent = '⬛';
        } else if (isPath) {
          cellClass += ' path';
          cellContent = '👣';
        } else {
          cellClass += ' empty';
        }

        grid.push(
          <div
            key={`${x}-${y}`}
            className={cellClass}
            onClick={() => updateTarget(x, y)}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isTarget ? 'default' : 'pointer',
              backgroundColor:
                isRobot ? '#4CAF50' :
                isTarget ? '#FF9800' :
                isObstacle ? '#f44336' :
                isPath ? '#E8F5E8' :
                '#fff',
              color: isRobot || isTarget ? 'white' : 'black',
              fontWeight: 'bold'
            }}
          >
            {cellContent}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🤖 Robot Path Planning Simulator</h3>
      <p>Click on the grid to set a new target location for the robot</p>

      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <button
          onClick={startSimulation}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunning ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Running...' : 'Start Pathfinding'}
        </button>

        <button
          onClick={resetSimulation}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>

        <div>
          <label style={{ marginRight: '10px' }}>
            Speed:
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ marginLeft: '5px', padding: '5px' }}
            >
              <option value={1000}>Slow</option>
              <option value={500}>Medium</option>
              <option value={200}>Fast</option>
            </select>
          </label>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '1px',
        backgroundColor: '#ccc',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {renderGrid()}
      </div>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px'
      }}>
        <p><strong>Current Position:</strong> ({robotPosition.x}, {robotPosition.y})</p>
        <p><strong>Target Position:</strong> ({targetPosition.x}, {targetPosition.y})</p>
        <p><strong>Path Length:</strong> {path.length} steps</p>
      </div>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontStyle: 'italic'
      }}>
        <strong>Note:</strong> This is a simulation interface. In a real implementation, this would use actual pathfinding algorithms like A* or Dijkstra's algorithm.
      </div>
    </div>
  );
};

export default RobotPathSimulator;