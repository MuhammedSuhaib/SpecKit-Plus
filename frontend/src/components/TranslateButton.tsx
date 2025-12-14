import React, { useState } from 'react';

export default function TranslateButton() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async () => {
    if (isTranslating) return; // Prevent multiple clicks
    
    setIsTranslating(true);
    setError(null);
    
    try {
      // Get the article content
      const articleElement = document.querySelector('article');
      if (!articleElement) {
        throw new Error('Article content not found');
      }

      // Get all text content except code blocks
      const elements = articleElement.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6, span, li');
      const contentToTranslate = Array.from(elements).map(el => ({
        element: el,
        originalText: el.textContent || '',
        isCode: el.closest('pre, code') !== null
      })).filter(item => item.originalText.trim() !== '' && !item.isCode);

      if (contentToTranslate.length === 0) {
        throw new Error('No translatable content found');
      }

      // Show a warning to the user
      if (!confirm('This will translate the content to Urdu. Auto-translated content may have errors. Continue?')) {
        setIsTranslating(false);
        return;
      }

      // Translate each piece of content
      for (const item of contentToTranslate) {
        if (item.originalText.trim() !== '' && !item.isCode) {
          // Call the backend translation API
          const res = await fetch('http://localhost:8000/api/translate-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: item.originalText,
              target_language: 'ur'
            }),
          });

          if (!res.ok) {
            throw new Error(`Translation API error: ${res.status}`);
          }

          const { translated_text } = await res.json();

          // Update the text content while preserving HTML structure
          item.element.textContent = translated_text;
        }
      }

      alert('Translation to Urdu completed!');
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during translation');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="translate-button-container" style={{ marginBottom: '20px' }}>
      <button 
        onClick={translate} 
        disabled={isTranslating}
        style={{
          padding: '8px 16px',
          backgroundColor: isTranslating ? '#ccc' : '#00cc44',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isTranslating ? 'not-allowed' : 'pointer',
        }}
      >
        {isTranslating ? 'Translating...' : '.Translate to Urdu'}
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '5px' }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}