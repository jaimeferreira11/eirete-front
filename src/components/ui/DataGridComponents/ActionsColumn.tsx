import { FC, useState } from 'react';

import { MoreVertOutlined as MoreIcon } from '@mui/icons-material';

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';

interface Props {
  actions: ActionMenuOption[];
  children?: React.ReactNode;
}

export interface ActionMenuOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const ActionsColumn: FC<Props> = ({ actions }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openOptions, setOpenOptions] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenOptions(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenOptions(false);
  };

  return (
    <>
      <IconButton id="long-button" onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 15,
        }}
        open={openOptions}
        onClose={handleClose}
      >
        {actions.map(({ id, icon, title, onClick, disabled = false }) => (
          <MenuItem
            key={id}
            disabled={disabled}
            onClick={() => {
              handleClose();
              onClick();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
