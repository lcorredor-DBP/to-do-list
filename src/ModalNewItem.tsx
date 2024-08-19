import React, { FC, useEffect, useState } from "react";

interface ModalNewItemProps {
  onClose: () => void;
  onSave: (itemName: string, index?: number) => void;
  editItem: { text: string; createdAt: string; completed: boolean } | null;
  isEditing: boolean;
  index: number | null;
}

const ModalNewItem: FC<ModalNewItemProps> = ({
  onClose,
  onSave,
  editItem,
  isEditing,
  index,
}) => {
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    if (isEditing && editItem) {
      setItemName(editItem.text);
    } else {
      setItemName("");
    }
  }, [editItem, isEditing]);

  const handleSave = () => {
    if (itemName.trim()) {
      onSave(itemName, index === null ? undefined : index);
      setItemName("");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center md:px-0 px-3"
      onClick={onClose}
    >
      <div
        className="w-full md:w-1/2 bg-white rounded-xl border p-7"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex">
          <div className="w-1/2 flex justify-start">
            <h1 className="text-black font-medium text-lg">
              {isEditing ? "Edit Item" : "New Item"}
            </h1>
          </div>

          <div className="w-1/2 flex justify-end">
            <button
              className="p-2 rounded-full text-black border border-gray-400 transition ease-in hover:bg-black hover:text-white hover:border-black"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 mt-4 py-4 space-y-2">
          <span className="text-black font-medium text-sm">Item name</span>
          <input
            type="text"
            name="item-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="px-3 py-4 w-full border rounded-lg bg-neutral-50 placeholder:text-gray-500 text-sm font-normal"
            placeholder="Enter task name"
          />
        </div>

        <div className="w-full flex justify-end gap-3">
          <button
            className="bg-neutral-50 border text-sm font-medium rounded px-4 py-2 text-gray-700 hover:bg-neutral-100 transition ease-in"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`${
              itemName.trim() ? "bg-green-600 hover:bg-green-400" : "bg-gray-400 cursor-not-allowed"
            } border text-sm font-medium rounded px-4 py-2 text-white transition ease-in`}
            onClick={handleSave}
            disabled={!itemName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewItem;
