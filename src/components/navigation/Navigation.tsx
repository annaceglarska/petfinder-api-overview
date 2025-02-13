import React, { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearErrors,
  clearUserData,
  isUserLogged,
} from "../../slices/user/user.slice";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { SignIn } from "../sign-in/SignIn";
import TokenService from "../../services/token/token";
import logo from "../../assets/images/petfinder_logo.png";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LANGUAGES } from "../../config/i18next";

export interface PageSetting {
  label: string;
  onClick?: () => void;
  to?: string;
}

const pages: PageSetting[] = [
  { label: "Pets", to: "/pets" },
  { label: "Organizations", to: "/organizations" },
];

export const Navigation: React.FC = () => {
  const isLogged = useAppSelector(isUserLogged);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [LanguageAnchorEl, setLanguageAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (open && isLogged) {
      handleClose();
    }
  }, [open, isLogged]);

  const onSignOutClick = () => {
    dispatch(clearUserData());
    TokenService.deleteToken();
    handleCloseUserMenu();
  };

  const languagesToDisplay = useMemo(
    () =>
      LANGUAGES.filter((language) => language !== i18n.language).map(
        (language) => (
          <MenuItem onClick={() => changeLanguage(language)}>
            {language.toUpperCase()}
          </MenuItem>
        )
      ),
    [LANGUAGES, i18n.language]
  );

  const settings: PageSetting[] = [
    { label: "Profile", to: "/user" },
    { label: "Account" },
    { label: "Dashboard" },
    { label: t("SIGN_OUT"), onClick: onSignOutClick },
  ];

  const openLanguageMenu = Boolean(LanguageAnchorEl);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearErrors());
  };

  const handleClickLanguageMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setLanguageAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguageAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" className={styles["navigation-container"]}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={"/"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className={styles["navigation__img"]}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      component={page.to ? Link : "p"}
                      to={page.to}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={page.to ? Link : "p"}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {isLogged ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.label}
                        onClick={setting.onClick || handleCloseUserMenu}
                      >
                        <Typography
                          textAlign="center"
                          component={setting.to ? Link : "p"}
                          to={setting.to || ""}
                        >
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    className={styles["navigation__button"]}
                    onClick={handleOpen}
                  >
                    {t("SIGN_IN")}
                  </Button>
                  <Button
                    variant="outlined"
                    className={`${styles["navigation__button"]} ${styles["navigation__button--sign-up"]}`}
                  >
                    {t("SIGN_UP")}
                  </Button>
                </>
              )}
              <Button
                aria-controls={openLanguageMenu ? "language-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openLanguageMenu ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClickLanguageMenu}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {i18n.language}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={LanguageAnchorEl}
                open={openLanguageMenu}
                onClose={handleCloseLanguageMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {languagesToDisplay}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles["navigation__modal"]}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            className={styles["navigation__modal-header"]}
          >
            {t("SIGN_IN")}
          </Typography>
          <SignIn />
        </Box>
      </Modal>
    </>
  );
};
