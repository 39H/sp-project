import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import UploadText from 'components/UploadText';

class UploadTextContainer extends Component {

    handleChangeInput = (e) => {
        const { WorkActions } = this.props;
        const { name, value } = e.target;

        WorkActions.changeInput({name, value});
    };

    handleUpload = async() => {
        const { WorkActions, form } = this.props;
        const { subject, workType, content  } = form.toJS();

        await WorkActions.uploadWork({subject, workType, content});
    };

    render() {
        const { form, error } = this.props;
        const { handleChangeInput, handleUpload } = this;

        return (
            <UploadText
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
)(UploadTextContainer);