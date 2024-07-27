const SidebarItem = ({ link, isSelected, onClick }) => {
    return (
      <li
        className={`p-2 mb-2 rounded cursor-pointer ${isSelected ? 'bg-sidebar-item-active-bg' : 'bg-sidebar-item-bg'} text-text-primary`}
        onClick={() => onClick(link)}
      >
        {link}
      </li>
    );
  };
  
  export default SidebarItem;
  