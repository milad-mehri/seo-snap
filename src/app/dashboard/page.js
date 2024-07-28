"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ResultsDisplay from '../../components/ResultsDisplay';
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

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const validateLink = (link) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$','i' // validate fragment locator
    );
    return !!urlPattern.test(link);
  };

  const normalizeLink = (link) => {
    try {
      const url = new URL(link);
      url.pathname = url.pathname.replace(/\/+$/, ''); // Remove trailing slashes
      return url.toString();
    } catch {
      return link;
    }
  };

  const handleAddLink = () => {
    if (!newLink) {
      setError('Please enter a link.');
      return;
    }
    if (!validateLink(newLink)) {
      setError('Invalid link format.');
      return;
    }
    const normalizedNewLink = normalizeLink(newLink);
    if (links.includes(normalizedNewLink)) {
      setSelectedLink(normalizedNewLink); // Select the existing link
      setError('Duplicate link.');
    } else {
      setLinks([...links, normalizedNewLink]);
      setSelectedLink(normalizedNewLink); // Select the new link
      setError('');
    }
    setNewLink('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddLink();
    }
  };

  const handleLinkRemove = (linkToRemove) => {
    setLinks(links.filter(link => link !== linkToRemove));
    if (selectedLink === linkToRemove) {
      setSelectedLink(links.length > 1 ? links[0] : '');
    }
  };

  useEffect(() => {
    if (!selectedLink) return;

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
      <Sidebar links={links} selectedLink={selectedLink} onLinkSelect={handleLinkSelect} onLinkRemove={handleLinkRemove} />
      <main className="flex-1 p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter link here"
              className="w-full p-2 rounded bg-sidebar-item-bg text-text-primary shadow-md"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className="text-sm p-2 font-bold bg-sidebar-item-bg text-text-primary rounded shadow-lg hover:bg-sidebar-item-active-bg transition-all duration-200"
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
        <h2 className="text-xl font-semibold italic mb-4">Results for: <a href={selectedLink} target='_blank' className='hover:underline italic font-normal'>{selectedLink} </a></h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? <p>Loading...</p> : <ResultsDisplay results={results} />}
      </main>
    </div>
  );
};

export default Dashboard;
