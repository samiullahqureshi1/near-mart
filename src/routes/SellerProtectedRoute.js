import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import { loadUser } from "../redux/actions/user";

const SellerProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    // ✅ If token exists and no user loaded, fetch user
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, user]);

  if (loading || !user) {
    return <Loader />;
  }

  if (!isAuthenticated || user.role !== "Seller") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
