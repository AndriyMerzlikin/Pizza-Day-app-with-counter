import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <h1 className="not-found">
      Something went wrong. Please, go this <Link to={"/"}>LINK</Link> to go
      Home!
    </h1>
  );
};

export default NotFoundPage;
