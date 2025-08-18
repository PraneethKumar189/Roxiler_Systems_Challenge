import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const User = () => {
  return <div>
    <Sidebar>
        <Menu>   
            <MenuItem>Profile</MenuItem>
            <MenuItem>Stores</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Menu>
    </Sidebar>
  </div>;
};

export default User;
