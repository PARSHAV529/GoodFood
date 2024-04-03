import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const options = ['Delete', 'Update'];

const ITEM_HEIGHT = 48;

export default function LongMenu({name,onDelete,updateForm,product}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://goodfood-909g.onrender.com/api/delete-menuItem/${name}`);
      if (response.status === 200) {
        // Handle success
        onDelete("deleted")
        console.log('Menu item deleted successfully');
      } else {
        // Handle error
        console.error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

 

  const onupdate= ()=>{

    updateForm(product)

  }

  const handleOptionClick = (option) => {
    // Perform actions based on the selected option
    switch (option) {
      case 'Delete':
        // Perform delete action
        handleDelete()
        console.log('Delete clicked');
        break;
      case 'Update':
        // Perform update action
        onupdate()
        console.log('Update clicked');
        break;
      default:
        // Handle other options
        break;
    }
    // Close the menu after handling the click
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
