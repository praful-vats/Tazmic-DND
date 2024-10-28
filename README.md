# Tazmic DND

This React component implements a drag-and-drop interface for customizing clothing items with different patterns. It allows users to select products (shirt, pants, or shoes) and apply patterns (polka dot or stripes) to them.

## Problem Statement

Create a clothing customizer that:
1. Allows users to drag and drop products onto a workspace
2. Enables applying patterns to the selected products
3. Focuses the product when dragged over the workspace
4. Highlights the toolbar when a product is dropped

## Solution Breakdown

### 1. State Management

The component uses React's `useState` hook to manage the following states:
- `selectedProduct`: Stores the currently selected product
- `productPattern`: Stores the currently applied pattern
- `isFocused`: Boolean to track if the workspace is focused
- `isToolbarHighlighted`: Boolean to track if the toolbar is highlighted

### 2. Canvas Manipulation

The `canvasRef` is used to manipulate the HTML5 canvas element:
- `updateCanvas()` function draws the selected product and applies the pattern
- `resizePattern()` function resizes the pattern to fit the product dimensions

### 3. Drag and Drop Implementation

The component implements the HTML5 Drag and Drop API:
- `handleDragStart()`: Initiates the drag operation
- `handleDragOver()`: Prevents default behavior and sets focus
- `handleDragLeave()`: Removes focus when leaving the workspace
- `handleDrop()`: Handles the drop event, updates states, and triggers updates

### 4. Effect Hook

The `useEffect` hook is used to trigger the `updateCanvas()` function whenever the selected product or pattern changes.

## Algorithms

### Pattern Resizing Algorithm

The `resizePattern()` function uses the following algorithm to resize the pattern:

1. Create an offscreen canvas
2. Calculate the scaling factor to maintain aspect ratio
3. Calculate the new dimensions of the pattern
4. Center the pattern on the offscreen canvas
5. Draw the resized pattern onto the offscreen canvas
6. Return the offscreen canvas for use in pattern application

### Pattern Application Algorithm

The pattern is applied to the product using the following steps:

1. Draw the product image onto the main canvas
2. Create a pattern from the resized pattern image
3. Set the global composite operation to 'source-atop'
4. Fill the canvas with the pattern

This ensures that the pattern is only applied within the non-transparent areas of the product image.

## Usage

To use this component:

1. Import the necessary images
2. Include the component in your React application
3. Ensure that the CSS file (`App.css`) is properly linked and contains the required styles
4. The component will render a toolbar with draggable products and patterns, and a workspace where these can be dropped and customized

