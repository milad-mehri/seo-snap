"use client";

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ResultsDisplay from '../../components/ResultsDisplay';

import { useAuth } from '../lib/AuthContext';
import Logout from '../components/Logout';
import { getServerSideProps } from 'next';
import { auth } from '../lib/firebaseConfig';


export const getServerSideProps = async (context) => {
  const user = await auth.currentUser;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

const Dashboard = ({user}) => {
  const [links, setLinks] = useState([
    'https://milad-mehri.github.io/',
    'https://headstarter.co/',
    'https://www.google.com/' // replace with users saved links later
  ]);
  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const handleAddLink = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      const newLink = e.target.value;
      if (!links.includes(newLink)) {
        setLinks([...links, newLink]);
      }
      e.target.value = '';
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


  const { user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
    
    <div className="flex min-h-screen">
      <h1>Welcome, {user?.displayName}</h1>
      <Logout />

      <Sidebar links={links} onLinkSelect={handleLinkSelect} />
      <main className="flex-1 p-4 bg-gray-700 text-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter link here"
            className="w-full p-2 rounded bg-gray-900 text-white"
            onKeyDown={handleAddLink}
          />
        </div>
        <h2 className="text-2xl mb-2">Results for: {selectedLink}</h2>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? <p>Loading...</p> : <ResultsDisplay results={results} />}
      </main>
    </div>
  );
};

export default Dashboard;