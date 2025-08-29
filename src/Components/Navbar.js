import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchId, setShowForm } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import {

  Container as BContainer,
  Button as BButton,
} from "react-bootstrap";
import {
  FaDatabase,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaAddressBook,
} from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

import "./Css/nav.css";
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
  ];

  function setupHistoryTrap() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      event.preventDefault();
      window.history.pushState(null, document.title, window.location.href);
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
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
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

      <Typography variant="h6" sx={{ my: 1.5, p: 0.5, fontSize: "1.1rem" }}>
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
          <List sx={{ py: 1 }}>
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
                      py: 1,
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
                        py: 0.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "#240202ff",
                          minWidth: "auto",
                          marginRight: 1,
                          fontSize: "16px",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontWeight: "normal",
                          color: "#080808ff",
                          fontSize: "0.9rem",
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
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ px: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleAddPostClick}
                  startIcon={<FaPlus />}
                  size="small"
                  sx={{ py: 1, fontSize: "0.85rem" }}
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
            marginTop: "80px",
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
            size="small"
            sx={{ py: 1, fontSize: "0.85rem" }}
          >
            LOGOUT
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>  
  
    {/*------------- main container--------- */}

 <BContainer 
  fluid 
  className=" d-flex flex-row justify-content-between align-items-center flex-nowrap cus-toolbar"
  style={{ 
    backgroundColor: '#1976d2',
    maxWidth: "100%",
    minWidth: "100%",
    height: "60px",
    minHeight: "52px",
    // zIndex: 1000,
    // position:'fixed',
    
  }}
>
        
            
 {/*-------------- menu + typo------------*/}
 <div
              className="d-flex align-items-center .left-container"
              style={{
                minWidth: 0,
                flex: '0 0 auto',
                // border:"1px solid yellow",
              }}
            >
              <button
                type="button"
                className="btn btn-link p-0 me-2 IconButton icon"
                aria-label="Open drawer"
                onClick={handleDrawerToggle}
                style={{
                  color: 'white',
                  fontSize: window.innerWidth < 576 ? '20px' :
                    window.innerWidth < 768 ? '22px' :
                      window.innerWidth < 992 ? '24px' : '26px',
                  textDecoration: 'none',
                  boxShadow: 'none'
                }}
              >
                <FaBars size={15}  className="icon" style={{marginBottom:"5px"}}/>
              </button>
              <span
                className="navbar-brand text-white fw-small mb-0 flex-shrink-0 typo-container"
                style={{
                  fontSize:  ' 20px' ,
                    
                  fontWeight: 550,
                  letterSpacing: '0.1px',
                  whiteSpace: 'nowrap'
                }}
              >
                User Dashboard
              </span>
            </div>
            {/* ==============================center container ============================= */}
            <div
              className="d-none d-md-flex justify-content-center flex-grow-auto align-items-center h-100 mx-2  tab-conatiner"
              style={{
                // border:"1px solid black",
                gap: window.innerWidth >= 992 ? '12px' : '8px',
                height: '100%',
               }}
            >
              {menuItems.map((item) => (
                <BButton
                  key={item.text}
                  as={Link}
                  to={item.path}
                  className="text-uppercase d-flex align-items-center"
                  style={{
                    gap: '6px',
                    borderRadius: '0px',
                    height:location.pathname === item.path ? '62px' :'100%',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    paddingTop: '10px',
                    paddingBottom: '6px',
                    letterSpacing: '0.4px',
                    border: location.pathname === item.path ? '#ffffff' : '#1976d2',
                    color: location.pathname === item.path ? '#1976d2' : '#ffffff',
                    backgroundColor: location.pathname === item.path ? '#ffffff' : '#1976d2',
                    fontWeight: 500,
                    fontSize: '12px',
                    minWidth: 'auto',
                    whiteSpace: 'nowrap',
                    // border: 'none',
                    outline: 'none !important',
                    boxShadow: 'none !important'
                  }}
                >
                  {item.icon && (
                    <span
                      className="d-flex align-items-center"
                      style={{ fontSize: '14px' }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span style={{ marginLeft: item.icon ? '3px' : 0 }}>
                    {item.text}
                  </span>
                </BButton>
              ))}
            </div>



            {/*========= search + exit========== */}
            <div
              className="d-none d-md-flex align-items-center  bg-yellow tab-conatiner"
              style={{
                gap: window.innerWidth >= 576 ? '12px' : '4px',
                flex: '0 0 auto'
              }}
            >
              {showSearch ? (
                <div
                  className="d-flex align-items-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: window.innerWidth >= 992 ? '6px 14px' : '4px 10px',
                    width: window.innerWidth >= 1200 ? '200px' :
                      window.innerWidth >= 992 ? '160px' : '100px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <SearchIcon
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginRight: '6px',
                      fontSize: window.innerWidth >= 992 ? '18px' : '16px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border-0 bg-transparent text-white w-100"
                    style={{
                      outline: 'none',
                      fontSize: window.innerWidth >= 992 ? '13px' : '11px'
                    }}
                    value={searchId}
                    onChange={(e) => dispatch(setSearchId(e.target.value))}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: window.innerWidth >= 1200 ? '200px' :
                      window.innerWidth >= 992 ? '160px' : '100px',
                    padding: window.innerWidth >= 992 ? '6px 14px' : '4px 10px',
                    visibility: 'hidden'
                  }}
                />
              )}
              <button
                className="btn btn-link p-0 me-2 IconButton "
               
              onClick={() => {
                  navigate("/login", { replace: true });
                  setupHistoryTrap();
                }}
                 style={{
                  color: 'white',
                  fontSize: window.innerWidth < 576 ? '20px' :
                    window.innerWidth < 768 ? '22px' :
                      window.innerWidth < 992 ? '24px' : '26px',
                  textDecoration: 'none',
                  boxShadow: 'none'
                }}
              >
                <FaSignOutAlt size={15} style={{marginBottom:"5px"}}/>
              </button>
            </div>












            {/* =======moblie exit container======== */}
            <div className="d-md-none right-side-icon">
              <button
                className="btn btn-link p-0 me-2"
               
              onClick={() => {
                  navigate("/login", { replace: true });
                  setupHistoryTrap();
                }}
                 style={{
                  color: 'white',
                  fontSize: window.innerWidth < 576 ? '20px' :
                    window.innerWidth < 768 ? '22px' :
                      window.innerWidth < 992 ? '24px' : '26px',
                  textDecoration: 'none',
                  boxShadow: 'none'
                }}
              >
                <FaSignOutAlt size={15} style={{marginBottom:"5px"}}/>
              </button>
            </div>
          </BContainer>
       
   






        <Box component="nav" >
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
                overflowX: "hidden",
                marginLeft: "1.5%",
                margin: {
                  md: "1% 1% !important",
                  sm: "3% 3% !important",
                  xs: "3% 3% !important",
                },
               zIndex: "4500 !important",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

    </>
  );
};

export default Navbar;