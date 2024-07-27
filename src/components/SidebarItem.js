const SidebarItem = ({ link, isSelected, onClick }) => {
    return (
      <li
        className={`p-2 my-2 rounded cursor-pointer ${isSelected ? 'bg-sidebar-item-bg' : 'bg-sidebar-item-active-bg'}`}
        onClick={() => onClick(link)}
      >
        <div className="truncate">{link}</div>
      </li>
    );
  };
  
  export default SidebarItem;
  