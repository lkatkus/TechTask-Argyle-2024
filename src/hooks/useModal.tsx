import React from "react";
import { createPortal } from "react-dom";

interface ReturnProps {
  showModal: () => void;
  hideModal: () => void;
  Modal: () => JSX.Element | null;
}

export const useModal = (content: JSX.Element): ReturnProps => {
  const [show, setShow] = React.useState(false);

  const handleOpenModal = () => {
    setShow(true);

    document.body.style.overflow = "hidden";
  };

  const handleHideModal = () => {
    setShow(false);

    document.body.style.overflow = "";
  };

  const modalContent = (
    <div
      onClick={handleHideModal}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button onClick={handleHideModal}>Close</button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );

  return {
    showModal: handleOpenModal,
    hideModal: handleHideModal,
    Modal: () => {
      return show
        ? createPortal(modalContent, document.getElementById("modal-root")!)
        : null;
    },
  };
};
