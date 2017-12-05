import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import UploadImage from 'components/UploadImage';

class UploadImageContainer extends Component {

    handleChangeInput = (e) => {
        const { WorkActions } = this.props;
        const { name, value } = e.target;

        WorkActions.changeInput({name, value});
    };

    handleUpload = async() => {
        const { WorkActions, files, form } = this.props;
        const { subject, workType, content  } = form.toJS();

        /* todo: 썸네일 생성 */
        if(files.isEmpty()) {
            return; // 에러 출력? // 파일이 없읍니다
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 320;
        canvas.height = 180;

        const img = new Image();
        img.onload = async () => {
            let scaledHeight = 0, scaledWidth = 0;
            let left = 0, top = 0;

            const width  = img.naturalWidth  || img.width;
            const height = img.naturalHeight || img.height;

            ctx.drawImage(img, 0, 0, width, height, 0, 0, 320, 180);
            await WorkActions.uploadThumbnail({image: canvas.toDataURL()});
            const { thumbnail } = this.props;
            await WorkActions.uploadWork({subject, workType, content, thumbnail});
        };
        img.src = '/' + files.first().get('filePath');
    };

    handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('img', file);
        
        const { WorkActions } = this.props;
        await WorkActions.uploadFile({formData});
    };

    render() {
        const { form, files, error } = this.props;
        const { handleChangeInput, handleUpload, handleImageChange } = this;

        return (
            <UploadImage
                forms={form}
                files={files}
                onUpload={handleUpload}
                onChangeInput={handleChangeInput}
                onImageChange={handleImageChange}
            />
        );
    }
}

export default connect(
    (state) => ({
        form: state.work.get('form'),
        files: state.work.get('files'),
        thumbnail: state.work.get('thumbnail'),
        error: state.work.get('error'),
        loading: state.pender.pending['work/UPLOAD_FILE'],
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(UploadImageContainer);