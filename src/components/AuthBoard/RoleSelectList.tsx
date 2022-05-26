import { Box } from "@mui/material";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rolesState } from "recoil/atoms";
import { selectedRoleIdState } from "./recoil/atoms";
import intl from "react-intl-universal";
import { TOOLBAR_HEIGHT } from "./consts";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { GUEST_ROLE_ID } from "util/consts";

export const RoleSelectList = memo(() => {
  const selectedServiceId = useSelectedServiceId();
  const [selectedRoleId, setSelectedRoleId] = useRecoilState(
    selectedRoleIdState(selectedServiceId)
  );

  const roles = useRecoilValue(rolesState);

  const handleChange = (roleId: number) => {
    if (roleId !== selectedRoleId) {
      setSelectedRoleId(roleId);
    }
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        borderRight: (theme) => theme.palette.divider + " solid 1px",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <Box
        sx={{
          height: TOOLBAR_HEIGHT,
          borderBottom: (theme) => theme.palette.divider + " solid 1px",
          display: "flex",
          alignItems: "center",
          pl: 2,
        }}
      >
        {intl.get("role-list")}
      </Box>
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <List
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: (theme) => theme.spacing(4),
            },
          }}
        >
          {roles.map((role) => {
            return (
              <ListItemButton
                key={role.id}
                selected={selectedRoleId === role.id}
                onClick={() => handleChange(role.id)}
              >
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={role.name} />
              </ListItemButton>
            );
          })}
          <ListItemButton
            selected={selectedRoleId === GUEST_ROLE_ID}
            onClick={() => handleChange(GUEST_ROLE_ID)}
          >
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={intl.get("guest")} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
});
