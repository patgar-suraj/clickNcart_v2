import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authrouter = (props) => {
  const { userData } = useSelector((state) => state.userReducer);

  return userData ? props.children : <Navigate to={"/login"} />;
};

export default Authrouter;
