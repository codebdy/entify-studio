import React, { memo, useCallback, useState } from "react";
import { Box, Divider, Menu, MenuItem, SvgIcon, Theme } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import intl from "react-intl-universal";
import { useCreateNewClass } from "../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../hooks/useCreateNewDiagram";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useSetRecoilState } from "recoil";
import { classesState, selectedDiagramState } from "../recoil/atoms";
import { useSelectedServiceId } from "../hooks/useSelectedServiceId";
import { StereoType } from "../meta/ClassMeta";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { EditServiceDialog } from "./EditServiceDialog";
import { useConfirm } from "hooks/useConfirm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginLeft: "16px",
    },
  })
);

export const RootMenu = memo(
  (props: {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onDelete: () => void;
  }) => {
    const { anchorEl, onClose, onDelete } = props;
    const classes = useStyles();
    const isMenuOpen = Boolean(anchorEl);
    const serviceId = useSelectedServiceId();
    const createNewClass = useCreateNewClass(serviceId);
    const createNewDiagram = useCreateNewDiagram(serviceId);
    const setEntities = useSetRecoilState(classesState(serviceId));
    const [editOpen, setEditOpen] = useState(false);
    const [subAnchorEl, setSubAnchorEl] = React.useState<null | HTMLElement>(
      null
    );

    const confirm = useConfirm();

    const setSelectedDiagram = useSetRecoilState(
      selectedDiagramState(serviceId)
    );
    const backupSnapshot = useBackupSnapshot(serviceId);

    const addClass = useCallback(
      (stereoType: StereoType) => {
        backupSnapshot();
        const newClass = createNewClass(stereoType);
        setEntities((classes) => [...classes, newClass]);
        onClose();
        setSubAnchorEl(null);
      },
      [backupSnapshot, createNewClass, onClose, setEntities]
    );

    const handleAddEntity = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        addClass(StereoType.Entity);
        event.stopPropagation();
        setSubAnchorEl(null);
      },
      [addClass]
    );

    const handleAddEnum = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        addClass(StereoType.Enum);
        event.stopPropagation();
        setSubAnchorEl(null);
      },
      [addClass]
    );

    const handleAddValueObject = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        addClass(StereoType.ValueObject);
        event.stopPropagation();
        setSubAnchorEl(null);
      },
      [addClass]
    );

    const handleAddExternal = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        addClass(StereoType.External);
        event.stopPropagation();
        setSubAnchorEl(null);
      },
      [addClass]
    );
    const handleAddDiagram = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        backupSnapshot();
        const newDiagram = createNewDiagram();
        setSelectedDiagram(newDiagram.uuid);
        onClose();
        setSubAnchorEl(null);
        event.stopPropagation();
      },
      [backupSnapshot, createNewDiagram, onClose, setSelectedDiagram]
    );

    const handlePublish = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClose();
        event.stopPropagation();
      },
      [onClose]
    );

    const handleDownloadJson = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClose();
        event.stopPropagation();
      },
      [onClose]
    );

    const handleExportInterface = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClose();
        event.stopPropagation();
      },
      [onClose]
    );

    const handleAddClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        setSubAnchorEl(event.currentTarget);
      },
      []
    );

    const handleSubClose = useCallback(() => {
      setSubAnchorEl(null);
    }, []);

    const handleEdit = useCallback(() => {
      setEditOpen(true);
      onClose();
    }, [onClose]);

    const handleDelete = useCallback(() => {
      confirm(intl.get("confirm-delete"), () => {
        onDelete();
      });
      setSubAnchorEl(null);
      onClose();
    }, [confirm, onClose, onDelete]);

    const handleEditDlgClose = useCallback(() => {
      setEditOpen(false);
    }, []);

    return (
      <>
        <Menu
          anchorEl={anchorEl}
          //getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={isMenuOpen}
          onClose={onClose}
        >
          <MenuItem onClick={handleAddClick}>
            <AddOutlinedIcon fontSize="small" />
            <span className={classes.text}>{intl.get("add")} </span>
            <Box sx={{ flex: 1 }}></Box>
            <ArrowRightOutlinedIcon sx={{ mr: -1 }} fontSize="small" />
          </MenuItem>

          <Divider />
          <MenuItem onClick={handlePublish}>
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 18H20V22H18V18H16L19 15L22 18Z"
              />
            </SvgIcon>
            <span className={classes.text}>{intl.get("publish")} </span>
          </MenuItem>
          <MenuItem onClick={handleDownloadJson} sx={{ pr: 5 }}>
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M20 13.09V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.21 7.59 21 12 21C12.46 21 12.9 21 13.33 20.94C13.12 20.33 13 19.68 13 19L13 18.95C12.68 19 12.35 19 12 19C8.13 19 6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16C12.65 16 13.27 15.96 13.88 15.89C14.93 14.16 16.83 13 19 13C19.34 13 19.67 13.04 20 13.09M18 12.45C16.7 13.4 14.42 14 12 14S7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5 18 6.5 18 7 15.87 9 12 9M22 20L19 23L16 20H18V16H20V20H22Z"
              />
            </SvgIcon>
            <span className={classes.text}>{intl.get("export-json")} </span>
          </MenuItem>
          <MenuItem onClick={handleExportInterface}>
            <SvgIcon fontSize="small">
              <path
                fill="currentColor"
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20M16 11V18.1L13.9 16L11.1 18.8L8.3 16L11.1 13.2L8.9 11H16Z"
              />
            </SvgIcon>
            <span className={classes.text}>{intl.get("export-inteface")} </span>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleEdit}>
            <EditOutlinedIcon fontSize="small" />
            <span className={classes.text}>{intl.get("edit")} </span>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
            <span className={classes.text}>{intl.get("delete")} </span>
          </MenuItem>
        </Menu>
        <Menu
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={!!subAnchorEl}
          anchorEl={subAnchorEl}
          onClose={handleSubClose}
        >
          <MenuItem onClick={handleAddDiagram}>
            {intl.get("add-diagram")}
          </MenuItem>
          <MenuItem onClick={handleAddEntity}>
            {intl.get("add-entity-class")}
          </MenuItem>
          <MenuItem onClick={handleAddEnum}>
            {intl.get("add-enum-class")}
          </MenuItem>
          <MenuItem onClick={handleAddValueObject}>
            {intl.get("add-value-object")}
          </MenuItem>
          <MenuItem onClick={handleAddExternal}>
            {intl.get("add-external-class")}
          </MenuItem>
        </Menu>
        <EditServiceDialog open={editOpen} onClose={handleEditDlgClose} />
      </>
    );
  }
);
