import { Link } from "react-router-dom";
import { signupHandler, googleAuthHandler } from "../../firebase/firebaseAuth";
import { useState, FC } from "react";
import phoneImage from "../../assets/images/phone.svg";
import { OpenEye, CloseEye, Google } from "../../assets";
import { IRootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/auth-action/authSlice";

export const Signuppage: FC = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const signupInputChangeHandler = (e: { target: HTMLInputElement }) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { error } = useSelector((store: IRootState) => store.auth);

  const showPasswordHandler = (passwordType: String) => {
    if (passwordType === "password") {
      setShowPassword({ ...showPassword, password: !showPassword.password });
    } else {
      setShowPassword({
        ...showPassword,
        confirmPassword: !showPassword.confirmPassword,
      });
    }
  };

  const formSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setError(""));
    if (signupInput.password !== signupInput.confirmPassword) {
      dispatch(setError("Passwords do not match"));
    } else {
      signupHandler(
        signupInput.name,
        signupInput.email,
        signupInput.password,
        dispatch
      );
    }
  };

  return (
    <main className="min-h-full	">
      <div className="container px-6 py-12 ">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img src={phoneImage} className="w-full" alt="phone" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-4">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500 focus:outline-none"
                  placeholder="John Doe"
                  onChange={signupInputChangeHandler}
                  name="name"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500 focus:outline-none"
                  placeholder="Email address"
                  onChange={signupInputChangeHandler}
                  required
                  name="email"
                />
              </div>

              <div className="mb-6 flex items-center">
                <input
                  type={showPassword.password ? "text" : "password"}
                  className="form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500 focus:outline-none"
                  placeholder="Password"
                  onChange={signupInputChangeHandler}
                  required
                  name="password"
                />
                <span
                  className="-ml-8 cursor-pointer"
                  onClick={() => showPasswordHandler("password")}
                >
                  {showPassword.password ? <CloseEye /> : <OpenEye />}
                </span>
              </div>

              <div className="mb-6 flex items-center">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="form-control block w-full px-4 py-2 text-l font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500 focus:outline-none"
                  placeholder="Confirm Password"
                  required
                  onChange={signupInputChangeHandler}
                  name="confirmPassword"
                />
                <span
                  className="-ml-8 cursor-pointer"
                  onClick={() => showPasswordHandler("confirmPassword")}
                >
                  {showPassword.confirmPassword ? <CloseEye /> : <OpenEye />}
                </span>
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-primary-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-700 hover:shadow-lg focus:bg-primary-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-500 active:shadow-lg transition duration-150 ease-in-out w-full"
                onClick={formSubmitHandler}
              >
                Sign up
              </button>
              {error && (
                <p className="text-red-500 text-base text-center my-2">
                  {error}
                </p>
              )}
              <Link
                to="/login"
                className="text-base text-primary-500 flex items-center justify-center hover:underline"
              >
                Existing User? Login Here.
              </Link>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
            </form>

            <button
              className="px-7 py-3 text-primary-300 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 flex gap-2 border-2 border-primary-500 hover:bg-primary-500 hover:text-white"
              onClick={(e) => {
                googleAuthHandler(dispatch);
              }}
            >
              <Google />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
