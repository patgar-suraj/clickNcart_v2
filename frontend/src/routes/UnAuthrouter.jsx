import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuthrouter = (props) => {
  const { userData } = useSelector((state) => state.userReducer);

  return !userData ? props.children : <Navigate to={"/"} />;
};

export default UnAuthrouter;
