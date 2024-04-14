import { useForm } from "react-hook-form";
import Register from "./Register";
import Button from "../../ui/Button";
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { googleAuthProvider } from "./../../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { signIn } from "./userSlice";
import { useDispatch } from "react-redux";
import { googleIcon } from "../../assets/image";
import { toast } from "react-toastify";
import ErrorMessage from "../../ui/ErrorMessage";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", {
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
      console.log("Error caught:", error.code);
      toast.error("Password or email is invalid", {
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
        toast.success("Login successful!", {
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
        console.log(error.message);
        toast.error("Error in log in with google", {
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
        <h3 className="font-header text-3xl font-medium">
          Log in to Exclusive
        </h3>
        <p className="mt-6 text-base font-normal">Enter your details below</p>
        <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
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
          <div className=" mt-8 flex flex-col items-center justify-center  text-base">
            <Button type="fullWidthPrimary">Log In</Button>
            <span className="text-md mb-2 text-gray-400">Or</span>
            <Button as="button" type="outline" onClick={handleGoogleSignUp}>
              <img src={googleIcon} alt="google icon" />
              <span> continue with Google</span>
            </Button>
          </div>
        </form>
      </Register>
    </div>
  );
};

export default SignIn;
