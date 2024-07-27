import { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ links, selectedLink, onLinkSelect }) => {
  const [internalSelectedLink, setInternalSelectedLink] = useState(selectedLink);

  useEffect(() => {
    setInternalSelectedLink(selectedLink);
  }, [selectedLink]);

  const handleLinkClick = (link) => {
    setInternalSelectedLink(link);
    onLinkSelect(link);
  };

  return (
    <div className="w-1/5 bg-sidebar-bg text-c5 p-4">
      <h2 className="text-2xl mb-4">Your Links</h2>
      <ul>
        {links.map((link, index) => (
          <SidebarItem
            key={index}
            link={link}
            isSelected={link === internalSelectedLink}
            onClick={handleLinkClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
