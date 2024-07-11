/* eslint-disable react/prop-types */
const Input = ({handleChange, handlePlaceholder, handleType}) => {
    return (
      <>
        <input
          type={handleType}
          onChange={handleChange}
          placeholder={handlePlaceholder}
        />
      </>
    );
};

export default Input;
