import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import plainShirt from './images/shirt_1.webp';
import plainPants from './images/pants_1.webp';
import plainShoes from './images/shoes_1.webp';
import polkaDotPattern from './images/polka_dot.webp';
import stripesPattern from './images/stripes.webp';

function ClothingCustomizer() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productPattern, setProductPattern] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isToolbarHighlighted, setIsToolbarHighlighted] = useState(false);
  const canvasRef = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      updateCanvas();
    }
  }, [selectedProduct, productPattern]);

  const resizePattern = (patternImg, targetWidth, targetHeight) => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = targetWidth;
    offscreenCanvas.height = targetHeight;
    const offscreenCtx = offscreenCanvas.getContext('2d');
    
    const scale = Math.max(targetWidth / patternImg.width, targetHeight / patternImg.height);
    const scaledWidth = patternImg.width * scale;
    const scaledHeight = patternImg.height * scale;
    
    const offsetX = (targetWidth - scaledWidth) / 2;
    const offsetY = (targetHeight - scaledHeight) / 2;
    
    offscreenCtx.drawImage(patternImg, offsetX, offsetY, scaledWidth, scaledHeight);
    return offscreenCanvas;
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const productImg = new Image();
    productImg.src = selectedProduct === 'shirt' ? plainShirt : selectedProduct === 'pants' ? plainPants : plainShoes;
    productImg.onload = () => {
      canvas.width = productImg.width;
      canvas.height = productImg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(productImg, 0, 0);

      if (productPattern) {
        const patternImg = new Image();
        patternImg.src = productPattern;
        patternImg.onload = () => {
          const resizedPattern = resizePattern(patternImg, canvas.width, canvas.height);
          ctx.globalCompositeOperation = 'source-atop';
          const pattern = ctx.createPattern(resizedPattern, 'repeat');
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
      }
    };
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsFocused(true);
  };

  const handleDragLeave = (e) => {
    if (!workspaceRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text');
    if (item === 'shirt' || item === 'pants' || item === 'shoes') {
      setSelectedProduct(item);
    } else {
      setProductPattern(item === 'polkaDot' ? polkaDotPattern : stripesPattern);
    }
    setIsFocused(true);
    setIsToolbarHighlighted(true);
    setTimeout(() => setIsToolbarHighlighted(false), 2000);
  };

  return (
    <div>
      <div id="toolbar" className={isToolbarHighlighted ? 'highlighted' : ''}>
        <h1>TAZMIC DND</h1>
        <h2>Products</h2>
        <div className="toolbarItem" draggable onDragStart={(e) => handleDragStart(e, 'shirt')}>
          T-Shirt
        </div>
        <div className="toolbarItem" draggable onDragStart={(e) => handleDragStart(e, 'pants')}>
          Pants
        </div>
        <div className="toolbarItem" draggable onDragStart={(e) => handleDragStart(e, 'shoes')}>
          Shoes
        </div>
        <h2>Patterns</h2>
        <div className="toolbarItem" draggable onDragStart={(e) => handleDragStart(e, 'polkaDot')}>
          Polka Dot
        </div>
        <div className="toolbarItem" draggable onDragStart={(e) => handleDragStart(e, 'stripes')}>
          Stripes
        </div>
        <button className="refresh-button" onClick={() => window.location.reload()}>
          Refresh
        </button>
      </div>
      <div className="container">
        <div 
          id="workspace" 
          ref={workspaceRef}
          className={isFocused ? 'focused' : ''}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export default ClothingCustomizer;
