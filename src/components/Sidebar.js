import { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { FaGithub } from 'react-icons/fa';

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
    <div className="fixed top-0 left-0 w-1/5 h-screen bg-sidebar-bg p-6 flex flex-col">
      <h2 className="text-l font-bold mb-6 text-text-primary">YOUR LINKS</h2>
      <div className="flex-grow overflow-y-auto">
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
      <div className="mt-6 flex items-center">
        <a
          href="https://github.com/milad-mehri/seo-snap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-text-primary hover:text-text-secondary"
        >
          <FaGithub className="mr-2" /> Github
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
