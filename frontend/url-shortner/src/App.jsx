import React, { useState } from 'react';
import env from './env';  // Importing the env.js file

const ShortenUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = env.REACT_APP_API_BASE_URL;  // Using the base URL from env.js

      const response = await fetch(`${baseUrl}/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await response.json();
      if (data.id) {
        setShortUrl(`${baseUrl}/${data.id}`);
      } else {
        alert('Shortening failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error shortening URL');
    }
  };

  // Inline CSS styles for a modern look
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #4e73df, #1f3d59)',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    transition: 'transform 0.3s ease-in-out',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'scale(1.05)', // Hover effect
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333333',
    transition: 'color 0.3s ease',
  };

  const inputStyle = {
    padding: '12px 20px',
    borderRadius: '8px',
    border: '1px solid #cccccc',
    fontSize: '16px',
    marginBottom: '20px',
    outline: 'none',
    width: '100%',
    transition: 'border 0.3s ease',
  };

  const buttonStyle = {
    padding: '14px 24px',
    borderRadius: '8px',
    backgroundColor: '#4e73df',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#2e5bcb',
    transform: 'scale(1.05)', // Hover effect
  };

  const shortUrlContainer = {
    marginTop: '30px',
    textAlign: 'center',
    animation: 'fadeIn 0.6s ease-out',
  };

  const shortUrlText = {
    color: '#374151',
    fontWeight: '500',
    marginBottom: '8px',
  };

  const shortUrlLink = {
    color: '#4e73df',
    fontSize: '18px',
    fontWeight: '600',
    textDecoration: 'underline',
    wordBreak: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <div
        style={shortUrl ? cardHoverStyle : cardStyle} // Apply hover effect if URL is shortened
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h1 style={titleStyle}>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            style={inputStyle}
            required
          />
          <button
            type="submit"
            style={shortUrl ? buttonHoverStyle : buttonStyle} // Apply hover effect if URL is shortened
          >
            Generate Short Link
          </button>
        </form>

        {shortUrl && (
          <div style={shortUrlContainer}>
            <p style={shortUrlText}>Here is your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={shortUrlLink}
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenUrl;
