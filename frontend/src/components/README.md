# Interactive Components for Embodied Intelligence Book

This directory contains interactive React components that can be used in the MDX files of the textbook to enhance the learning experience.

## Available Components

### NeuralNetworkSimulator
An interactive neural network visualization tool that allows readers to adjust inputs and weights to see how they affect output.

### Quiz
An interactive quiz component for testing reader understanding with immediate feedback.

### Robot3DViewer
A 3D visualization interface for different robot types (humanoid, wheeled, quadruped).

### RobotPathSimulator
A path planning simulation tool that visualizes how robots navigate around obstacles.

## How to Use

1. Import the component in your MDX file:
   ```mdx
   import ComponentName from '@site/src/components/ComponentName';
   ```

2. Use the component in your content:
   ```mdx
   <ComponentName />
   ```

3. For components that accept props, provide the necessary configuration:
   ```mdx
   <Quiz
     question="Sample question?"
     options={["Option 1", "Option 2", "Option 3"]}
     answer={0}
     explanation="Explanation for the correct answer."
   />
   ```

## Creating New Interactive Components

To create a new interactive component:

1. Create a new file in this directory (e.g., `NewComponent.jsx`)
2. Use React hooks for interactivity (useState, useEffect, etc.)
3. Export the component as default
4. Document how to use it in the interactive guides

## Best Practices

- Keep components focused on educational objectives
- Provide clear visual feedback for interactions
- Ensure components are responsive and accessible
- Use appropriate loading states for complex interactions
- Follow Docusaurus MDX conventions