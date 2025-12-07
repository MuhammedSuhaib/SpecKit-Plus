import React, { useState } from 'react';

const Robot3DViewer = () => {
  const [robotType, setRobotType] = useState('humanoid');
  const [viewAngle, setViewAngle] = useState('front');

  const robotTypes = {
    humanoid: { name: 'Humanoid Robot', joints: 24, description: 'Bipedal robot with human-like structure' },
    wheeled: { name: 'Wheeled Robot', joints: 8, description: 'Mobile robot with wheel-based locomotion' },
    quad: { name: 'Quadruped Robot', joints: 16, description: 'Four-legged robot for rough terrain' }
  };

  const currentRobot = robotTypes[robotType];

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>🤖 Robot 3D Viewer</h3>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div>
          <label><strong>Robot Type:</strong></label>
          <select
            value={robotType}
            onChange={(e) => setRobotType(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="humanoid">Humanoid</option>
            <option value="wheeled">Wheeled</option>
            <option value="quad">Quadruped</option>
          </select>
        </div>

        <div>
          <label><strong>View Angle:</strong></label>
          <select
            value={viewAngle}
            onChange={(e) => setViewAngle(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="front">Front</option>
            <option value="side">Side</option>
            <option value="top">Top</option>
            <option value="3d">3D View</option>
          </select>
        </div>
      </div>

      <div style={{
        backgroundColor: '#000',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        marginBottom: '15px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          color: '#00FF41',
          fontFamily: 'monospace',
          fontSize: '24px',
          textShadow: '0 0 10px #00FF41'
        }}>
          {currentRobot.name} Visualization
        </div>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          color: '#00FF41',
          fontSize: '12px'
        }}>
          {viewAngle.toUpperCase()} VIEW
        </div>
      </div>

      <div style={{
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px'
      }}>
        <h4>{currentRobot.name}</h4>
        <p><strong>Joints:</strong> {currentRobot.joints}</p>
        <p><strong>Description:</strong> {currentRobot.description}</p>
        <p><strong>Locomotion:</strong> {robotType === 'humanoid' ? 'Bipedal' : robotType === 'wheeled' ? 'Wheeled' : 'Quadrupedal'}</p>
      </div>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#d1ecf1',
        borderRadius: '4px',
        fontStyle: 'italic'
      }}>
        <strong>Note:</strong> This is a simulation interface. In a real implementation, this would connect to a 3D rendering library like Three.js to display actual robot models.
      </div>
    </div>
  );
};

export default Robot3DViewer;