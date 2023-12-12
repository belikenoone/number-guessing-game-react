import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(() => {
    const generatedNumber = Math.floor(Math.random() * 100) + 1;
    console.log("Generated random number:", generatedNumber);
    return generatedNumber;
  });
  const [userValue, setUserValue] = useState("");
  const [infoText, setInfoText] = useState("");
  const [tries, setTries] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [triesAnimate, setTriesAnimate] = useState(null);
  const [infoTextAnimate, setInfoTextAnimate] = useState(null);

  useEffect(() => {
    setTriesAnimate("scale-125");
    setInfoTextAnimate("tracking-[3px]");
    const timeoutId = setTimeout(() => {
      setTriesAnimate(null);
      setInfoTextAnimate(null);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [tries, infoText]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (
      isNaN(+userValue) ||
      userValue === "" ||
      +userValue > 100 ||
      +userValue < 1
    ) {
      setInfoText("Please Enter Something valid");
      return;
    }
    setTries((prev) => prev - 1);
    if (+userValue > randomNumber) {
      setInfoText("Guessed Number is greater");
    }
    if (+userValue < randomNumber) {
      setInfoText("Guessed Number is smaller");
    }
    if (+userValue === randomNumber) {
      setInfoText("Yeahh! You guessed it");
      setShowModal(true);
      setModalText("Yeahhh!! You;ve guessed it");
    }
    if (tries < 2) {
      setShowModal(true);
      setModalText("No tries left!!");
    }
  };
  const playAgain = () => {
    setShowModal(false);
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setTries(10);
    setUserValue("");
    setInfoText("");
  };
  return (
    <>
      {showModal && <Modal playAgain={playAgain} modalText={modalText} />}
      <div className="h-[100svh] bg-gray-800 flex justify-center items-center ">
        <div className="bg-white rounded-lg shadow-md p-10 flex flex-col justify-center gap-4 relative">
          <h2 className="text-xl font-bold mb-4">Guess the Number</h2>
          <div className="flex flex-col mb-4 gap-4">
            <label htmlFor="guess" className="mb-2">
              Enter a number between 1 and 100:
            </label>
            <input
              id="guess"
              className="rounded-md border p-2 outline-blue-500 focus:outline-blue-900 "
              type="text"
              value={userValue}
              inputMode="numeric"
              onChange={(e) => setUserValue(e.target.value)}
              autoComplete="off"
            />
            {infoText && (
              <p
                className={`mt-4 text-gray-700 transition-all ${infoTextAnimate}`}
              >
                {infoText}
              </p>
            )}

            <span
              className={`absolute top-5 right-5 flex justify-center items-center ${
                tries > 4 ? "bg-green-600" : "bg-red-600"
              } py-4 px-4 rounded-full h-5 w-5 text-white transition-transform  ${triesAnimate}`}
            >
              {tries}
            </span>

            <div className="flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-600 transition-colors py-3 px-4 rounded-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 transition-colors py-3 px-4 rounded-md"
                onClick={playAgain}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
