import { useCallback } from "react";

function useKeyDownSubmit(fn: () => void) {
  const keyDownEventHandler = useCallback((onSubmit: () => void, e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.code === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }, []);

  return keyDownEventHandler.bind(null, fn);
}

export default useKeyDownSubmit;
