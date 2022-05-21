import { FormControlLabel, Checkbox } from "@mui/material";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { Ability } from "components/AuthBoard/meta/Ability";
import React from "react";
import { ActionLabel } from "./ActionLabel";
import { ExpressDialog } from "./ExpressDialog";

export function ActionWithExpression(props:{
  label: string,
  ability: Ability,
  onAbilityChange:(ability:Ability)=>void,
  noExpression?:boolean,
  entityMeta:ClassMeta,
}){
  const {label, ability, onAbilityChange, noExpression, entityMeta} = props;

  const handleCanChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    onAbilityChange({...ability, can: event.target.checked});
  }

  const handleExpChange = (exp:string)=>{
    onAbilityChange({...ability, expression: exp});
  }

  return(
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={ability.can}
            onChange={handleCanChange}
            color="primary"
            size = "small"
          />
        }
        label={<ActionLabel>{label}</ActionLabel>}
      />
      {
        ability.can && !noExpression &&
        <ExpressDialog 
          expression = {ability.expression||''} 
          onExpressionChange = {handleExpChange}
          entityMeta = {entityMeta}
        />
      }
    </>
  )
}