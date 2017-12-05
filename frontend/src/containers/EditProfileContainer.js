import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';

import EditProfile from 'components/EditProfile';

class EditProfileContainer extends Component {

    componentDidMount() {
        const { UserActions } = this.props;
        UserActions.setDefault();
    }

    handleChangeInput = (e) => {
        const { UserActions } = this.props;
        const { name, value } = e.target;

        UserActions.changeInput({name, value});
    };

    handleChangePhoto = async (e) => {
        const { UserActions } = this.props;

        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 126;
        canvas.height = 126;

        const img = new Image();
        img.onload = async () => {
            let scaledHeight = 0, scaledWidth = 0;
            let left = 0, top = 0;

            const width  = img.naturalWidth  || img.width;
            const height = img.naturalHeight || img.height;

            if(width>height) {
                scaledHeight = 126;
                scaledWidth = width * 126 / height;
                top = 0;
                left = -(scaledWidth - 126)/2;
            } else {
                scaledWidth = 126;
                scaledHeight = height * 126 / width;
                left = 0;
                top = -(scaledHeight - 126)/2;
            }

            ctx.drawImage(img, left, top, scaledWidth, scaledHeight);
            await UserActions.uploadPhoto({image: canvas.toDataURL()});
        };
        img.src = url;
    };

    handleEdit = async () => {
        const { UserActions, form } = this.props;
        const { profile } = form.toJS();
        await UserActions.editProfile({profile});
    };

    render() {
        const { UserActions, user, userInfo, form, editResult } = this.props;
        const { handleChangeInput, handleChangePhoto, handleEdit } = this;
        
        if(!user) {
            return null;
        }

        if(editResult) {
            UserActions.setDefault();
            return <Redirect to={'/portfolio/'+user.get('userName')}/>
        }

        return (
            <EditProfile
                userInfo={userInfo}
                forms={form}
                onChangeInput={handleChangeInput}
                onChangePhoto={handleChangePhoto}
                onEdit={handleEdit}
            />
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        form: state.user.get('form'),
        userInfo: state.user.get('info'),
        editResult: state.user.get('editResult'),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(EditProfileContainer);