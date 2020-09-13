import React from 'react';
// import cn from 'classnames';

import { ISudokuCell } from 'types/ISudoku';
import Cell from './Cell';
import InputNumberRow from './InputNumberRow';
import Buttons from './Buttons';
import './Sudoku.style.scss';

interface ISudokuViewProps {
  sudoku: ISudokuCell[];
  currentCell: Maybe<number>;
  currentPossibleNumbers: Maybe<number[]>;
  hasSteps: boolean;
  showRules: boolean;

  onCellClick: (num: number) => void;
  onInputNumberClick: (num: number) => void;
  onNewClick: () => void;
  onRestartClick: () => void;
  onBackClick: () => void;
  onSaveClick: () => void;
  toggleRules: () => void;
}

const SudokuView = ({
  sudoku = [],
  currentCell,
  currentPossibleNumbers,
  hasSteps,
  showRules,
  onCellClick,
  onInputNumberClick,
  onNewClick,
  onRestartClick,
  onBackClick,
  onSaveClick,
  toggleRules,
}: ISudokuViewProps) => {
  return (
    <>
      <div className="sudoku_title">SUDOKU</div>

      <div className={'sudoku_box'}>
        {sudoku.map((val: ISudokuCell, idx: number) => {
          const onClick = () => {
            onCellClick(idx);
          };
          const isActive = currentCell === idx;

          return <Cell key={idx} {...val} isActive={isActive} onClick={onClick} />;
        })}
        <div className="show_rules_btn" onClick={toggleRules}>
          {showRules ? 'Return to game' : 'Rules'}
        </div>
        {showRules && (
          <div className={'sudoku_rules'}>
            <h3>SUDOKU RULES</h3>
            <h4>
              The objective is to fill a 9×9 grid with digits so that each column, each row, and
              each of the nine 3×3 subgrids that compose the grid (also called "boxes", "blocks", or
              "regions") contains all of the digits from 1 to 9. The puzzle setter provides a
              partially completed grid, which for a well-posed puzzle has a unique solution.
            </h4>
          </div>
        )}
      </div>
      <InputNumberRow
        currentPossibleNumbers={currentPossibleNumbers}
        onClick={onInputNumberClick}
      />
      <Buttons
        hasSteps={hasSteps}
        onNewClick={onNewClick}
        onRestartClick={onRestartClick}
        onBackClick={onBackClick}
        onSaveClick={onSaveClick}
      />
    </>
  );
};

export default SudokuView;
