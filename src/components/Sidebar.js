import { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = ({ links, selectedLink, onLinkSelect, onRemoveLink }) => {
  const [internalSelectedLink, setInternalSelectedLink] = useState(selectedLink);

  useEffect(() => {
    setInternalSelectedLink(selectedLink);
  }, [selectedLink]);

  const handleLinkClick = (link) => {
    setInternalSelectedLink(link);
    onLinkSelect(link);
  };

  return (
    <div className="w-1/5 bg-sidebar-bg p-6">
      <h2 className="text-l font-bold mb-6 text-text-primary">YOUR LINKS</h2>
      <ul>
        {links.map((link, index) => (
          <SidebarItem
            key={index}
            link={link}
            isSelected={link === internalSelectedLink}
            onClick={handleLinkClick}
            onRemove={onRemoveLink}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
