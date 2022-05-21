import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile } from "../../pages/profilepage/components/";
import { closeModal } from "../../store/modal-action/modalSlice";
import { CreatePost } from "../../pages/homepage/components/create-post/CreatePost";
export const Modal = () => {
  const dispatch = useDispatch();
  const { modalType, isModalOpen } = useSelector((store: any) => store.modal);
  return (
    <>
      <div
        onClick={() => dispatch(closeModal())}
        className={`${isModalOpen ? "modal-opened" : "modal-closed"}`}
      >
        <div className="modal-card">{SetModalData(modalType)}</div>
      </div>
    </>
  );
};

export const SetModalData = (modalType: string) => {
  const dispatch = useDispatch();
  switch (modalType) {
    case "EditProfile":
      return <EditProfile />;

    case "CreatePostsCard":
      return <CreatePost />;
    default:
      dispatch(closeModal());
      return null;
  }
};
