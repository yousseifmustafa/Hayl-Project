const ActionButton = ({ icon, label }) => {
    return (
      <button className="border rounded-md px-4 py-2 flex items-center gap-2">
        {icon} {label}
      </button>
    );
  };
  
  export default ActionButton;
  