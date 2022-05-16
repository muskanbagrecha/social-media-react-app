import { Link } from "react-router-dom";
import phoneImage from "../../assets/images/phone.svg";
import { Google } from "../../assets";
import { googleAuthHandler, loginHandler } from "../../firebase/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { useState, FC } from "react";
import { setError } from "../../store/auth-action/authSlice";
import { IRootState } from "../../store/store";

export const Loginpage: FC = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const loginInputChangeHandler = (e: { target: HTMLInputElement }) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((store: IRootState) => store.auth);
  const formSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setError(""));
    if (loginInput.email.length === 0 || loginInput.password.length === 0) {
      dispatch(setError("Please fill all the fields"));
    }
    loginHandler(loginInput.email, loginInput.password, dispatch);
  };

  return (
    <main className="min-h-full">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img src={phoneImage} className="w-full" alt="Phone image" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-4">
            <form onSubmit={formSubmitHandler}>
              <div className="mb-6">
                <input
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500"
                  placeholder="Email address"
                  required
                  onChange={loginInputChangeHandler}
                  name="email"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-500"
                  placeholder="Password"
                  required
                  onChange={loginInputChangeHandler}
                  name="password"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-primary-600 checked:border-primary-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="rememberme"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 cursor-pointer"
                    htmlFor="rememberme"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to=""
                  className="text-primary-500 hover:text-primary-600 focus:text-primary-500 active:text-primary-200 duration-200 transition ease-in-out"
                >
                  Forgot password?
                </Link>
              </div>
              {error && (
                <p className="text-red-500 text-base text-center my-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-primary-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-700 hover:shadow-lg focus:bg-primary-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-500 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Sign in
              </button>
              <Link
                to="/signup"
                className="text-base text-primary-500 flex items-center justify-center"
              >
                Create a new account
              </Link>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">OR</p>
              </div>
            </form>
            <button
              className="px-7 py-3 text-primary-300 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3 flex gap-2 border-2 border-primary-500 hover:bg-primary-500 hover:text-white"
              onClick={(e) => {
                googleAuthHandler(dispatch);
                e.stopPropagation();
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
