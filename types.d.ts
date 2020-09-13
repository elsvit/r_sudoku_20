type Maybe<T> = T | null | undefined;

interface IStringDict {
  [key: string]: Maybe<string>;
}
