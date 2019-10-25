import React from 'react';
import { Document, Page } from 'react-pdf';
import { message, Pagination, Spin } from 'antd';
import scrollTo from '@/utils/scrollTo';
import './style.less';

interface IProps {

}

interface IState {
  totalPage: number;
  pageNumber: number;
  fileUrl: string;
}

class Pdf extends React.Component<IProps, IState> {

  public readonly state: Readonly<IState> = {
    totalPage: 0,
    pageNumber: 1,
    fileUrl: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf'
  }


  public render() {
    const { pageNumber, totalPage } = this.state;

    return (
      <div className="pdf">
        <Document
          file={this.state.fileUrl}
          loading={<Spin tip="文件加载中..." />}
          // renderMode="svg"
          onLoadError={this.handleFileLoadError}
          onLoadSuccess={this.handleFileLoadSuccess}
        >
          <Page
            width={800}
            renderTextLayer={false}
            pageNumber={pageNumber}
          />
        </Document>

        <Pagination
          showQuickJumper
          defaultCurrent={1}
          total={totalPage}
          onChange={this.handlePagination}
        />
      </div>
    );
  }

  // 文件加载成功的回调
  private handleFileLoadSuccess = ({ numPages }) => {
    this.setState({
      totalPage: numPages
    });
  }

  // 文件加载失败的回调
  private handleFileLoadError = (error: any) => {
    message.error('文件加载失败');
  }

  // 翻页
  private handlePagination = (pageNumber: number) => {
    this.setState({
      pageNumber
    })
    const content = document.querySelector('.main-content');
    if (content) {
      scrollTo(content, 0, 500)
    }
  }
}

export default Pdf;
