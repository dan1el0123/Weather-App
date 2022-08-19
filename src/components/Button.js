const Button = ({ title, label, handleClick, children }) => {
  return (
    <button
      className="button"
      title={title}
      aria-label={label}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default Button;
