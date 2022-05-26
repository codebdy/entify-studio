import { FormControlLabel, Checkbox, CircularProgress } from "@mui/material";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { Ability } from "components/AuthBoard/meta/Ability";
import React from "react";
import { ActionLabel } from "./ActionLabel";
import { ExpressDialog } from "./ExpressDialog";
import { usePostAbility } from "./hooks/usePostAbility";
import { useShowServerError } from "hooks/useShowServerError";

export function ActionWithExpression(props: {
  label: string;
  ability: Ability;
  noExpression?: boolean;
  entityMeta: ClassMeta;
}) {
  const { label, ability, noExpression, entityMeta } = props;
  console.log(ability)
  const [post, { error, loading }] = usePostAbility();
  useShowServerError(error);

  const handleCanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    post({ ...ability, can: event.target.checked });
  };

  const handleExpChange = (exp: string) => {
    post({ ...ability, expression: exp });
  };

  return (
    <>
      <FormControlLabel
        disabled={loading}
        control={
          loading ? (
            <CircularProgress size={20} sx={{ m: 1 }} />
          ) : (
            <Checkbox
              checked={ability.can}
              onChange={handleCanChange}
              color="primary"
              size="small"
            />
          )
        }
        label={<ActionLabel>{label}</ActionLabel>}
      />
      {ability.can && !noExpression && (
        <ExpressDialog
          expression={ability.expression || ""}
          onExpressionChange={handleExpChange}
          entityMeta={entityMeta}
        />
      )}
    </>
  );
}
