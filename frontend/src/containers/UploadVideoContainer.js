import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import UploadVideo from 'components/UploadVideo';

class UploadVideoContainer extends Component {

    handleChangeInput = (e) => {
        const { WorkActions } = this.props;
        const { name, value } = e.target;

        WorkActions.changeInput({name, value});
    };

    handleUpload = async() => {
        const { WorkActions, form } = this.props;
        const { subject, workType, workURL, content  } = form.toJS();

        await WorkActions.uploadWork({subject, workType, workURL, content});
    };

    render() {
        const { form, error } = this.props;
        const { handleChangeInput, handleUpload } = this;

        return (
            <UploadVideo
                forms={form}
                onUpload={handleUpload}
                onChangeInput={handleChangeInput}
            />
        );
    }
}

export default connect(
    (state) => ({
        form: state.work.get('form'),
        error: state.work.get('error'),
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(UploadVideoContainer);