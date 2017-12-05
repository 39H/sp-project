import React, { Component } from 'react';
import { HeaderContainer, UploadWorkContainer } from 'containers';

class UploadWork extends Component {
    render() {
        const { username:userName } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <UploadWorkContainer />
            </div>
        );
    }
}

export default UploadWork;