import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';

class UserLoader extends Component {
    checkLoginStatus = async() => {
        const { UserActions, user } = this.props;

        if(!user) {
            try {
                await UserActions.checkLoginStatus();
                await UserActions.getMyInfo();
                await UserActions.getSubscriptions();
            } catch(e) {
                return;
            }
        }
    }
    
    
    // recheck login status... 필요?
    componentDidUpdate(prevProps, prevState) {
        if(!prevProps.user && this.props.user) {
           this.checkLoginStatus();
        }
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    render() {
        return null;
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(UserLoader);