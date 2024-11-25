import { createSignal, onMount, Show, For } from "solid-js";

const colors: string[] = ["red", "orange", "yellow", "blue", "white", "green"];

import "./App.css";

const App = () => {
  const [squareContainer, setSquareContainer] = createSignal<string[]>([]);
  const [gameBoard, setGameBoard] = createSignal<string[]>([]);
  const [selectedSquare, setSelectedSquare] = createSignal<number | null>(null);
  const [timer, setTimer] = createSignal(0);
  const [isRunning, setIsRunning] = createSignal(false);

  onMount(() => {
    console.log("App mounted");
    const shuffleSquareContainer = () => {
      const newSquareContainer = [];
      for (let i = 0; i < 9; i++) {
        newSquareContainer.push(
          colors[Math.floor(Math.random() * colors.length)]
        );
      }
      setSquareContainer(newSquareContainer);
    };

    const shuffleGameBoard = () => {
      const newGameBoard = [];
      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          newGameBoard.push("empty");
        } else {
          newGameBoard.push(colors[Math.floor(Math.random() * colors.length)]);
        }
      }
      setGameBoard(newGameBoard);
      console.log("Game board:", gameBoard());
      setSelectedSquare(12);
    };

    shuffleSquareContainer();
    shuffleGameBoard();
  });

  const handleGameBoardClick = (index: number) => {
    setSelectedSquare(index);
  };

  const handleKeyPress = (event: any) => {
    if (isRunning()) {
      const newGameBoard = [...gameBoard()];
      const emptyIndex = newGameBoard.indexOf("empty");
      const selectedSquareIndex = selectedSquare();

      if (selectedSquareIndex === null) {
        return;
      }

      switch (event.key) {
        case "w":
          if (selectedSquareIndex > 4) {
            const temp = newGameBoard[selectedSquareIndex];
            newGameBoard[selectedSquareIndex] =
              newGameBoard[selectedSquareIndex - 5];
            newGameBoard[selectedSquareIndex - 5] = temp;
            setGameBoard(newGameBoard);
            setSelectedSquare(selectedSquareIndex - 5);
          }
          break;
        case "a":
          if (selectedSquareIndex % 5 !== 0) {
            const temp = newGameBoard[selectedSquareIndex];
            newGameBoard[selectedSquareIndex] =
              newGameBoard[selectedSquareIndex - 1];
            newGameBoard[selectedSquareIndex - 1] = temp;
            setGameBoard(newGameBoard);
            setSelectedSquare(selectedSquareIndex - 1);
          }
          break;
        case "s":
          if (selectedSquareIndex < 20) {
            const temp = newGameBoard[selectedSquareIndex];
            newGameBoard[selectedSquareIndex] =
              newGameBoard[selectedSquareIndex + 5];
            newGameBoard[selectedSquareIndex + 5] = temp;
            setGameBoard(newGameBoard);
            setSelectedSquare(selectedSquareIndex + 5);
          }
          break;
        case "d":
          if (selectedSquareIndex % 5 !== 4) {
            const temp = newGameBoard[selectedSquareIndex];
            newGameBoard[selectedSquareIndex] =
              newGameBoard[selectedSquareIndex + 1];
            newGameBoard[selectedSquareIndex + 1] = temp;
            setGameBoard(newGameBoard);
            setSelectedSquare(selectedSquareIndex + 1);
          }
          break;
      }
    }
  };

  const handleResetButton = () => {
    const shuffleGameBoard = () => {
      const newGameBoard = [];
      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          newGameBoard.push("empty");
        } else {
          newGameBoard.push(colors[Math.floor(Math.random() * colors.length)]);
        }
      }
      setGameBoard(newGameBoard);
      setSelectedSquare(12);
    };

    shuffleGameBoard();
    setIsRunning(false);
    setTimer(0);
  };

  return (
    <div class="container">
      <div id="square-container" class="square-container-inner">
        <For each={squareContainer()}>
          {(color) => (
            <div
              class={`square ${color}`}
              style={`background-color: ${color};`}
            />
          )}
        </For>
      </div>
      <div class="game-board">
        <div id="game-board" class="game-board-inner">
          <For each={gameBoard()}>
            {(color, index) => {
              console.log(`Rendering square ${index()} with color ${color}`);
              return (
                <div
                  class={`square ${color} ${
                    selectedSquare() === index() ? "selected" : ""
                  }`}
                  style={`background-color: ${color};`}
                  onClick={() => handleGameBoardClick(index())}
                />
              );
            }}
          </For>
        </div>
        <button id="reset-button" onClick={handleResetButton}>
          Reset
        </button>
      </div>
      <div class="timer">
        <Show when={isRunning()}>
          <p id="timer-text">Time: {timer()}s</p>
        </Show>
      </div>
    </div>
  );
};

export default App;
