/* eslint-disable react/prop-types */
function ToastInfo({ show, message }) {
  return (
    <div style={{ display: show ? "block" : "none" }} className="toast-info">
      {message}
    </div>
  );
}

export default ToastInfo;
