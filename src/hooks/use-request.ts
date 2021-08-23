import { DependencyList, useCallback, useRef, useState } from "react";
import useMountedState from "./use-mounted-state";

type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

type FunctionReturningPromise = (...args: any[]) => Promise<any>;

type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: string[] | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: string[];
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> =
  AsyncState<PromiseType<ReturnType<T>>>;

type AsyncFnReturn<
  T extends FunctionReturningPromise = FunctionReturningPromise
> = [StateFromFunctionReturningPromise<T>, T];

type Options<T extends FunctionReturningPromise> = {
  deps?: DependencyList;
  initialState?: StateFromFunctionReturningPromise<T>;
  onSuccess?: (data: PromiseType<ReturnType<T>>) => void;
};

export default function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  { deps = [], initialState = { loading: false }, onSuccess }: Options<T>
): AsyncFnReturn<T> {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  const [state, set] =
    useState<StateFromFunctionReturningPromise<T>>(initialState);

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current;
    set((prevState) => ({ ...prevState, loading: true }));

    return fn(...args).then(
      (value) => {
        if (isMounted() && callId === lastCallId.current) {
          set({ value, loading: false });
          onSuccess?.(value);
        }
        return value;
      },
      (e) => {
        let error = ["خطایی هنگام اتصال به سرور رخ داد."];
        if (e.error) {
          error = e.error;
        } else if (e.message) {
          error = [e.message];
        }
        if (isMounted() && callId === lastCallId.current) {
          set({ error, loading: false });
        }
        return error;
      }
    ) as ReturnType<T>;
  }, deps);

  return [state, callback as unknown as T];
}
