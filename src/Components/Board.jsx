import React from 'react';

import Header from './Header.jsx';
import css from './Board.module.css';
import Block from './Block.jsx';

export default function Board({ data, score, best, onClickNewGame }) {
  return (
    <div className={css.board}>
      <Header score={score} best={best} onClickNewGame={onClickNewGame} />
      <div className={css.body}>
        {data.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className={css.row}>
              {row.map((num, index) => (
                <Block num={num} key={index} css={css} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
