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
    isComplete: "",
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

  // FILTERS

  

  // const completedToDos = taskList.filter((t) => {
  //   return t.isComplete === true;
  // });

  // const notCompletedToDos = taskList.filter((t) => {
  //   return t.isComplete === false;
  // });

  // const allToDos = taskList.map((t) => {
  //   return t;
  // })

  

  // const filterHandle = (e) => {
  //   if (e.target.name === "done") {
      
  //     console.log("done")
  //   } else if (e.target.name === "notDone") {
      
  //     console.log("not")
  //   } else {
      
  //     console.log("all")
  //   }
  // };

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

          {/* <div className="filter-btns">
            <button name="done" onClick={filterHandle}> Done </button>
            <button name="notDone" onClick={filterHandle}> Not Done </button>
            <button name="all" onClick={filterHandle}> All </button>
          </div> */}

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
