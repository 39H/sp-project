import React, { Component } from 'react';
import { HeaderContainer, EditProfileContainer } from 'containers';

class Profile extends Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <EditProfileContainer/>
            </div>
        );
    }
}

export default Profile;