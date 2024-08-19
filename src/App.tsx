import React, { useState } from "react";
import "./App.css";
import ModalNewItem from "./ModalNewItem";
import ModalConfirmationDeleteItem from "./ModalConfirmationDeleteItem";
import Toast from "./Toast";

interface Task {
  text: string;
  completed: boolean;
  createdAt: string;
  editedAt?: string;
}

function App(): React.ReactElement | null {
  const [openModalNewItem, setOpenModalNewItem] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModalConfirmationDelete, setOpenModalConfirmationDelete] =
    useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageAction, setMessageAction] = useState<string>("");

  const handleOpenModalNewItem = () => {
    setOpenModalNewItem(!openModalNewItem);
  };

  const handleOpenMoreAction = (index: number) => {
    setActiveItemIndex(index);
  };

  const handleOpenCloseAction = () => {
    setActiveItemIndex(null);
  };

  const handleOpenModalConfirmationDelete = (index: number) => {
    setActiveItemIndex(index);
    setOpenModalConfirmationDelete(!openModalNewItem);
  };

  const handleOpenModalEditItem = (
    text: string,
    createdAt: string,
    index: number
  ) => {
    setEditItem({ text, createdAt, completed: false });
    setIsEditing(true);
    handleOpenModalNewItem();
    setActiveItemIndex(index);
  };

  const handleCloseMoreAction = () => {
    setActiveItemIndex(null);
  };

  const handleDeleteItem = () => {
    setTasks(tasks.filter((_, i) => i !== activeItemIndex));
    handleCloseMoreAction();
    setOpenModalConfirmationDelete(false);
    setShowToast(true);
    setMessageAction("Item deleted successfully");
  };

  const handleSaveItem = (newText: string, index?: number) => {
    if (isEditing) {
      setTasks(
        tasks.map((task, i) =>
          i === index
            ? {
                ...task,
                text: newText,
                editedAt: new Date().toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }),
              }
            : task
        )
      );
      setIsEditing(false);
      setEditItem(null);
      setShowToast(true);
      setMessageAction("Item edited successfully");
    } else {
      if (newText.trim() !== "") {
        const now = new Date();
        const formattedDate = `${String(now.getMonth() + 1).padStart(
          2,
          "0"
        )}/${String(now.getDate()).padStart(2, "0")}/${String(
          now.getFullYear()
        ).slice(-2)} - ${String(now.getHours()).padStart(2, "0")}:${String(
          now.getMinutes()
        ).padStart(2, "0")}`;

        setTasks([
          ...tasks,
          { text: newText, completed: false, createdAt: formattedDate },
        ]);
        setShowToast(true);
        setMessageAction("Item created successfully");
      }
    }
    setIsEditing(false);
    setEditItem(null);
    setOpenModalNewItem(false);
  };

  const handleCheckboxChange = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
    setActiveItemIndex(null);
  };

  return (
    <div className="w-full py-5 md:px-0 px-4">
      <div className="w-full md:w-1/2 mx-auto py-12 bg-white bg-img flex items-center justify-center gap-2 border-b border-gray-200">
        <h2 className="text-xl md:text-lg leading-5 font-semibold text-gray-900 text-center">
          To do List
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 text-blue-600 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="w-full md:w-1/2 flex mx-auto py-4 md:px-0 px-2">
        <div className="w-1/2">
          <p className="text-sm font-medium my-auto py-2">
            {tasks.length} items in the list
          </p>
        </div>

        <div className="w-1/2 flex justify-end">
          <button
            className="rounded bg-green-600 border-green-600 hover:bg-green-500 transition ease-in text-white font-medium py-2 px-3 text-sm gap-2 flex"
            onClick={handleOpenModalNewItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 my-auto"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            New item
          </button>
        </div>
      </div>

      {openModalNewItem && (
        <ModalNewItem
          onClose={() => setOpenModalNewItem(false)}
          onSave={handleSaveItem}
          editItem={editItem}
          isEditing={isEditing}
          index={activeItemIndex}
        />
      )}

      {openModalConfirmationDelete && (
        <ModalConfirmationDeleteItem
          onClose={() => setOpenModalConfirmationDelete(false)}
          index={activeItemIndex}
          onDelete={() => handleDeleteItem()}
        />
      )}

      {showToast && (
        <Toast
          message={messageAction}
          onClose={() => setShowToast(false)}
          duration={1000}
        />
      )}

      {tasks.length ? (
        <div className="w-full md:w-1/2 max-h-[500px] overflow-y-auto mx-auto py-2 px-4 space-y-3">
          {tasks
            .sort((a, b) =>
              a.completed === b.completed ? 0 : a.completed ? 1 : -1
            )
            .map((task, index) => (
              <div
                key={index}
                className={`w-full shadow-sm transition ease-in ${
                  task.completed ? "bg-gray-200" : "bg-white"
                } rounded border p-4 flex`}
              >
                <div className="w-[10%] md:w-[5%] flex items-center">
                  <div className="flex gap-4 justify-start w-full my-auto items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      className="hidden"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className={`h-5 w-5 my-auto group flex items-center justify-center cursor-pointer border-2 ${
                        task.completed
                          ? "border-green-600 bg-green-600"
                          : "border-gray-600 bg-white"
                      } rounded-[4px]`}
                    >
                      {task.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-3 h-3 text-white stroke-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                </div>

                <div className="w-[70%] md:w-[75%]">
                  <p
                    className={`text-md font-medium text-gray-700 max-w-[90%] ${
                      task.completed ? "line-through" : "no-underline"
                    }`}
                  >
                    {task.text}
                  </p>
                  <div className="text-xs text-gray-400 font-medium">
                    {task.editedAt
                      ? `Edited: ${task.editedAt}`
                      : ` Created: ${task.createdAt}`}
                  </div>
                </div>

                <div className="w-1/5 flex justify-end items-center">
                  {activeItemIndex === index ? (
                    <div className="flex gap-2 f-git items-center">
                      <button
                        onClick={() => handleOpenModalConfirmationDelete(index)}
                        className="flex gap-2 text-black border p-2 text-xs transition ease-in hover:bg-red-400 hover:border-red-600 hover:text-white bg-neutral-100 border-neutral-300 rounded-full items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-3 w-3 my-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>

                      {!task.completed && (
                        <button
                          onClick={() =>
                            handleOpenModalEditItem(
                              task.text,
                              task.createdAt,
                              index
                            )
                          }
                          className="flex gap-2 text-black border p-2 text-xs transition ease-in hover:bg-blue-400 hover:border-blue-600 hover:text-white bg-neutral-100 border-neutral-300 rounded-full items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-3 w-3 my-auto"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenCloseAction()}
                        className="flex gap-2 text-black border p-2 text-xs transition ease-in hover:bg-black hover:border-gray-700 hover:text-white bg-neutral-100 border-neutral-300 rounded-full items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-3 w-3 my-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="border px-4 py-2 text-xs text-black bg-neutral-100 border-neutral-300 rounded"
                      onClick={() => handleOpenMoreAction(index)}
                    >
                      Actions
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full md:px-0 md:w-1/2 border bg-gray-100 p-12 rounded mx-auto mt-0 items-center justify-center flex flex-col space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-center text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <h4 className="text-center text-lg font-medium text-gray-600">
            No tasks available. Add some tasks to your list.
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
