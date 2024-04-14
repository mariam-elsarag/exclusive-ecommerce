import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import { auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signIn } from "../features/auth/userSlice";
const AppLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          signIn({
            id: authUser.uid,
            userName: authUser.displayName,
            email: authUser.email,
          }),
        );
      }
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
