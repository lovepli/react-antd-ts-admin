import React from 'react';
import { Table, Divider } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import SvgIcon from '@/components/SvgIcon';

import { calcFileSize, getFileIcon } from '@/utils/file';
import moment from 'moment';


interface IFileData {
  key: string;
  icon: string;
  name: string;
  size: string;
  time: string;
  download: () => void;
  sign: () => void;
  delete: () => void;
}

interface IFileTableProps {
  fileData: any
}

class FileTable extends React.Component<IFileTableProps> {
  public data: IFileData[] = [];

  public columns: ColumnProps<IFileData>[] = [{
    title: '文件名',
    dataIndex: 'name',
    render: (text: string, record: IFileData) => (
      <span>
        <SvgIcon type={record.icon} />
        <span style={{ marginLeft: "6px" }}>{text}</span>
      </span>
    )
  }, {
    title: '大小',
    dataIndex: 'size',
  }, {
    title: '上传时间',
    dataIndex: 'time',
  }, {
    title: '操作',
    dataIndex: 'handle',
    render: (text: any, record: IFileData) => (
      <span>
        {
          record.download ?
            <span>
              <a href="javascript:;" onClick={record.download.bind(this, record.key)}>下载</a>
              <Divider type="vertical" />
            </span> : ""
        }
        {
          record.sign ?
            <span>
              <a href="javascript:;" onClick={record.sign.bind(this, record.key)}>签章</a>
              <Divider type="vertical" />
            </span> : ""
        }
        {
          record.delete ?
            <span>
              <a href="javascript:;" onClick={record.delete.bind(this, record.key)}>删除</a>
            </span> : ""
        }
      </span>
    )
  }]

  public componentWillUpdate(nextProps: IFileTableProps) {
    const file = nextProps.fileData;
    this.data.push({
      key: file.uid,
      icon: getFileIcon(file.name),
      name: file.name,
      size: calcFileSize(file.size),
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      download: file.download,
      sign: file.sign,
      delete: file.delete
    })
  }

  public render() {
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <Table columns={this.columns} dataSource={this.data} pagination={false} size="small" />
      </div>
    )
  }
}

export default FileTable;

