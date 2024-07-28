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
    <div className="w-1/5 bg-sidebar-bg p-6 flex flex-col justify-between">
      <div>
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
      <div className="mt-4">
        <a
          href="https://github.com/milad-mehri/seo-snap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-text-primary hover:text-text-secondary"
        >
          <FaGithub className="mr-2" />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
