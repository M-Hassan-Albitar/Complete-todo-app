import { useState } from "react";
import { nanoid } from "nanoid";
import TaskModel from "./TaskModel";

import { ContextList } from "./DataContext";

const addToLocalStorage = (item) => {
  localStorage.setItem("todoStorageList", JSON.stringify(item));
};

function AddForm() {
  const getFromLocalStorage =
    JSON.parse(localStorage.getItem("todoStorageList")) || [];
  const [taskList, setTaskList] = useState(getFromLocalStorage);

  const [task, setTask] = useState({
    id: "",
    item: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (task.item !== "") {
      setTaskList([...taskList, task]);
      addToLocalStorage([...taskList, task]);
      setTask({ item: "" });
      console.log("ok");
    } else {
      alert("Can not be empty!");
    }
  };

  const deleteHandler = (taskId) => {
    const newList = taskList.filter((t) => {
      if (t.id !== taskId) {
        return t;
      }
    });
    setTaskList(newList);
    addToLocalStorage(newList);
  };

  return (
    <>
      <ContextList.Provider value={[taskList, setTaskList]}>
        <form
          className="main-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>TODO LIST</h2>
          <hr />
          <div className="add-container">
            <input
              placeholder="type task here!"
              type="text"
              value={task.item}
              onChange={(e) => {
                setTask({ ...task, item: e.target.value, id: nanoid() });
              }}
            />

            <input
              className="add-btn"
              type="button"
              value="ADD"
              onClick={handleAdd}
            />
          </div>

          {taskList.map((t) => {
            return (
              <div key={t.id}>
                <TaskModel
                  todo={{ ...t }}
                  delBtnTxt="delete"
                  delBtnHandler={() => {
                    deleteHandler(t.id);
                  }}
                  editBtnTxt="edit"
                />
              </div>
            );
          })}
        </form>
      </ContextList.Provider>
    </>
  );
}

export default AddForm;
