/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { ContextList } from "./DataContext";
import { ToastContext } from "./ToastContext";

const addToLocalStorage = (item) => {
  localStorage.setItem("todoStorageList", JSON.stringify(item));
};

// eslint-disable-next-line react/prop-types
function Btn({ todo, delBtnTxt, delBtnHandler, editBtnTxt }) {
  const [tList, setTList] = useContext(ContextList);
  const { handleToast } = useContext(ToastContext);

  const [showEdit, setShowEdit] = useState(false);

  const [editInput, setEditInput] = useState(todo);

  // EVENTS
  const editBtnHandler = () => {
    setShowEdit(true);
    console.log("edit");
  };

  const handleIsCompleted = (e) => {
    const update = tList.map((td) => {
      if (td.id === editInput.id) {
        return { ...editInput, isComplete: e.target.checked };
      } else {
        return td;
      }
    });
    setTList(update);
    addToLocalStorage(update);
  };

  const handleEditTask = () => {
    // JUST FOR TEST
    // [...tList, { ...editInput, item: editInput.item }];
    const update = tList.map((td) => {
      if (td.id === editInput.id) {
        return { ...editInput, item: editInput.item };
      } else {
        return td;
      }
    });

    // Update Local storage
    setTList(update);
    addToLocalStorage(update);

    setShowEdit(false);
    handleToast("Edit Success !");
  };

  return (
    <>
      <div className="item-card">
        <div className={todo.isComplete ? "complete" : "ready"}>
          <span className="text-span"> {editInput.item} </span>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={handleIsCompleted}
          />
          <input
            className="delete-btn"
            type="button"
            value={delBtnTxt}
            onClick={delBtnHandler}
          />
          <input
            className="edit-btn"
            type="button"
            value={editBtnTxt}
            onClick={editBtnHandler}
          />
        </div>
      </div>
      {/* Edit mode */}
      {showEdit && (
        <div className="edit-container">
          <input
            type="text"
            value={editInput.item}
            onChange={(e) => {
              setEditInput({ ...editInput, item: e.target.value });
            }}
          />

          <button className="confirm-btn" onClick={handleEditTask}>
            confirm
          </button>

          <button
            className="close-btn"
            onClick={() => {
              setShowEdit(false);
            }}
          >
            close
          </button>
        </div>
      )}
    </>
  );
}

export default Btn;
