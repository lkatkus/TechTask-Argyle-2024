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

export const useModal = (
  content: JSX.Element,
  options: { label: string }
): ReturnProps => {
  const { label } = options;

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
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-lg p-6 max-w-[90%] md:max-w-2xl w-full max-h-[90vh] grid gap-4 grid-cols-1 grid-rows-[min-content_1fr]"
      >
        <div className="absolute right-0 top-0 m-2">
          <Button variant="secondary" onClick={handleHideModal}>
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{label}</h2>
        </div>

        <div className="overflow-auto">{content}</div>
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
