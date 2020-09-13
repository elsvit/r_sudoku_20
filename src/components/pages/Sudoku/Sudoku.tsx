import React from 'react';

import { SUDOKU_LIST } from 'constants/data';
import { getSudokuArrFromString, checkErrNum, checkEnd } from 'services/helpers';
import asyncStorageService from 'services/storage';
import { IStorageSudoku, ISudokuCell } from 'types/ISudoku';
import SudokuView from './SudokuView';

const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Sudoku = () => {
  const [defaultSudokuStr, setDefaultSudokuStr] = React.useState<string>('');
  const [sudokuArr, setSudokuArr] = React.useState<ISudokuCell[]>([]);
  const [currentCell, setCurrentCell] = React.useState<Maybe<number>>(null);
  const [currentPossibleNumbers, setCurrentPossibleNumbers] = React.useState<Maybe<number[]>>(null);
  const [steps, setSteps] = React.useState<string[]>([]);
  const [showRules, setShowRules] = React.useState<boolean>(false);

  const onNewClick = (numOfTry: number = 5) => {
    setCurrentCell(null);
    const listLength = SUDOKU_LIST.length;
    const rnd = Math.random();
    const num = Math.floor(rnd * listLength);
    const sudokuStr = SUDOKU_LIST[num];
    if (sudokuStr.length === 81) {
      const sudokuArrRes = getSudokuArrFromString(sudokuStr);
      if (sudokuArrRes != null) {
        setDefaultSudokuStr(sudokuStr);
        setSudokuArr(sudokuArrRes);
      }
    } else if (numOfTry > 0) {
      onNewClick(numOfTry - 1);
    }
  };

  React.useEffect(() => {
    async function getSudoku() {
      const res = (await asyncStorageService.getSudoku()) as Maybe<IStorageSudoku>;
      if (res && res.defaultSudokuStr && res.sudokuArr && res.steps) {
        setDefaultSudokuStr(res.defaultSudokuStr);
        setSudokuArr(res.sudokuArr);
        setSteps(res.steps);
      } else {
        const sudokuStr = SUDOKU_LIST[0]; // todo change to rnd sudoku list value, (or download from server)
        if (sudokuStr.length === 81) {
          setDefaultSudokuStr(sudokuStr);
          const sudokuArrRes = getSudokuArrFromString(sudokuStr);
          if (sudokuArrRes != null) {
            setSudokuArr(sudokuArrRes);
          }
        }
        onNewClick();
      }
    }
    getSudoku();
  }, []);

  const onSaveClick = async () => {
    const data: IStorageSudoku = {
      defaultSudokuStr,
      sudokuArr,
      steps,
    };
    await asyncStorageService.setSudoku(data);
  };

  const onCellClick = (num: number) => {
    if (num === currentCell) {
      setCurrentCell(null);
      setCurrentPossibleNumbers(null);
    } else {
      setCurrentCell(num);

      const newCurrentPossibleNumbers: number[] = [];
      NUMBER_LIST.forEach((val) => {
        const isOk = checkErrNum(sudokuArr, num, val);
        if (isOk) {
          newCurrentPossibleNumbers.push(val);
        }
      });
      setCurrentPossibleNumbers(newCurrentPossibleNumbers);
    }
  };

  const onInputNumberClick = (num: number) => {
    if (currentCell != null && num !== sudokuArr[currentCell].num) {
      const newSteps = [...steps];
      const stepStr = `${currentCell}:${sudokuArr[currentCell].num}:${num}`;
      newSteps.push(stepStr);
      setSteps(newSteps);

      const newSudokuArr = [...sudokuArr];
      const newCell = { ...newSudokuArr[currentCell] };
      newCell.num = num;
      newSudokuArr[currentCell] = newCell;

      setSudokuArr(newSudokuArr);
      const isEnd = checkEnd(newSudokuArr);
      if (isEnd) {
        alert('CONGRATULATIONS!!!');
      }
    }
  };

  const onRestartClick = () => {
    setCurrentCell(null);
    const sudokuArrRes = getSudokuArrFromString(defaultSudokuStr);
    if (sudokuArrRes != null) {
      setSudokuArr(sudokuArrRes);
    }
  };

  const onBackClick = () => {
    setCurrentCell(null);
    const stepsLength = steps.length;
    if (stepsLength) {
      const newSteps = [...steps];
      const lastStep = newSteps.splice(-1)[0];
      setSteps(newSteps);

      const lastStepArr = lastStep.split(':');

      const newSudokuArr = [...sudokuArr];
      const position = +lastStepArr[0];
      const newCell = { ...newSudokuArr[position] };
      newCell.num = +lastStepArr[1];
      newSudokuArr[position] = newCell;
      setSudokuArr(newSudokuArr);
    }
  };

  const toggleRules = () => {
    setShowRules(!showRules);
    console.log('toggleRules134 showRules', showRules);
  };

  return (
    <SudokuView
      sudoku={sudokuArr}
      currentCell={currentCell}
      currentPossibleNumbers={currentPossibleNumbers}
      hasSteps={!!steps.length}
      showRules={showRules}
      onCellClick={onCellClick}
      onInputNumberClick={onInputNumberClick}
      onNewClick={onNewClick}
      onRestartClick={onRestartClick}
      onBackClick={onBackClick}
      onSaveClick={onSaveClick}
      toggleRules={toggleRules}
    />
  );
};

export default Sudoku;
