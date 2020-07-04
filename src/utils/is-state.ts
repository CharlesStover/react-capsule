import { SetStateAction } from 'react';

/*
isState takes a set state action and determines if that action is the new state
  or a reducer. This type guard allows TypeScript to determine that value can be
  executed as value(prevValue) when value is a reducer.
As a limitation of React hooks, a function state cannot be passed directly as a
  set state action, as it will be assumed to be a reducer.
*/

export default function isState<T>(value: SetStateAction<T>): value is T {
  return typeof value !== 'function';
}
