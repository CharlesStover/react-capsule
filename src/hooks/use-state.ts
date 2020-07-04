import React, { Dispatch, SetStateAction } from 'react';
import useForceUpdate from 'use-force-update';
import ReactCapsule from '..';
import { isState } from '../utils';

type VoidFunction = () => void;

export default function useCapsuleState<T>(
  capsule: ReactCapsule<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const forceUpdate: VoidFunction = useForceUpdate();

  const dispatch: Dispatch<SetStateAction<T>> = React.useCallback(
    (newValue: SetStateAction<T>): void => {
      if (isState(newValue)) {
        capsule.setState(newValue);
        return;
      }
      const reducedValue: T = newValue(capsule.state);
      capsule.setState(reducedValue);
    },
    [capsule],
  );

  React.useLayoutEffect((): VoidFunction => {
    return capsule.subscribe(forceUpdate);
  }, [capsule, forceUpdate]);

  return [capsule.state, dispatch];
}
