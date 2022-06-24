import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const AppNavbar = () => {
    let user_email = localStorage.getItem("user_email");
    if (!user_email) {
        user_email = "";
    }
    if (window.location.pathname === "/") {
        user_email = "";
    }

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        window.location = "/";
    };

    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand className="text-white" href="/">
                    Hackerforces
                </NavbarBrand>
                {user_email ? (
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="text-white">
                                {user_email}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="text-white"
                                href="#"
                                onClick={handleLogOut}
                            >
                                Log Out
                            </NavLink>
                        </NavItem>
                    </Nav>
                ) : (
                    <></>
                )}
            </Navbar>
        </div>
    );
};

export default AppNavbar;
