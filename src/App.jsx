import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import useLocalStorage from './Hooks/useLocalStorage';
import useEvent from './Hooks/useEvent';

import Board from './Components/Board';
import css from './App.module.css';

import { getNewPosition, isExist } from './utils';

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

  const [isWon, setIsWon] = useLocalStorage('isWon', false);
  const [newGame, setNewGame] = useLocalStorage('newGame', true);

  const [data, setData] = useLocalStorage('data', INITIAL_DATA);

  const [best, setBest] = useLocalStorage('best', 0);
  const [score, setScore] = useLocalStorage('score', 0);
  const [scoreHistory, setScoreHistory] = useLocalStorage('scoreHistory', []);

  // initalize function when game starts
  const initializeBoard = () => {
    let newArray = cloneDeep(data);
    addNumber(newArray);
    addNumber(newArray);
    setData(newArray);
    setNewGame(false);
  };

  const addNumber = (newArray) => {
    let [rand1, rand2] = getNewPosition(newArray);
    while (newArray[rand1][rand2] !== 0) {
      [rand1, rand2] = getNewPosition(newArray);
    }
    newArray[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
  };

  const swipeLeft = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('Congrats');
      return;
    }

    for (let i = 0; i < 4; i++) {
      let s = 0;
      let f = 1;
      let currRow = newArray[i];
      while (s < 4 && f < 4) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f++;
          continue;
        }
        if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s + 1;
          continue;
        }
        if (currRow[f] !== 0 && currRow[s] !== 0) {
          if (currRow[f] === currRow[s]) {
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

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
      } else addNumber(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('Game over');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const swipeRight = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('Congrats');
      return;
    }

    for (let i = 0; i < 4; i++) {
      let s = 3;
      let f = 2;
      let currRow = newArray[i];
      while (s >= 0 && f >= 0) {
        if (
          (currRow[s] === 0 && currRow[f] === 0) ||
          (currRow[s] !== 0 && currRow[f] === 0)
        ) {
          f--;
          continue;
        }
        if (currRow[s] === 0 && currRow[f] !== 0) {
          currRow[s] = currRow[f];
          currRow[f] = 0;
          f = s - 1;
          continue;
        }
        if (currRow[f] !== 0 && currRow[s] !== 0) {
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

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
      } else addNumber(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('Game over');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const swipeUp = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('Congrats');
      return;
    }

    for (let i = 0; i < 4; i++) {
      let s = 0;
      let f = 1;
      while (s < 4 && f < 4) {
        if (
          (newArray[s][i] === 0 && newArray[f][i] === 0) ||
          (newArray[s][i] !== 0 && newArray[f][i] === 0)
        ) {
          f++;
          continue;
        }
        if (newArray[s][i] === 0 && newArray[f][i] !== 0) {
          newArray[s][i] = newArray[f][i];
          newArray[f][i] = 0;
          f = s + 1;
          continue;
        }
        if (newArray[f][i] !== 0 && newArray[s][i] !== 0) {
          if (newArray[f][i] === newArray[s][i]) {
            newArray[s][i] += newArray[f][i];
            setScore(score + newArray[s][i]);
            newArray[f][i] = 0;
          }
          s++;
          f = s + 1;
          continue;
        }
      }
    }

    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
      } else addNumber(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('Game over');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const swipeDown = (isMove = true) => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    if (isWon) {
      alert('Congrats');
      return;
    }
    for (let i = 3; i >= 0; i--) {
      let s = 3;
      let f = 2;
      while (s >= 0 && f >= 0) {
        if (
          (newArray[s][i] === 0 && newArray[f][i] === 0) ||
          (newArray[s][i] !== 0 && newArray[f][i] === 0)
        ) {
          f--;
          continue;
        }
        if (newArray[s][i] === 0 && newArray[f][i] !== 0) {
          newArray[s][i] = newArray[f][i];
          newArray[f][i] = 0;
          f = s - 1;
          continue;
        }
        if (newArray[f][i] !== 0 && newArray[s][i] !== 0) {
          if (newArray[f][i] === newArray[s][i]) {
            newArray[s][i] += newArray[f][i];
            newArray[f][i] = 0;
            setScore(score + newArray[s][i]);
          }
          s--;
          f = s - 1;
          continue;
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      if (isExist(newArray, 2048)) {
        setIsWon(true);
        setData(newArray);
      } else addNumber(newArray);
    } else if (!isExist(oldGrid) && isMove && checkGameOver()) {
      alert('Game over');
    }

    if (isMove) {
      setData(newArray);
    } else return newArray;
  };

  const handleKeys = (event) => {
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
    }
  };

  const checkGameOver = () => {
    if (JSON.stringify(data) !== JSON.stringify(swipeLeft(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeRight(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeUp(false))) {
      return false;
    } else if (JSON.stringify(data) !== JSON.stringify(swipeDown(false))) {
      return false;
    } else return true;
  };

  // Reset, New Game
  const onClickNewGame = () => {
    setScoreHistory([...scoreHistory, score]);
    // setMoveHistory([]);
    // setUndoMoves([]);
    setIsWon(false);
    setNewGame(true);
    setScore(0);
    setData(INITIAL_DATA);
  };

  useEffect(() => {
    if (newGame) {
      initializeBoard();
    }
  }, [newGame]);

  useEffect(() => {
    setBest(Math.max(...scoreHistory, score));
  }, [score]);

  useEvent('keydown', handleKeys);

  return (
    <div className={css.container}>
      <Board data={data} score={score} best={best} resetGame={onClickNewGame} />
    </div>
  );
}

export default App;
