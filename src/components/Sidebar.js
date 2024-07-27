import { useState } from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ links, onLinkSelect }) => {
  const [selectedLink, setSelectedLink] = useState(links[0]);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    onLinkSelect(link);
  };

  return (
    <div className="w-1/5 bg-gray-800 text-white p-4">
      <h2 className="text-2xl mb-4">Your Links</h2>
      <ul>
        {links.map((link, index) => (
          <SidebarItem
            key={index}
            link={link}
            isSelected={link === selectedLink}
            onClick={handleLinkClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
