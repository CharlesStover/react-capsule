import {
  RenderHookResult,
  act,
  renderHook,
} from '@testing-library/react-hooks';
import { Dispatch, SetStateAction } from 'react';
import Capsule from '..';
import { useState } from '.';

const render = <T>(
  initialState: T,
): RenderHookResult<void, [T, Dispatch<SetStateAction<T>>]> => {
  const capsule: Capsule<T> = new Capsule(initialState);
  return renderHook((): [T, Dispatch<SetStateAction<T>>] => useState(capsule));
};

describe('useCapsuleState', (): void => {
  describe('state', (): void => {
    it('should be the state', (): void => {
      const INITIAL_STATE = 'initial state';
      const { result } = render(INITIAL_STATE);
      expect(result.current[0]).toBe(INITIAL_STATE);
    });
  });

  describe('dispatch', (): void => {
    it('should update the state with a value', (): void => {
      const INITIAL_STATE = 'initial state';
      const NEW_STATE = 'new state';
      const { result } = render(INITIAL_STATE);
      expect(result.current[0]).not.toBe(NEW_STATE);

      act((): void => {
        result.current[1](NEW_STATE);
      });

      expect(result.current[0]).toBe(NEW_STATE);
    });

    it('should update the state with a reducer', (): void => {
      const INITIAL_STATE = 1;
      const EXPECTED_STATE = 3;
      const { result } = render(INITIAL_STATE);
      expect(result.current[0]).not.toBe(EXPECTED_STATE);

      act((): void => {
        result.current[1]((prevState: number): number => prevState + 2);
      });

      expect(result.current[0]).toBe(EXPECTED_STATE);
    });
  });
});
