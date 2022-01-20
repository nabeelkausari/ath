import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { avatarIco } from '../../assets/icons';
import avatar from '../../assets/icons/avatar.svg';
import dropdown from '../../assets/icons/dropdown.svg';
import dropdownDark from '../../assets/icons/dropdown-dark.svg';
import search from '../../assets/icons/search.svg';
import logo from '../../assets/images/Logo@2x.png';
import Login from '../../sections/Login/Login';
import { getMyProfile, isLoggedIn, logout } from '../../store/auth/actions';
import { getAllUsers } from '../../store/collaborators/actions';
import ActiveLink from '../ActiveLink/ActiveLink';
import Button from '../Button';
import TransitionsModal from '../Modal';
import useStyles from './Header.styles';

// eslint-disable-next-line react/display-name
const Logo = React.forwardRef(({ href, onClick }, ref) => {
  return (
    <a className="logo" onClick={onClick} href={href} ref={ref}>
      <Image width="96px" height="27px" src={logo} alt="Rolai" />
    </a>
  );
});

const Header = ({ onLogin }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { is_logged_in, login_succeeded, my_profile, my_profile_succeeded } =
    useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const admin = my_profile?._links?.rolai_admin_get_users;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (login_succeeded) {
      setOpenModal(false);
    }
  }, [login_succeeded]);

  useEffect(() => {
    if (is_logged_in && !my_profile) {
      dispatch(getMyProfile());
    }
  }, [is_logged_in, my_profile]);

  useEffect(() => {
    if (my_profile_succeeded) {
      dispatch(getAllUsers());
    }
  }, [my_profile_succeeded]);

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };
  return (
    <>
      <AppBar
        className={styles.appBar}
        color="secondary"
        elevation={0}
        position="relative"
      >
        <Container maxWidth={false}>
          <Toolbar>
            <Link href="/" passHref>
              <Logo />
            </Link>
            {is_logged_in && (
              <>
                <Link href="/explore" passHref>
                  <Button
                    className={styles.explore}
                    endIcon={<Image src={dropdown} width={10} height={10} />}
                  >
                    Explore
                  </Button>
                </Link>
                <div className={styles.search}>
                  <div className={styles.searchIconWrapper}>
                    <Image src={search} width={12} height={12} />
                  </div>
                  <InputBase
                    className={styles.searchInputBase}
                    placeholder="Search something to learn or upskill"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
              </>
            )}

            <div className={styles.login}>
              {is_logged_in ? (
                <>
                  {admin && (
                    <ActiveLink
                      activeClassName="active"
                      href="/admin/roster"
                      passHref
                    >
                      <Button disableFocusRipple disableRipple variant="text">
                        Admin
                      </Button>
                    </ActiveLink>
                  )}
                  <ActiveLink
                    activeClassName="active"
                    href="/my-organization"
                    passHref
                  >
                    <Button disableFocusRipple disableRipple variant="text">
                      My Organization
                    </Button>
                  </ActiveLink>
                  <ActiveLink
                    activeClassName="active"
                    href="/dashboard/home"
                    passHref
                  >
                    <Button disableFocusRipple disableRipple variant="text">
                      Dashboard
                    </Button>
                  </ActiveLink>
                  <>
                    <div onClick={handleClick} className={styles.avatar}>
                      <Image
                        src={
                          my_profile?.profile_pic_url
                            ? 'https:' + my_profile.profile_pic_url
                            : avatarIco
                        }
                        width={32}
                        height={32}
                      />
                      <Image src={dropdownDark} width={12} height={12} />
                    </div>
                    <Menu
                      className={styles.menu}
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                </>
              ) : (
                <Button onClick={handleModalOpen}>Login</Button>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <TransitionsModal
        open={openModal}
        closeModal={handleModalClose}
        Component={<Login closeModal={handleModalClose} />}
      />
    </>
  );
};

export default Header;
