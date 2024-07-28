"use client";

import { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import ResultsDisplay from '../../components/ResultsDisplay';
import Modal from '../../components/Modal';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef(null); // Ref to the results container

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const handleAddLink = () => {
    if (newLink) {
      const trimmedLink = newLink.replace(/\/+$/, ''); // Trim trailing slashes
      if (links.includes(trimmedLink)) {
        setSelectedLink(trimmedLink); // Select the existing link
      } else {
        setLinks([...links, trimmedLink]);
        setSelectedLink(trimmedLink); // Select the new link
      }
      setNewLink('');
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddLink();
    }
  };

  const handleShare = async () => {
    setIsModalOpen(true);
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
    <div className={`flex min-h-screen bg-main-bg text-text-primary ${inter.className}`}>
      <Sidebar links={links} selectedLink={selectedLink} onLinkSelect={handleLinkSelect} />
      <main className="flex-1 p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter link here"
              className="w-full p-2 rounded bg-sidebar-item-bg text-text-primary"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="p-2 bg-sidebar-item-bg text-text-primary rounded shadow font-bold text-sm"
              onClick={handleAddLink}
            >
              ANALYZE
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
        <div ref={resultsRef}> {/* Reference to the results container */}
          <h2 className="text-xl font-semibold italics mb-4">Results for: <a href={selectedLink} target='_blank' className='hover:underline italic font-normal'>{selectedLink} </a></h2>
          {error && <p className="text-error">{error}</p>}
          {loading ? <p>Loading...</p> : <ResultsDisplay results={results} />}
        </div>
        <button
          className="mt-4 p-2 w-full bg-sidebar-item-bg text-text-secondary rounded shadow-lg hover:bg-sidebar-item-active-bg"
          onClick={handleShare}
        >
          Share
        </button>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} link={selectedLink} results={results} />
    </div>
  );
};

export default Dashboard;
