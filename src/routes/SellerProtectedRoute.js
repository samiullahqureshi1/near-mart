import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || !user || user.role !== "Seller") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
