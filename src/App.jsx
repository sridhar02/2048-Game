import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import useLocalStorage from './Hooks/useLocalStorage';
import useEvent from './Hooks/useEvent';

import Board from './Components/Board';

import css from './App.module.css';

const getNewPosition = () => {
  const rowPosition = Math.floor(Math.random() * 4);
  const colPosition = Math.floor(Math.random() * 4);
  return [rowPosition, colPosition];
};

function App() {
  const UP = 38;
  const DOWN = 40;
  const LEFT = 37;
  const RIGHT = 39;

  const INITIAL_DATA = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const [best, setBest] = useState(0);
  const [score, setScore] = useState(0);
  const [stop, setStop] = useState(true);
  const [restart, setRestart] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);

  // // Initalize
  // const initalize = () => {
  //   let newGrid = cloneDeep(data);
  //   console.log([...data] === newGrid);
  //   console.log(newGrid);
  //   addItem(newGrid);
  //   addItem(newGrid);
  //   setData(newGrid);
  //   // console.log(data);
  //   // setNewGame(false);
  // };

  // Add item
  const addItem = (newData) => {
    while (true) {
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (newData[row][col] !== 0) continue;
      newData[row][col] = Math.random() > 0.5 ? 2 : 4;
      break;
    }
  };

  // Swipe Right, left , up , and Down
  const swipeLeft = () => {
    let newData = cloneDeep(data);
    for (let i = 0; i < 4; i++) {
      let s = 0,
        f = 1;
      let currRow = newData[i];
      while (s < 4 && f < 4) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f++;
          continue;
        } else if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s + 1;
          continue;
        } else if (currRow[s] !== 0 && currRow[f] !== 0) {
          if (currRow[s] === currRow[f]) {
            currRow[s] += currRow[f];
            setScore(score + currRow[s]);
            currRow[f] = 0;
          }
          s++;
          f = s + 1;
          continue;
        }
      }
    }
    addItem(newData);
    setData(newData);
  };

  const swipeRight = () => {
    let oldGrid = data;
    let newData = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let s = 3,
        f = 2;
      let currRow = newData[i];
      while (s >= 0 && f >= 0) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f--;
          continue;
        } else if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s - 1;
          continue;
        } else if (currRow[s] !== 0 && currRow[f] !== 0) {
          if (currRow[f] === currRow[s]) {
            currRow[s] += currRow[f];
            setScore(score + currRow[s]);
            currRow[f] = 0;
          }
          s--;
          f = s - 1;
          continue;
        }
      }
    }
    addItem(newData);
    setData(newData);
  };

  const swipeUp = () => {
    let newData = cloneDeep(data);
    for (let i = 0; i < 4; i++) {
      let s = 0,
        f = 1;
      let currRow = newData[i];
      while (s < 4 && f < 4) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f++;
          continue;
        } else if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s + 1;
          continue;
        } else if (currRow[s] !== 0 && currRow[f] !== 0) {
          if (currRow[s] === currRow[f]) {
            currRow[s] += currRow[f];
            setScore(score + currRow[s]);
            currRow[f] = 0;
          }
          s++;
          f = s + 1;
          continue;
        }
      }
    }
    addItem(newData);
    setData(newData);
  };

  const swipeDown = () => {
    let oldGrid = data;
    let newData = cloneDeep(data);

    for (let i = 0; i < 4; i++) {
      let s = 3,
        f = 2;
      let currRow = newData[i];
      while (s >= 0 && f >= 0) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f--;
          continue;
        } else if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s - 1;
          continue;
        } else if (currRow[s] !== 0 && currRow[f] !== 0) {
          if (currRow[f] === currRow[s]) {
            currRow[s] += currRow[f];
            currRow[f] = 0;
            setScore(score + currRow[s]);
          }
          s--;
          f = s - 1;
          continue;
        }
      }
    }
    addItem(newData);
    setData(newData);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP:
        swipeUp();
        break;
      case DOWN:
        swipeDown();
        break;
      case LEFT:
        swipeLeft();
        break;
      case RIGHT:
        swipeRight();
        break;
      default:
        break;
    }
  };

  const checkEnd = () => {
    if (!stop) return;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i - 1 >= 0 && data[i][j] === data[i - 1][j]) return true;
        if (i + 1 <= 3 && data[i][j] === data[i + 1][j]) return true;
        if (j - 1 >= 0 && data[i][j] === data[i][j - 1]) return true;
        if (j + 1 <= 3 && data[i][j] === data[i][j + 1]) return true;
      }
    }
    setStop(false);
    return false;
  };

  const checkPosibility = () => {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (data[i][j] !== 0) {
        } else return true;
    return false;
  };

  const addNumber = (newData) => {
    if (!stop) {
      if (localStorage.getItem('best') < score) {
        localStorage.setItem('best', score);
      }
      return;
    }
    if (!checkPosibility()) {
      if (!checkEnd()) {
        alert('Game Over');
        setStop(false);
        if (localStorage.setItem('best', score) < score) {
          localStorage.setItem('best', score);
        }
        return;
      }
      return;
    }

    while (true) {
      let row = Math.floor(Math.random() * 4);
      let col = Math.floor(Math.random() * 4);
      if (newData[row][col] !== 0) continue;
      newData[row][col] = Math.random() > 0.5 ? 2 : 4;
      break;
    }
  };
  const initializeBoard = () => {
    let newData = cloneDeep(data);
    setStop(true);
    addNumber(newData);
    addNumber(newData);
    setData(newData);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEvent('keydown', handleKeyDown);

  return (
    <div className={css.container}>
      <Board data={data} score={score} />
    </div>
  );
}

export default App;
