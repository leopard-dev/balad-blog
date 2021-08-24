import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useLocalStorage from "./use-local-storage";

type Options = {
  redirectTo: string;
  rule: boolean;
};

function useRedirect({ redirectTo, rule }: Options) {
  const { replace } = useRouter();
  useEffect(() => {
    if (rule) {
      replace(redirectTo);
    }
  }, [redirectTo, replace, rule]);
}

export default useRedirect;
