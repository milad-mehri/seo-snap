import { FaTimes } from 'react-icons/fa';

const SidebarItem = ({ link, isSelected, onClick, onRemove }) => {
  return (
    <li
      className={`flex justify-between items-center p-3 mb-2 rounded cursor-pointer ${isSelected ? 'bg-sidebar-item-active-bg' : 'bg-sidebar-item-bg'} text-text-primary hover:bg-sidebar-item-active-bg`}
      title={link} 
    >
      <span onClick={() => onClick(link)} className="flex-1 truncate">{link}</span>
      <button onClick={() => onRemove(link)} className="ml-2 text-slate-600 hover:text-red-700">
        <FaTimes />
      </button>
    </li>
  );
};

export default SidebarItem;
