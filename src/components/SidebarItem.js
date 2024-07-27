const SidebarItem = ({ link, isSelected, onClick }) => {
    return (
      <li
        className={`p-2 my-2 rounded cursor-pointer ${isSelected ? 'bg-gray-700' : 'bg-gray-900'}`}
        onClick={() => onClick(link)}
      >
        <div className="truncate">{link}</div>
      </li>
    );
  };
  
  export default SidebarItem;
  