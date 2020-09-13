import { ISudokuCell } from 'types/ISudoku';

export const getSudokuArrFromString = (strSudoku: string) => {
  const strSudokuLength = strSudoku.length;
  if (strSudokuLength !== 81) {
    return null;
  }

  const sudokuArr: ISudokuCell[] = [];
  for (let y = 0; y < 9; y += 1) {
    for (let x = 0; x < 9; x += 1) {
      const position = y * 9 + x;
      const num = parseInt(strSudoku[position]);
      sudokuArr[position] = {
        y,
        x,
        num,
        isDefault: !!num,
        isActive: false,
        isError: false,
      };
    }
  }
  return sudokuArr;
};

export const checkErrNum = (sudokuMapCurrent: ISudokuCell[], pos: number, num: number) => {
  // const num = sudokuMapCurrent[pos].num;
  const y = sudokuMapCurrent[pos].y;
  const x = sudokuMapCurrent[pos].x;
  const checkedSquareTop = Math.floor(y / 3) * 3;
  const checkedSquareLeft = Math.floor(x / 3) * 3;
  for (let i = 0; i < 9; i++) {
    let j = i + y * 9;
    if (j !== pos) {
      if (sudokuMapCurrent[j].num === num) {
        return false;
      }
    }
    j = i * 9 + x;
    if (j !== pos) {
      if (sudokuMapCurrent[j].num === num) {
        return false;
      }
    }
    j = checkedSquareTop * 9 + Math.floor(i / 3) * 9 + checkedSquareLeft + (i % 3);
    if (j !== pos) {
      if (sudokuMapCurrent[j].num === num) {
        return false;
      }
    }
  }
  return true;
};

export const checkEnd = (sudokuMapCurrent: ISudokuCell[]): boolean => {
  for (let i = 0; i < 81; i += 1) {
    if (sudokuMapCurrent[i].num === 0) {
      return false;
    }
  }
  return true;
};
