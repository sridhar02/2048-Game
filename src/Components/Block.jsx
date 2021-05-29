import React from 'react';
// import './Block.scss';

export default function Block({ num, css }) {
  return (
    <div
      className={css.block}
      //   style={{ background: getColour(num), color: num !== 0 && '#645B52' }}
    >
      {num ? num : ''}
    </div>
  );
}
