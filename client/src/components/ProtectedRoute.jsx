import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, isUserLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) {
      navigate('/');
    }
  }, [isUserLogged, navigate]);

  return isUserLogged ? children : null;
}

export default ProtectedRoute;
