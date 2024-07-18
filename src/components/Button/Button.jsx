const Button = ({ title, handleClick, className, children }) => {
  return (
    <button className={className} onClick={handleClick}>
      {children} {title}
    </button>
  );
};

export default Button;
