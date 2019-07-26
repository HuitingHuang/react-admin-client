import React from 'react'
import {Upload, Icon,Modal,} from 'antd'
/* 用于图片上传的组件 */
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export default class PicturesWall extends React.Component {
    state = {
      previewVisible: false,//标识是否显示大图预览Modal
      previewImage: '', //大图的url
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        
      ],
    };

    /* 隐藏Modal */
    handleCancel = () => this.setState({ previewVisible: false });
  
    handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    };
    
    //file：当前操作的图片文件（上传/删除）
    //fileList:所有已上传图片的数组
    handleChange = ({ file, fileList }) => {
        console.log('handleChange()',file.status,fileList.length,file)
        //及时更新fileList
        this.setState({ fileList });
    }
  
    render() {
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <div className="clearfix">
          <Upload
            action="/manage/img/upload"//上传图片的接口
            accept='image/*'//只接受任意格式的图片
            name='image' //请求参数名
            listType="picture-card" //卡片样式
            fileList={fileList} //指定所有已上传图片对象的列表
            onPreview={this.handlePreview} 
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
    }
  }