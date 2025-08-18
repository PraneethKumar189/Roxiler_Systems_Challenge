import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import Navbar from "./Navbar";

interface SidebarProps {
  role: "admin" | "storeOwner" | "user";
}

function AppSidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  
  const menus = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Users", path: "/admin/users" },
      { name: "Stores", path: "/admin/stores" },
      {name:"Add Users",path:"/admin/addUsers"},
      {name:"Add Stores",path:"/admin/addStores"},
      {name:"Manage Users ",path:"/admin/manageUsers"},
      {name:"Logout",path:"/admin/logout"}
    ],
    storeOwner: [
      { name: "Store Home", path: "/store/home" },
      { name: "Products", path: "/store/products" },
      { name: "Orders", path: "/store/orders" },
    ],
    user: [
      { name: "Stores", path: "/user/home" },
      { name: "Profile", path: "/user/profile" },
      { name: "Logout", path: "/user/orders" },
    ],
  };

  return (<div><Navbar setToggled={setToggled} />
    <div style={{ display: "flex", height: "100vh" }}>
        
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={(event) => setToggled((event.target as HTMLInputElement).checked)}
      >
        <Menu>
          {menus[role].map((item, index) => (
            <MenuItem key={index}>{item.name}</MenuItem>
          ))}
        </Menu>
      </ProSidebar>


      <main style={{ flex: 1, padding: "1rem" }}>
        <button onClick={() => setCollapsed(!collapsed)}>
          Toggle Collapse
        </button>
        <button onClick={() => setToggled(!toggled)}>
          Toggle Mobile
        </button>
        <h1>{role.toUpperCase()} Module</h1>
      </main>
    </div>
    </div>
  );
}

export default AppSidebar;
