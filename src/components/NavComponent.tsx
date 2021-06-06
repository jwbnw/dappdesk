import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'shards-react';

export const NavComponent: React.FC<any> = ({}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink>
                    <Link style={{ color: 'green' }} to="/userdapps">
                        My DApps
                    </Link>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <Link style={{ color: 'green' }} to="/appaggregator">
                        Explore DApps
                    </Link>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <Link style={{ color: 'green' }} to="/currentaccount">
                        Address Tool
                    </Link>
                </NavLink>
            </NavItem>
        </Nav>
    );
};
