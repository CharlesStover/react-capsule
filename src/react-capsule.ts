import { Dispatch, SetStateAction } from 'react';
import { useState } from './hooks';

type VoidFunction = () => void;

export default class ReactCapsule<T> {
  private _initialValue: T;
  private _subscriptions: Set<VoidFunction> = new Set();
  private _value: T;

  public constructor(initialValue: T) {
    this._initialValue = initialValue;
    this._value = initialValue;

    this.reset = this.reset.bind(this);
    this.setState = this.setState.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.useState = this.useState.bind(this);
  }

  public reset(): void {
    this._value = this._initialValue;
  }

  public setState(newValue: T): void {
    this._value = newValue;
    for (const subscription of this._subscriptions) {
      subscription();
    }
  }

  public get state(): T {
    return this._value;
  }

  public subscribe(callback: VoidFunction): VoidFunction {
    this._subscriptions.add(callback);
    return (): void => {
      this.unsubscribe(callback);
    };
  }

  public unsubscribe(callback: VoidFunction): void {
    this._subscriptions.delete(callback);
  }

  public useState(): [T, Dispatch<SetStateAction<T>>] {
    /*
    ESLint mistakenly believes that we are calling a hook from within a class
      component instead of from within a function component or another hook.
      However, this method actually is a hook.
    */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useState(this);
  }
}
