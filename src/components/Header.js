import React from 'react';
import { Link } from 'react-router';
import './Header.css';

const MenuItem = ({active, children, to}) => (
    <Link to={to} className={`menu-item ${active ? 'active': ''}`}>
            {children}
    </Link>
);

const Header = (props, context) => {
    const { router } = context;
    return (
        <div>
            <div className="logo">
                <MenuItem to={'/SignIn'} active={router.isActive('/SignIn', true)}>Sign In</MenuItem>&nbsp;
                <MenuItem to={'/SignUp'} active={router.isActive('/SignUp', true)}>Sign Up</MenuItem>
            </div>
            <div className="menu">
                <MenuItem to={'/Recent'} active={router.isActive('/', true)}>Recent</MenuItem>&nbsp;
                <MenuItem to={'/MostLiked'} active={router.isActive('/MostLiked')}>Most Liked</MenuItem>&nbsp;
                
            </div>
            <div>
                
            </div>
        </div>
    );
};

Header.contextTypes = {
    router: React.PropTypes.object
}

export default Header;