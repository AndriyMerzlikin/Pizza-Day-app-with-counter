const Input = ({ handleChange, handlePlaceholder, handleType, value }) => {
  return (
    <>
      <input
        value={value}
        type={handleType}
        onChange={handleChange}
        placeholder={handlePlaceholder}
      />
    </>
  );
};

export default Input;
