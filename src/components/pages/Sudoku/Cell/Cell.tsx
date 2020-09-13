import React from 'react';
import cn from 'classnames';

import './Cell.style.scss';

export interface ICellProps {
  x: number;
  y: number;
  num: number;
  isActive?: boolean;
  isDefault?: boolean; // number from start
  isError?: boolean;

  onClick: () => void;
}

const Cell = ({ x, y, num = 0, isActive, isDefault, isError, onClick }: ICellProps) => {
  let borderWidth = '';
  //cell border top
  if (y % 3 === 0) {
    borderWidth = '3px';
  } else {
    borderWidth = '1px';
  }
  //cell border right
  if ((x + 1) % 9 === 0) {
    borderWidth += ' 3px';
  } else {
    borderWidth += ' 0px';
  }
  //cell border bot
  if ((y + 1) % 9 === 0) {
    borderWidth += ' 3px';
  } else {
    borderWidth += ' 0px';
  }
  //cell border left
  if (x % 3 === 0) {
    borderWidth += ' 3px';
  } else {
    borderWidth += ' 1px';
  }

  const cursorClass = isDefault ? 'cursor_not_allowed' : 'cursor_pointer';
  const activeClass = isActive && 'active_cell';
  const colorClass = isDefault ? 'color_black' : 'color_dark_gray';
  const cellClass = cn('sudoku_cell', cursorClass, activeClass, colorClass);
  const handleClick = () => {
    if (!isDefault) {
      onClick();
    }
  };

  return (
    <div style={{ borderWidth }} className={cellClass} onClick={handleClick}>
      {num || ''}
    </div>
  );
};

export default Cell;
