import React from "react";
import { Upload, message, Button, Icon } from "antd";

import FileTable from "@/components/FileTable/FileTable";

class FileTableDemo extends React.Component {

  public state = {
    fileData: null
  };


  public handle = {
    download(id) {
      console.log(id);
    },
  }

  public download(id) {
    console.log(id);
  }

  public sign(id) {
    console.log(id);
  }
  public delete(id) {
    console.log(id);
  }

  public render() {
    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text"
      },
      onChange: (info) => {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          this.setState({
            fileData: {
              ...info.file,
              ...{
                download: this.download,
                sign: this.sign,
                delete: this.delete
              }
            }
          });
          message.success(`${info.file.name}上传成功`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name}上传失败`);
        }
      }
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <FileTable fileData={this.state.fileData} />
      </div>
    );
  }
}

export default FileTableDemo;
