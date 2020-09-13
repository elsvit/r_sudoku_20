export interface ISudokuCell {
  x: number;
  y: number;
  num: number;
  isActive?: boolean;
  isDefault?: boolean; // number from start
  isError?: boolean;
}

export interface IStorageSudoku {
  defaultSudokuStr: string
  sudokuArr: ISudokuCell[]
  steps: string[]
}
