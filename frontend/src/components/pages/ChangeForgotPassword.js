import React, { Component } from 'react';
import { HeaderContainer, ChangeForgotPasswordContainer } from 'containers';

class ChangeForgotPassword extends Component {
    render() {
        const { code } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <ChangeForgotPasswordContainer code={code} />
            </div>
        );
    }
}

export default ChangeForgotPassword;