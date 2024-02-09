import { useState, useContext } from "react";
import { ContextList } from "./DataContext";

const addToLocalStorage = (item) => {
  localStorage.setItem("todoStorageList", JSON.stringify(item));
};

// eslint-disable-next-line react/prop-types
function Btn({ todo, delBtnTxt, delBtnHandler, editBtnTxt }) {
  const [tList, setTList] = useContext(ContextList);

  const [done, setDone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [bg, setBg] = useState("ready");

  const [editInput, setEditInput] = useState(todo);

  // EVENTS
  const editBtnHandler = () => {
    setShowEdit(true);
    console.log("edit");
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

    // JUST FOR TEST
    // console.log(tList);
    // console.log(update);
    // console.log(editInput);
  };

  return (
    <>
      <div className="item-card">
        <div className={bg}>
          <span className="text-span"> {editInput.item} </span>
          <input
            type="checkbox"
            onChange={(e) => {
              setDone(e.target.checked);
              done ? setBg("ready") : setBg("complete");
            }}
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
