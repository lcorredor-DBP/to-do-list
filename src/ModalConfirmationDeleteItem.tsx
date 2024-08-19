import React, { FC } from "react";

interface ModalConfirmationDeleteItemProps {
  onClose: () => void;
  index: number | null;
  onDelete: () => void;
}

const ModalConfirmationDeleteItem: FC<ModalConfirmationDeleteItemProps> = ({
  onClose,
  index,
  onDelete,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center px-3 md:px-0"
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
              Delete Item
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
          <p className="text-black font-medium text-xl text-center">Are you sure to delete the item list?</p>
        </div>

        <div className="w-full flex justify-center gap-3">
          <button
            className="bg-neutral-50 border text-sm font-medium rounded px-4 py-2 text-gray-700 hover:bg-neutral-100 transition ease-in"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 border-red-600 border text-sm font-medium rounded px-4 py-2 text-white hover:bg-red-400 transition ease-in"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmationDeleteItem;
