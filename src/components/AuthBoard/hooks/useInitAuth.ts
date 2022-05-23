import { GraphQLError } from "graphql-request/dist/types";
import { useSelectedService } from "hooks/useSelectedService";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { abilitiesState, entityAuthSettingsState } from "../recoil/atoms";
import { useAbilities } from "./useAbilities";
import { useEntityAuthSettings } from "./useEntityAuthSettings";

export function useInitAuth(): {
  loading?: boolean;
  error?: GraphQLError;
} {
  const selectedServie = useSelectedService();
  const setAbilities = useSetRecoilState(
    abilitiesState(selectedServie?.id || 0)
  );
  const setEntitiyAuthSettings = useSetRecoilState(
    entityAuthSettingsState(selectedServie?.id || 0)
  );

  const { abilities, error, loading } = useAbilities(selectedServie?.url);
  const {
    settings,
    error: settingsError,
    loading: settingsLoading,
  } = useEntityAuthSettings(selectedServie?.url);

  useEffect(() => {
    setAbilities(abilities || []);
  }, [abilities, setAbilities]);

  useEffect(() => {
    setEntitiyAuthSettings(settings || []);
  }, [setEntitiyAuthSettings, settings]);

  return { error: error || settingsError, loading: loading || settingsLoading };
}
