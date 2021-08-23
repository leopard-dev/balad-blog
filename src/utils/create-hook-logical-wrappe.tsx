import React, { ReactNode, useMemo } from "react";

function createHookLogicalWrapper<T extends (...args: any) => any>(
  hook: T,
  consumer: (context: ReturnType<T>) => boolean,
  hookParams?: Parameters<T>
) {
  return function LogicalWrapper({ children }: { children: ReactNode }) {
    const hookResult = hook(hookParams);
    const condition = useMemo(() => consumer(hookResult), [hookResult]);
    return <>{condition ? children : null}</>;
  };
}

export default createHookLogicalWrapper;
