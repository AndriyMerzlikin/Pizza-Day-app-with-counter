const Button = ({ title, handleClick, className, children, disabled }) => {
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {children} {title}
    </button>
  );
};

export default Button;
