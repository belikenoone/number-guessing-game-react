import React from "react";

const Modal = ({ playAgain, setShowModal, modalText, setModalText }) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-[rgba(0,0,0,0.5)] grid place-items-center">
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-center gap-4 md:w-10/12 w-1/2 mx-auto">
        <span className="text-4xl font-bold text-center">{modalText}</span>
        <button
          className="bg-red-500 hover:bg-red-600 transition-colors py-3 px-4 rounded-md"
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
