/* eslint-disable react/prop-types */
import MenuItem from "./MenuItem/MenuItem";
import "../MenuList/MenuList.css";

const MenuList = ({ pizzas }) => {
  return (
    <ul className="menu-list">
      {pizzas.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

export default MenuList;
