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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ padding: 32, margin: 64, backgroundColor: "white" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
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
