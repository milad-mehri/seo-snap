// src/app/dashboard/page.js
"use client";
import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(links[0]);

  const handleLinkSelect = (link) => {
    setSelectedLink(link);
  };
  
  const handleAddLink = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newLink = e.target.value;
      if (!links.includes(newLink)) {
        setLinks([...links, newLink]);
      }
      e.target.value = "";
    }
  };

  return (
    <div className="flex min-h-screen">
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
        <div>
          <p>SELECTED LINK</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
