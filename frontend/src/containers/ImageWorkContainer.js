import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import Spinner from 'components/Spinner';

class ImageWorkContainer extends Component {
    componentDidMount() {
        const { WorkActions, workid } = this.props;
        WorkActions.getFiles({workid});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.workid !== this.props.workid) {
            const { WorkActions, workid } = nextProps;
            WorkActions.getFiles({workid});
        }
    }

    render() {
        const { classes, files, loading } = this.props;
        if(files.isEmpty() || loading) {
            return <Spinner/>;
        }

        return (
            <div>
                {files.map(file => {
                    const { id, filePath } = file.toJS();
                    return (
                        <img key={id} className={classes.media} src={'/'+filePath} />
                    );
                })}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        files: state.work.get('files'),
        loading: state.pender.pending['work/GET_FILES'],
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(ImageWorkContainer);