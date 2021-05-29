import React from 'react';
import { IoIosUndo, IoIosRedo, IoIosPlay } from 'react-icons/io';

import css from './ActionsBar.module.css';

export default function ActionsBar({
  onClickUndo,
  disableUndo,
  onClickReplay,
  disableReplay,
  onClickRedo,
  disableRedo,
}) {
  return (
    <div className={css.container}>
      <div
        className={css.iconContainer}
        style={{ opacity: disableUndo ? 0.3 : 1 }}
      >
        <IoIosUndo
          className={!disableUndo ? css.button : css.disabledButton}
          color="white"
          fontSize="100px"
          onClick={!disableUndo ? onClickUndo : null}
        />
      </div>
      <div
        className={css.iconContainer}
        style={{ opacity: disableUndo ? 0.3 : 1 }}
      >
        <IoIosPlay
          className={!disableReplay ? css.button : css.disabledButton}
          color="white"
          fontSize="100px"
          onClick={!disableReplay ? onClickReplay : null}
        />
      </div>
      <div
        className={css.iconContainer}
        style={{ opacity: disableUndo ? 0.3 : 1 }}
      >
        <IoIosRedo
          className={!disableRedo ? css.button : css.disabledButton}
          color="white"
          fontSize="100px"
          onClick={!disableRedo ? onClickRedo : null}
        />
      </div>
    </div>
  );
}
