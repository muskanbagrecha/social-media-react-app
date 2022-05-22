import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../store/auth-action/authSlice";
import { closeModal } from "../../../../store/modal-action/modalSlice";

export const EditProfile = () => {
  const { authUser } = useSelector((store: any) => store.auth);
  const [input, setInput] = useState({
    displayName: authUser?.displayName ?? "",
    bio: authUser?.bio ?? "",
    portfolio: authUser?.portfolio ?? "",
  });
  const dispatch = useDispatch();
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUserDetails(input));
    dispatch(closeModal());
  };

  return (
    <form
      className="input-form"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => formSubmitHandler(e)}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="displayName"
        onChange={(e) => {
          inputChangeHandler(e);
        }}
        value={input?.displayName}
      />
      <label htmlFor="bio">Bio</label>
      <input
        type="text"
        id="bio"
        name="bio"
        onChange={(e) => {
          inputChangeHandler(e);
        }}
        value={input?.bio}
      />
      <label htmlFor="portfolio">Portfolio</label>
      <input
        type="text"
        id="email"
        name="portfolio"
        onChange={(e) => {
          e.stopPropagation();
          inputChangeHandler(e);
        }}
        value={input?.portfolio}
      />
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
