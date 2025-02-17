"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import ResultsDisplay from "../../components/ResultsDisplay";
import Modal from "../../components/Modal";
import { Inter } from "next/font/google";
import Cookies from "js-cookie";

const inter = Inter({ subsets: ["latin"] });

const Dashboard = () => {
  const [links, setLinks] = useState(() => {
    const savedLinks = Cookies.get("seoSnapLinks");
    return savedLinks
      ? JSON.parse(savedLinks)
      : [
        "https://seo-snap.vercel.app/",
          "https://milad-mehri.github.io/",
        //   "https://headstarter.co/",
          "https://www.google.com/", // replace with users saved links later
        ];
  });

  const [selectedLink, setSelectedLink] = useState(links[0]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newLink, setNewLink] = useState("");
  const [shareLink, setShareLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    Cookies.set("seoSnapLinks", JSON.stringify(links), { expires: 7 });
  }, [links]);

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };

  const handleAddLink = () => {
    if (newLink) {
      const trimmedLink = newLink.replace(/\/+$/, "");
      if (!isValidUrl(trimmedLink)) {
        setError("Please enter a valid URL.");
        return;
      }
      if (links.includes(trimmedLink)) {
        setSelectedLink(trimmedLink); // Select the existing link
        setError("Link already exists.");
      } else if (links.length < 20) {
        setLinks([...links, trimmedLink]);
        setSelectedLink(trimmedLink); // Select the new link
        setError("");
      } else {
        setError("Maximum of 20 links allowed.");
      }
      setNewLink("");
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };

  const handleRemoveLink = (link) => {
    const updatedLinks = links.filter((l) => l !== link);
    setLinks(updatedLinks);
    if (selectedLink === link) {
      setSelectedLink(updatedLinks.length ? updatedLinks[0] : "");
    }
  };

  const handleShare = async () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: selectedLink }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setResults(result);
      } catch (error) {
        console.error("Failed to fetch analysis results:", error);
        setError("Failed to fetch analysis results.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedLink) {
      fetchResults();
    }
  }, [selectedLink]);

  return (
    <div
      className={`flex min-h-screen bg-main-bg text-text-primary ${inter.className}`}
    >
      {isClient && (
        <>
          <Sidebar
            links={links}
            selectedLink={selectedLink}
            onLinkSelect={handleLinkSelect}
            onRemoveLink={handleRemoveLink}
          />
          <main className="flex-1 p-6 ml-[20%]">
            {" "}
            {/* Add margin to the main content */}
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
              {error && <p className="text-error mt-2">{error}</p>}
            </div>
            <div ref={resultsRef}>
              <h2 className="text-xl font-semibold italics mb-4">
                Results for:{" "}
                <a
                  href={selectedLink}
                  target="_blank"
                  className="hover:underline italic font-normal"
                >
                  {selectedLink}{" "}
                </a>
              </h2>
              {/* {error && <p className="text-error">{error}</p>} */}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ResultsDisplay results={results} />
              )}
            </div>
            {!loading && Object.keys(results).length > 0 && (
              <button
                className="mt-4 p-2 w-full bg-sidebar-item-bg text-text-secondary rounded shadow-lg hover:bg-sidebar-item-active-bg"
                onClick={handleShare}
              >
                Share
              </button>
            )}
          </main>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            results={results}
            link={selectedLink}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
