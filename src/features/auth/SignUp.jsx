import { useForm } from "react-hook-form";
import Register from "./Register";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "./../../services/firebase";
import { googleIcon } from "../../assets/image";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { signIn } from "./userSlice";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../ui/ErrorMessage";
import { toast } from "react-toastify";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { email, password, userName } = data;

      await createUserWithEmailAndPassword(auth, email, password);

      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: userName });

      dispatch(
        signIn({
          id: auth.currentUser.uid,
          userName: userName,
          email: email,
        }),
      );
      toast.success("Sign up successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        dispatch(
          signIn({
            id: result.user.uid,
            userName: result.user.displayName,
            email: result.user.email,
          }),
        );
        toast.success("Sign up successful!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div>
      <Register>
        <h3 className="font-header text-3xl font-medium">Create an account</h3>
        <p className="mt-6 text-base font-normal">Enter your details below</p>
        <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="input"
              {...register("userName", {
                required: "this is required",

                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
              })}
            />
            {errors.userName && (
              <ErrorMessage message={errors.userName.message} />
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "this is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="mt-8">
            <Button type="fullWidthPrimary">Create Account</Button>
            <Button as="button" type="outline" onClick={handleGoogleSignUp}>
              <img src={googleIcon} alt="google icon" />
              <span> Sign Up with Google</span>
            </Button>
            <div className=" mt-8 flex items-center justify-center gap-2 text-base">
              <p className="text-black/70">Already have account?</p>
              <Link to="/signIn">Log in</Link>
            </div>
          </div>
        </form>
      </Register>
    </div>
  );
};

export default SignUp;
