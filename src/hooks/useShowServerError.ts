import { ServerError } from "do-ents/ServerError";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { serverErrorState } from "recoil/atoms";

export function useShowServerError(error: ServerError|undefined) {
  const setError = useSetRecoilState(serverErrorState);
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);
}
