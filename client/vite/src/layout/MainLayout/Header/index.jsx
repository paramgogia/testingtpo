import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// project imports
import LogoSection from '../LogoSection';
import TPOLogo from './TPOLogo';
import h24 from './header_images/2024.png';
import h23 from './header_images/2023.png';
import h22 from './header_images/2022.png';
import h21 from './header_images/2021.png';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //
import PieChart from 'views/dashboard/Components/PieChart';

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageOpen = (image) => {
    const newWindow = window.open();
    newWindow.document.write(`<img src="${image}" style="width:100%;height:auto;" />`);
    handleClose();
  };
  const headerStyle = {
    transition: 'all 0.3s ease',
    height: isScrolled ? '50px' : '70px', // Adjust heights as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'fit-content',
    margin: '0',
    padding: '0'
  };
 
  const linkStyle = {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: '1.13rem',
    fontWeight: 500,
    margin: '20px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main, // Change color on hover
    }
  };
  return (
    <Box sx={headerStyle}>
      <LogoSection /> {/* This LogoSection will be positioned in the left corner */}

      <Box sx={{ flexGrow: 1 }} />

      {/* Conditionally render the TPOLogo based on scroll state */}
      {!isScrolled && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TPOLogo /> {/* This will be positioned in the left corner */}
        </Box>
      )}
 {/* Pushes the right LogoSection to the extreme right */}

 <Box
        component="nav"
        sx={{
          display: { xs: 'none', md: 'flex' }, // Hidden on extra small devices
          alignItems: 'center',
          marginRight: '40px',
          position: 'fixed',  // Keep the nav fixed on the right side
          right: '20px',  // Position it on the right
          top: isScrolled ? '10px' : '20px',  // Adjust vertical position based on scroll
        }}
      >
        <Typography component="a" href="https://online.fliphtml5.com/yrhqk/urgp/#p=1" target='blank' sx={linkStyle}>
          Brochure
        </Typography>
        <Typography
          
          onClick={handleClick}
          sx={{ ...linkStyle, cursor: 'pointer' }}
        >
          Statistics
        </Typography>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
         
        >
          <MenuItem onClick={() => handleImageOpen(h24)}>2023-24</MenuItem>
          <MenuItem onClick={() => handleImageOpen(h23)}>2022-23</MenuItem>
          <MenuItem onClick={() => handleImageOpen(h22)}>2021-22</MenuItem>
          <MenuItem onClick={() => handleImageOpen(h21)}>2020-21</MenuItem>
        </Menu>
        <Typography component="a" href="#team" sx={linkStyle}>
          Our Team
        </Typography>
        <Typography component="a" href="#footer" sx={linkStyle}>
          Contact Us
        </Typography>
      </Box>
    </Box>  
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
