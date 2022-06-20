import {  Link, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ to, name, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link to={to} className={isActive && "active"}>
      {" "}
      {name}{" "}
    </Link>
  );
};

export default CustomLink;