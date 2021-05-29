import React from 'react';
import css from './Header.module.css';

export default function Header({ score, best, onClickNewGame }) {
  return (
    <div className={css.header}>
      <div className={css.subHeader}>
        <h1 className={css.title}>2048</h1>
        <div className={css.subHeader2}>
          <div className={css.box}>
            <span>SCORE</span>
            <span>{score}</span>
          </div>
          <div className={css.box}>
            <span>BEST</span>
            <span>0</span>
          </div>
          <button className={css.button}>Reset Game</button>
        </div>
      </div>
      <div>
        <p>
          Join the number and get to the <strong>2048 tile!</strong>
        </p>
      </div>
    </div>
  );
}
