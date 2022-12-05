import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {NavLink} from "react-router-dom";
import styles from './Navigation.module.css'

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const style = (isActive: boolean) => {
    return `${isActive ? styles.activeLink : ''} ${styles.link}`
  }

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{mr: 2}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink className={({isActive}) => style(isActive)} to={'/'}>
            Home
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className={({isActive}) => style(isActive)} to={'/profile'}>
            Profile
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default Navigation