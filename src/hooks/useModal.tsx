import React from "react";
import { createPortal } from "react-dom";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components";

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
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg w-full "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-0 top-0 m-2">
          <Button variant="secondary" onClick={handleHideModal}>
            <FontAwesomeIcon icon={faClose} />
          </Button>
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
