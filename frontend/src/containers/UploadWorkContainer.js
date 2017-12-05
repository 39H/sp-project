import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import UploadWork from 'components/UploadWork';

class UploadWorkContainer extends Component {

    componentDidMount() {
        const { WorkActions } = this.props;
        WorkActions.setDefault();
    }

    handleChange = (event, value) => {
        const { WorkActions } = this.props;
        WorkActions.changeInput({ name:'workType', value });
    };

    render() {
        const { WorkActions, form, files, uploadResult, isWorkIdSet, loading } = this.props;
        const { handleChange } = this;

        if(uploadResult) {
            const { id, workType } = uploadResult.toJS();
    
            if(workType === 'image') {
                if(!loading && !isWorkIdSet) {
                    WorkActions.setWorkId({files: files.toJS(), WorkId: id});
                    return null;
                } else if(!isWorkIdSet)
                    return null;
            }
            WorkActions.setDefault();
            return <Redirect to={'/work/'+id}/>
        }

        return (
            <UploadWork
                onChange={handleChange}
                value={form.get('workType')}
            />
        );
    }
}

export default connect(
    (state) => ({
        form: state.work.get('form'),
        files: state.work.get('files'),
        uploadResult: state.work.get('uploadResult'),
        isWorkIdSet: state.work.get('isWorkIdSet'),
        loading: state.pender.pending['work/SET_WORKID'],
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(UploadWorkContainer);