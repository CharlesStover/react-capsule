import { renderHook } from '@testing-library/react-hooks';
import Capsule from '.';

interface State {
  a: boolean;
  b: number;
  c: string;
}

type VoidFunction = () => void;

const INITIAL_STATE: State = {
  a: false,
  b: 0,
  c: '',
};

const NEW_STATE: State = {
  a: true,
  b: 1,
  c: 'string',
};

describe('ReactCapsule', (): void => {
  describe('constructor', (): void => {
    it('should set the state', (): void => {
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);

      expect(capsule.state).toEqual(INITIAL_STATE);
    });
  });

  describe('reset', (): void => {
    it('should reset the state', (): void => {
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      capsule.setState(NEW_STATE);
      expect(capsule.state).not.toEqual(INITIAL_STATE);

      capsule.reset();

      expect(capsule.state).toEqual(INITIAL_STATE);
    });
  });

  describe('setState', (): void => {
    it('should set the state', (): void => {
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      expect(capsule.state).not.toEqual(NEW_STATE);

      capsule.setState(NEW_STATE);

      expect(capsule.state).toEqual(NEW_STATE);
    });

    it('should fire subscriptions', (): void => {
      const TEST_SUBSCRIPTION_1: VoidFunction = jest.fn();
      const TEST_SUBSCRIPTION_2: VoidFunction = jest.fn();
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      expect(TEST_SUBSCRIPTION_1).not.toHaveBeenCalled();
      expect(TEST_SUBSCRIPTION_2).not.toHaveBeenCalled();

      capsule.subscribe(TEST_SUBSCRIPTION_1);
      capsule.subscribe(TEST_SUBSCRIPTION_2);
      capsule.setState(NEW_STATE);

      expect(TEST_SUBSCRIPTION_1).toHaveBeenCalledTimes(1);
      expect(TEST_SUBSCRIPTION_2).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribe', (): void => {
    it('should return an unsubscribe function', (): void => {
      const TEST_SUBSCRIPTION_1: VoidFunction = jest.fn();
      const TEST_SUBSCRIPTION_2: VoidFunction = jest.fn();
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      expect(TEST_SUBSCRIPTION_1).not.toHaveBeenCalled();
      expect(TEST_SUBSCRIPTION_2).not.toHaveBeenCalled();
      capsule.subscribe(TEST_SUBSCRIPTION_1);
      const unsubscribe2 = capsule.subscribe(TEST_SUBSCRIPTION_2);
      capsule.setState(NEW_STATE);
      expect(TEST_SUBSCRIPTION_1).toHaveBeenCalledTimes(1);
      expect(TEST_SUBSCRIPTION_2).toHaveBeenCalledTimes(1);

      unsubscribe2();
      capsule.setState(INITIAL_STATE);

      expect(TEST_SUBSCRIPTION_1).toHaveBeenCalledTimes(2);
      expect(TEST_SUBSCRIPTION_2).toHaveBeenCalledTimes(1);
    });
  });

  describe('unsubscribe', (): void => {
    it('should remove subscriptions', (): void => {
      const TEST_SUBSCRIPTION_1: VoidFunction = jest.fn();
      const TEST_SUBSCRIPTION_2: VoidFunction = jest.fn();
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      expect(TEST_SUBSCRIPTION_1).not.toHaveBeenCalled();
      expect(TEST_SUBSCRIPTION_2).not.toHaveBeenCalled();
      capsule.subscribe(TEST_SUBSCRIPTION_1);
      capsule.subscribe(TEST_SUBSCRIPTION_2);
      capsule.setState(NEW_STATE);
      expect(TEST_SUBSCRIPTION_1).toHaveBeenCalledTimes(1);
      expect(TEST_SUBSCRIPTION_2).toHaveBeenCalledTimes(1);

      capsule.unsubscribe(TEST_SUBSCRIPTION_2);
      capsule.setState(INITIAL_STATE);

      expect(TEST_SUBSCRIPTION_1).toHaveBeenCalledTimes(2);
      expect(TEST_SUBSCRIPTION_2).toHaveBeenCalledTimes(1);
    });
  });

  describe('useState', (): void => {
    it('should be a React hook', (): void => {
      const capsule: Capsule<State> = new Capsule(INITIAL_STATE);
      const { result } = renderHook(capsule.useState);
      expect(result.error).toBeUndefined();
    });
  });
});
