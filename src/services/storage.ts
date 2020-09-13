import {IStorageSudoku} from 'types/ISudoku';

const PREFIX = '@sudoku';

async function removeData(key: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await localStorage.removeItem(key);
      resolve();
    } catch (error) {
      reject(new Error('Error! Cannot remove data on this localStorage!'));
    }
  });
}

async function setData(key: string, data: any) {
  return new Promise(async (resolve, reject) => {
    try {
      await localStorage.setItem(key, JSON.stringify(data));
      resolve();
    } catch (error) {
      reject(new Error('Error! Cannot save data on this localStorage!'));
    }
  });
}

async function mergeData(key: string, dataToMerge: any) {
  return new Promise(async (resolve, reject) => {
    const dataJSON = await localStorage.getItem(`${PREFIX}`);
    let data = {};
    if (dataJSON !== null) {
      try {
        data = JSON.parse(dataJSON);
        data = {
          ...(data || {}),
          ...(dataToMerge || {}),
        };
      } catch (ex) {
        data = dataToMerge;
      }
    }

    try {
      await localStorage.setItem(key, JSON.stringify(data));
      resolve();
    } catch (ex) {
      reject(new Error('Error! Cannot save data on this device!'));
    }
  });
}

async function getData(key: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const dataStr = await localStorage.getItem(key);
      if (dataStr != null) {
        try {
          const data = JSON.parse(dataStr);
          resolve(data);
        } catch (e) {
          resolve(dataStr);
        }
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(new Error('Error! Cannot get data from storage!'));
    }
  });
}

class localStorageService {
  public setSudoku = async (sudoku: IStorageSudoku) => {
    return setData(`${PREFIX}:sudoku`, sudoku);
  };
  public getSudoku = async () => getData(`${PREFIX}:sudoku`);
  public clearSudoku = async () => removeData(`${PREFIX}:sudoku`);

  public setData = async (type: string, data: string) => {
    return setData(`${PREFIX}:${type}`, data);
  };
  public getData = async (type: string) => getData(`${PREFIX}:${type}`);
  public clearData = async (type: string) => removeData(`${PREFIX}:${type}`);
}

const asyncStorageService = new localStorageService();

export default asyncStorageService;
