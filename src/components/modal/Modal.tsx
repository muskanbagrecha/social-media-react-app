import "./Modal.css";
import PropTypes, { InferProps } from "prop-types";

export function Modal({
  onReset,
  children,
}: InferProps<typeof Modal.propTypes>) {
  return (
    <>
      <div className="backdrop" onClick={onReset} />
      <div className="modal">{children}</div>
    </>
  );
}

Modal.propTypes = {
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node,
};
