import React, { Context, ReactNode, useContext, useMemo } from "react";

function createContextLogicalWrapper<T>(
  context: Context<T>,
  consumer: (context: T) => boolean
) {
  return function LogicalWrapper({ children }: { children: ReactNode }) {
    const ctx = useContext(context);
    const condition = useMemo(() => consumer(ctx), [ctx]);
    return <>{condition ? children : null}</>;
  };
}

export default createContextLogicalWrapper;
