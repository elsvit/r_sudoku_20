import React from 'react';
import cn from 'classnames';

import './InputNumberRow.style.scss';

export interface IInputNumberRowProps {
  currentPossibleNumbers: Maybe<number[]>;
  onClick: (num: number) => void;
}

const InputNumberRow = ({ currentPossibleNumbers, onClick }: IInputNumberRowProps) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="sudoku_input">
      {arr.map((val: number) => {
        const isOk =
          val === 0 || currentPossibleNumbers == null || currentPossibleNumbers.includes(val);
        const className = cn('sudoku_input_cell', { sudoku_input_cell_error: !isOk });
        const handleOnClick = () => {
          if (isOk) {
            onClick(val);
          }
        };
        return (
          <div className={className} onClick={handleOnClick} key={val}>
            {val || ''}
          </div>
        );
      })}
    </div>
  );
};

export default InputNumberRow;
