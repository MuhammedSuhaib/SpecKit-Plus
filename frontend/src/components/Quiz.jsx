import React, { useState } from 'react';

const Quiz = ({ question, options, answer, explanation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isCorrect = selectedOption === answer;

  return (
    <div style={{
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#f9f9f9',
      maxWidth: '600px'
    }}>
      <h3>🧠 Knowledge Check</h3>
      <form onSubmit={handleSubmit}>
        <p><strong>{question}</strong></p>

        {options.map((option, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="quiz-option"
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                disabled={submitted}
                style={{ marginRight: '10px' }}
              />
              {option}
            </label>
          </div>
        ))}

        {!submitted ? (
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Check Answer
          </button>
        ) : (
          <div style={{ marginTop: '15px' }}>
            <div style={{
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
              color: isCorrect ? '#155724' : '#721c24',
              marginBottom: '10px'
            }}>
              {isCorrect ? '✅ Correct!' : '❌ Try again!'}
            </div>
            {explanation && (
              <div style={{
                padding: '10px',
                backgroundColor: '#e2e3e5',
                borderRadius: '4px',
                fontStyle: 'italic'
              }}>
                {explanation}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Quiz;