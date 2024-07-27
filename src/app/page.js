"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ResultsDisplay from '../../components/ResultsDisplay';

const Dashboard = () => {
  const [links, setLinks] = useState([
    'https://milad-mehri.github.io/',
    'https://headstarter.co/',
    'https://www.google.com/' // replace with users saved links later
  ]);
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newLink, setNewLink] = useState('');
  const [shareLink, setShareLink] = useState(false);

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const handleAddLink = () => {
    if (newLink && !links.includes(newLink)) {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddLink();
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true); // Set loading to true
        setError('');
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: selectedLink }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResults(result);
      } catch (error) {
        console.error('Failed to fetch analysis results:', error);
        setError('Failed to fetch analysis results.');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchResults();
  }, [selectedLink]);

  return (
    <div className="flex min-h-screen bg-bg-dark text-text-primary">
      <Sidebar links={links} selectedLink={selectedLink} onLinkSelect={handleLinkSelect} />
      <main className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter link here"
              className="w-full p-2 rounded bg-sidebar-bg text-text-primary"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={handleAddLink}
            >
              Analyze
            </button>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="shareLink"
              checked={shareLink}
              onChange={(e) => setShareLink(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="shareLink" className="text-text-secondary">
              Share link on SEO snap to get more views (optional)
            </label>
          </div>
        </div>
        <h2 className="text-2xl mb-2">Results for: {selectedLink}</h2>
        {error && <p className="text-error">{error}</p>}
        {loading ? <p>Loading...</p> : <ResultsDisplay results={results} />}
      </main>
    </div>
  );
};

export default Dashboard;
