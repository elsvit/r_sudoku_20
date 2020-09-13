import cn from 'classnames';
import React from 'react';

import './Buttons.style.scss';

export interface IButtonsProps {
  hasSteps: boolean;
  onNewClick: () => void;
  onRestartClick: () => void;
  onBackClick: () => void;
  onSaveClick: () => void;
}

const Buttons = ({
  hasSteps,
  onNewClick,
  onRestartClick,
  onBackClick,
  onSaveClick,
}: IButtonsProps) => (
  <div className="sudoku_buttons">
    <div className={'sudoku_button'} onClick={onNewClick}>
      NEW
    </div>
    <div
      className={cn('sudoku_button', { sudoku_button_disabled: !hasSteps })}
      onClick={onRestartClick}
    >
      RESTART
    </div>
    <div
      className={cn('sudoku_button', { sudoku_button_disabled: !hasSteps })}
      onClick={onBackClick}
    >
      BACK
    </div>

    <div className={'sudoku_button float_right'} onClick={onSaveClick}>
      SAVE
    </div>
  </div>
);

export default Buttons;
