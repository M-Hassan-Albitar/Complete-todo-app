import { useState } from "react";
import { nanoid } from "nanoid";
import TaskModel from "./TaskModel";

import { ContextList } from "./DataContext";
import { useToast } from "./ToastContext";

const addToLocalStorage = (item) => {
  localStorage.setItem("todoStorageList", JSON.stringify(item));
};

function AddForm() {
  const handleToast = useToast();

  const getFromLocalStorage =
    JSON.parse(localStorage.getItem("todoStorageList")) || [];
  const [taskList, setTaskList] = useState(getFromLocalStorage);

  const [task, setTask] = useState({
    id: "",
    item: "",
    isComplete: "",
  });

  //EVENTS

  const handleAdd = (e) => {
    e.preventDefault();
    if (task.item !== "") {
      setTaskList([...taskList, task]);
      addToLocalStorage([...taskList, task]);
      setTask({ item: "" });
      handleToast("Add Success!");
      // console.log("ok");
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
    handleToast("Deleted !");
  };

  // FILTERS

  const completedToDos = getFromLocalStorage.filter((t) => {
    if (t.isComplete === true) {
      return t;
    }
  });

  const notCompletedToDos = getFromLocalStorage.filter((t) => {
    if (t.isComplete === false) {
      return t;
    }
  });

  const allToDos = getFromLocalStorage.map((t) => {
    return t;
  });

  const filterHandle = (e) => {
    if (e.target.name === "done") {
      setTaskList(completedToDos);
      // console.log("done");
    } else if (e.target.name === "notDone") {
      setTaskList(notCompletedToDos);
      // console.log("not");
    } else {
      setTaskList(allToDos);
      // console.log("all");
    }
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
                setTask({
                  ...task,
                  item: e.target.value,
                  id: nanoid(),
                  isComplete: false,
                });
              }}
            />

            <input
              className="add-btn"
              type="button"
              value="ADD"
              onClick={handleAdd}
            />
          </div>

          <div className="filter-btns">
            <button name="done" onClick={filterHandle}>
              {" "}
              Done{" "}
            </button>
            <button name="notDone" onClick={filterHandle}>
              {" "}
              Not Done{" "}
            </button>
            <button name="all" onClick={filterHandle}>
              {" "}
              All{" "}
            </button>
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
