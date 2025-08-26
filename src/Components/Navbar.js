import { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchId, setShowForm } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  ListItemIcon,
} from "@mui/material";
import {
  FaDatabase,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaSignOutAlt,
  FaTimes,
  FaAddressBook,
} from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.post.searchId);
  const showSearch = location.pathname === "/maindata";
  const showAddPostButton = location.pathname === "/UserTable";

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAddPostClick = (e) => {
    e.stopPropagation();
    dispatch(setShowForm(true));
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const menuItems = [
    { text: "Maindata", icon: <FaDatabase />, path: "/maindata" },
    { text: "User Table", icon: <FaUsers />, path: "/UserTable" },
    { text: "Chart Dashboard", icon: <FaChartLine />, path: "/chartDashboard" },
    { text: "AddressData", icon: <FaAddressBook />, path: "/addressdata" },
    // {text:"sample,", icon: <FaAddressBook />, path: "/sample" }

  ];
  function setupHistoryTrap() {
    window.history.pushState(null, document.title, window.location.href);

    window.addEventListener("popstate", function (event) {
      event.preventDefault();
      window.history.pushState(null, document.title, window.location.href); //login
    });
  }
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        my: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 8 }}>
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setMobileOpen(false);
          }}
          size="small"
        >
          <FaTimes />
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ my: 2, p: 1 }}>
        User Dashboard
      </Typography>
      <Divider />

      <Box
        className="container"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <List>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.12)",
                      },
                      backgroundColor: isActive
                        ? "rgba(180, 178, 178, 0.42) !important "
                        : "none",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",

                        paddingBottom: "2px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "#240202ff",
                          minWidth: "auto",
                          marginRight: 1,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: "normal",
                          color: "#080808ff",
                        }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {showAddPostButton && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ px: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleAddPostClick}
                  startIcon={<FaPlus />}
                >
                  Add New Post
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            px: 2,
            pb: 2,
            marginTop: "100px",
            width: "100%",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => {
              navigate("/login", { replace: true });

              setupHistoryTrap();
            }}
            startIcon={<FaSignOutAlt />}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
<Box sx={{ display: "flex", justifyContent: 'space-between' }}>
  <CssBaseline />
  <AppBar component="nav" sx={{ 
    boxShadow: "none !important",
    width: "100%",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      zIndex: 1,
    }
  }}>
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        height: "64px",
        justifyContent: { xs: 'space-between', sm: 'space-between' },
        px: { xs: 1, sm: 2 }, 
        pb: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: { xs: 2, sm: 2, md: 1 ,lg:2.5}, pl: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{
            fontSize: { 
              xs: "16px",
              sm: "18px", 
              md: "20px", 
              lg: "24px", 
              xl: "24px" 
            },
            fontWeight: 550,
            letterSpacing: "0.4px",
          }}
        >
          User Dashboard
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "flex" }, 
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          flexShrink: 1,
          minWidth: 0,
          mx: { md: 1, lg: 1 },
          mt: 1,
        }}
      >
        {menuItems.map((item) => (
          <Button
            key={item.text}
            component={Link}
            to={item.path}
            disableRipple
            disableFocusRipple
            disableTouchRipple
            
            sx={{
              color: location.pathname === item.path ? "#1976d2" : "#ffffff",
              fontSize: { 
                md: "10px", 
                lg: "14px", 
                xl: "14px" 
              },
              textTransform: "uppercase",
              fontWeight: 500,
              letterSpacing: "0.5px",
              px: { md: 1, lg: 1.5, xl: 2.5 },
              py: location.pathname === item.path ? 1.8 : 1.5,
              mx: { md: 0.2, lg: 0.25, xl: 0.5 },
              minWidth: "auto",
              whiteSpace: "nowrap",
              pb: 0.5,
              backgroundColor: location.pathname === item.path ? "#ffffff" : "transparent",
              borderRadius: location.pathname === item.path ? "0px 0px 0px 0px" : "0px",
              position: "relative",
              // marginBottom: location.pathname === item.path ? "-1px" : "0px",
              transition: "all linear",
              "&:hover":{
                backgroundColor:"rgba(179, 176, 176, 0.45), 176, 0)",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: location.pathname === item.path ? "#ffffff" : "transparent",
              },
              "&:focus-visible": {
                outline: "none",
                boxShadow: "none",
              },
              "&:after": location.pathname === item.path ? {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                right: 0,
                height: "8px",
                backgroundColor: "#ffffff",
                zIndex: 10,
                transition: "all 0.1s linear",
              } : {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: 0,
                right: 0,
                height: "8px",
                backgroundColor: "transparent",
                zIndex: 10,
                transition: "all 0.1s linear",
              },
              "& .MuiButton-startIcon": {
                transition: "color 0.1s linear",
                color: location.pathname === item.path ? "#1976d2" : "#ffffff",
              },
              "& .MuiButton-text": {
                transition: "color 0.1s linear",
              }
            }}
            startIcon={item.icon}
          >
            {item.text}
          </Button>
        ))}
      </Box>

      <Box sx={{ 
        display: { xs: 'none', sm: "none", md: "flex" }, 
        alignItems: "center", 
        gap: { xs: 1, sm: 2 },
        flexGrow: 0,
        flexShrink: 0, 
        flexBasis: "auto", 
      }}>
        {showSearch ? (
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderRadius: "25px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: { md: "6px 12px", lg: "6px 16px" },
              display: "flex",
              alignItems: "center",
              width: { 
                md: "120px", 
                lg: "185px", 
                xl: "220px" 
              },
              flexShrink: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              },
              "&:focus-within": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.8)", mr: 1, fontSize: { md: 18, lg: 20 } }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "white",
                width: "100%",
                fontSize: { md: "12px", lg: "14px" },
                "& ::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
              }}
              value={searchId}
              onChange={(e) => dispatch(setSearchId(e.target.value))}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex", 
              alignItems: "center",
              width: { 
                md: "120px", 
                lg: "185px", 
                xl: "220px" 
              },
              flexShrink: 0,
              padding: { md: "6px 12px", lg: "6px 16px" },
              backgroundColor: "transparent", 
              border: "none", 
              borderRadius: "0px", 
              visibility: "hidden", 
            }}
          />
        )}

        <IconButton
          sx={{
            color: "white",
            p: 1.5,
            marginRight: "-12px",
            borderRadius: "50%",
            flexShrink: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => {
            navigate("/login", { replace: true });
            setupHistoryTrap();
          }}
        >
          <FaSignOutAlt size={18} />
        </IconButton>
      </Box>


<Box sx= {{display:{xs:'flex', sm:"flex",md:"none"}}}>


         <IconButton
          sx={{
            color: "white",
            p: 1.5,
            pr:2 ,
            marginRight:"-12px",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => {
            navigate("/login", { replace: true });
            setupHistoryTrap();
          }}
        >
          <FaSignOutAlt size={18} />
        </IconButton>
      </Box>






    </Toolbar>
  </AppBar>



      {/* Mobile Drawer */}
      <Box component="nav">
      <Drawer
  elevation={2}
  variant="temporary"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  ModalProps={{ keepMounted: true }}
  sx={{
    "& .MuiDrawer-paper": {
      height: "95%",
      width: drawerWidth,   
      borderRadius: "30px", 
      boxSizing: "border-box",
      overflowX:'hidden',
      marginLeft: "1.5%",
      margin: {md:"1% 1% !important",sm:"3% 3% !important",xs:"3% 3% !important"},
        
     
     
    },
  }}
>
  {drawer}
</Drawer>
      </Box>

    <Box component="main" sx={{ p: 0, mr: mobileOpen ? 0 : 5 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;