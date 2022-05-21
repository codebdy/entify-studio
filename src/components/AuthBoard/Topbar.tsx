import React, { memo } from "react";
import {
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import intl from "react-intl-universal";
import RouterPrompt from "components/common/RouterPrompt";
import { LoadingButton } from "@mui/lab";
import { useRecoilState, useRecoilValue } from "recoil";
import { authChangedState, selectedRoleIdState } from "./recoil/atoms";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { rolesState } from "recoil/atoms";
import { useConfirm } from "hooks/useConfirm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    roleSelect: {
      minWidth: "300px",
    },
  })
);

export const Topbar = memo((props: {}) => {
  const classes = useStyles();
  const selectedServiceId = useSelectedServiceId();
  const changed = useRecoilValue(authChangedState(selectedServiceId));
  const [selectedRoleId, setSelectedRoleId] = useRecoilState(
    selectedRoleIdState(selectedServiceId)
  );

  const roles = useRecoilValue(rolesState);
  const confirm = useConfirm();

  // const [excuteSave, { loading: saving, error: saveError }] = useLazyMagicPost({
  //   onCompleted() {
  //     appStore.showSuccessAlert();
  //     boardStore.setChanged(false);
  //   },
  // });

  //useShowServerError(error || saveError);

  const handleChange = (event: SelectChangeEvent<"" | number>) => {
    const roleId = event.target.value;
    if (roleId === "") {
      setSelectedRoleId(undefined);
      return;
    }
    if (roleId !== selectedRoleId) {
      if (changed) {
        confirm(intl.get("changing-not-save-message"), () => {
          setSelectedRoleId(roleId as any);
        });
      } else {
        setSelectedRoleId(roleId as any);
      }
    }
  };

  const handleSave = () => {
    // if (!boardStore.selectRole) {
    //   return;
    // }
    // const data = new MagicPostBuilder()
    //   .setEntity("RxRole")
    //   .setSingleData(boardStore.selectRole.toMeta())
    //   .toData();
    // excuteSave({ data });
  };
  return (
    <div className={classes.topBar}>
      <RouterPrompt
        promptBoolean={changed}
        message={intl.get("changing-not-save-message")}
      />

      <FormControl
        variant="outlined"
        size="small"
        className={classes.roleSelect}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          {intl.get("role")}
        </InputLabel>
        <Select
          value={selectedRoleId || ""}
          onChange={handleChange}
          label={intl.get("role")}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {roles?.map((role) => {
            return (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <LoadingButton
        variant="contained"
        color="primary"
        size="medium"
        disabled={!changed}
        loading={false}
        onClick={handleSave}
      >
        {intl.get("save")}
      </LoadingButton>
    </div>
  );
});
