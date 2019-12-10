import React from 'react';
import { Document, Page } from 'react-pdf';
import { Dropdown, Menu, Icon, message, Pagination, Spin } from 'antd';
import scrollTo from '@/utils/scrollTo';
import './style.less';



interface IProps { }

interface IPosition {
  // x,y为以pdf的page左下角为原点的坐标。
  x: number;
  y: number;
  // 章子盖在哪一页
  p: number;
}


interface IState {

  totalPage: number;
  pageNumber: number;
  fileUrl: string;
  signList: any[];
  currentSign: any;
  signLimit: number;
  signPositions: IPosition[];
}

class Pdf extends React.Component<IProps, IState> {
  public readonly state: Readonly<IState> = {
    totalPage: 0,
    pageNumber: 1,
    fileUrl: 'http://www.xdocin.com/xdoc?_key=fedii4dtyfhmvgryqyntfjavte&_func=down&_dir=pdfdemo.pdf',
    signList: [{
      id: '1',
      url: 'https://s2.ax1x.com/2019/10/22/K31yhq.jpg'
    }, {
      id: '2',
      url: 'https://s2.ax1x.com/2019/10/22/K31hB4.jpg'
    }],
    currentSign: {},
    signLimit: 3,
    signPositions: []
  }



  public render() {
    const { pageNumber, totalPage } = this.state;

    return (
      <div className="pdf">

        <Dropdown
          overlay={
            <Menu onClick={this.handleSelectSign}>
              {
                this.state.signList.map((item: any) => (
                  <Menu.Item key={item.id}>
                    <img src={item.url} alt="" />
                  </Menu.Item>
                ))
              }
            </Menu>
          }
        >
          <a>
            <span style={{ fontSize: '17px', marginRight: '5px' }}>签章</span>
            <Icon style={{ fontSize: '6px' }} type="caret-down" />
          </a>
        </Dropdown>

        <Document
          file={this.state.fileUrl}
          loading={<Spin tip="文件加载中..." />}
          onLoadError={this.handleFileLoadError}
          onLoadSuccess={this.handleFileLoadSuccess}
        >
          <Page
            width={800}
            pageNumber={pageNumber}
            renderTextLayer={false}
            onRenderSuccess={this.handlePageRenderSuccess}
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

  // pdf页面渲染成功的回调
  private handlePageRenderSuccess = () => {
    const canvas: any = document.querySelector('.react-pdf__Page__canvas');
    if (canvas) {
      canvas.addEventListener('click', (event: any) => {
        const currentSign = this.state.currentSign;
        // 判断currentSign.url 表示是否选择了要盖的章子。
        if (currentSign.url) {
          const page: any = document.querySelector('.main-content');
          const scrollTop = page.scrollTop;
          const scrollLeft = page.scrollLeft;
          const x = Math.round(event.pageX + scrollLeft - this.getOffset(event.target).left - currentSign.width / 2);
          const y = Math.round(event.pageY + scrollTop - this.getOffset(event.target).top - currentSign.height / 2);
          // this.addSign(event.target, x, y)
        }
      })
    }
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

  // 选择章子
  private handleSelectSign = (menuItem: any) => {
    const selectedSign = this.state.signList.find((item: any) => item.id === menuItem.key);
    const image = new Image();
    image.src = selectedSign ? selectedSign.url : '';
    image.onload = () => {
      this.setState({
        currentSign: {
          url: image.src,
          width: image.width,
          height: image.height
        }
      })
      message.success('已选择章子，请点击pdf页面盖章!')
    }
  }


  // 获取元素相对于浏览器窗口边缘的的位置。
  private getOffset = (obj: any) => {
    const getLeft = (element: any) => {
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    }

    const getTop = (element: any) => {
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      return actualTop;
    }

    return { left: getLeft(obj), top: getTop(obj) };
  }

  /**
   * 坐标转换
   * @param {number} x  鼠标点击位置离pdf页面左侧的距离
   * @param {number} y  鼠标点击位置离pdf页面上方的距离
   */
  private coordinateTransform = (x: number, y: number) => {
    const canvas: any = document.querySelector('.react-pdf__Page__canvas');
    const currentSign = this.state.currentSign;
    // 章子在pdf页面上进行css定位的坐标
    const toCss = () => {
      return {
        x: x - currentSign.width / 2,
        y: y - currentSign.height / 2
      }
    }
    // 云签章系统进行签章使用的坐标，这个坐标是相对于pdf页面左下角的
    const toSystem = () => {
      return {
        x: x - currentSign.width / 2,
        y: canvas.height - (y - currentSign.height / 2)
      }
    }
  }



  /**
   * 创建签章
   * @param {Object} coordinate   签章位置
   */
  private createSign(x: number, y: number) {
    // 负责定位的元素
    const wrap = document.createElement('div');
    wrap.style.position = 'absolute';
    wrap.style.left = x + 'px';
    wrap.style.top = y + 'px';
    wrap.style.cursor = "move";
    wrap.dataset.signId = +new Date() + '';
    wrap.addEventListener('mouseenter', (event: any) => {
      event.target.firstElementChild.style.display = 'block';
    })
    wrap.addEventListener('mouseleave', (event: any) => {
      event.target.firstElementChild.style.display = 'none';
    })
    wrap.addEventListener('click', (event: any) => {
      event.stopPropagation();
    })

    // 拖拽
    wrap.onmousedown = (event: any) => {
      const viewerContainer = document.getElementById('viewerContainer');
      if (!viewerContainer) {
        return;
      }
      const scrollTop = viewerContainer.scrollTop;
      const scrollLeft = viewerContainer.scrollLeft;
      // 鼠标按下时，鼠标到签章外边框的距离，这个距离是固定的
      const borderLeft = event.pageX + scrollLeft - this.getOffset(wrap).left;
      const borderTop = event.pageY + scrollTop - this.getOffset(wrap).top;

      const currentSignPosition: any = this.state.signPositions.find((item: any) => item.id === wrap.dataset.signId);
      let x = 0;
      let y = 0;
      if (currentSignPosition) {
        x = currentSignPosition.x;
        y = currentSignPosition.y;
      }

      const page: any = wrap.parentNode;
      const maxSignLeft = page.offsetWidth - wrap.offsetWidth;
      const maxSignTop = page.offsetHeight - wrap.offsetHeight;
      page.onmousemove = (event: any) => {
        x = event.pageX + scrollLeft - this.getOffset(page).left - borderLeft;
        y = event.pageY + scrollTop - this.getOffset(page).top - borderTop;
        if (x > 0 && x < maxSignLeft) {
          wrap.style.left = x + "px";
        }
        if (y > 0 && y < maxSignTop) {
          wrap.style.top = y + "px";
        }
        // 拖动太快可能会选中HTML中的文本，需要清除这种选中。
        window.getSelection()!.removeAllRanges();
      }

      const currentSignPositionIndex: any = this.state.signPositions.findIndex((item: any) => item.id === wrap.dataset.signId);
      document.onmouseup = () => {
        page.onmousemove = null;
        this.state.signPositions[currentSignPositionIndex].x = x;
        this.state.signPositions[currentSignPositionIndex].y = y;
      };
    };

    // 包裹签章的边框元素
    const border = document.createElement('div');
    border.className = 'sign-border';
    border.style.width = this.state.currentSign.width + 'px';
    border.style.height = this.state.currentSign.height + 'px';

    // 去除签章的按钮元素，它被包含在边框元素中。
    const close = document.createElement('span');
    close.innerText = '×';
    close.className = 'close';
    close.addEventListener('click', (event: any) => {
      event.stopPropagation();
      const signWrap = event.target.parentNode.parentNode;
      const page = signWrap.parentNode;
      this.removeSign(page, signWrap);
    });

    // 签章元素
    const sign = document.createElement('img');
    const currentSign = this.state.currentSign;
    sign.setAttribute('src', currentSign.url);
    sign.style.width = currentSign.width + 'px';
    sign.style.height = currentSign.height + 'px';

    border.appendChild(close);
    wrap.appendChild(border);
    wrap.appendChild(sign);
    return wrap;
  }


  /**
   * 添加签章
   * @param {ElementNode} page  签章所要添加到的页面
   * @param {Number} x   签章相对于页面的横坐标
   * @param {Number} y   签章相对于页面纵坐标
   */
  private addSign(page: any, x: number, y: number) {
    const signLimit = this.state.signLimit;
    if (this.state.signPositions.length >= signLimit) {
      message.error(`签章数量不能大于${signLimit}个`);
      return;
    }
    const sign = this.createSign(x, y);
    page.appendChild(sign);
    const signPosition = {
      id: sign.dataset.signId,
      pageNumber: page.dataset.pageNumber,
      x,
      y,
      signInfo: Object.assign({}, this.state.currentSign)
    };
    // this.state.signPositions.push(signPosition);
  }


  // 删除签章
  private removeSign = (page: any, signWrap: any) => {
    page.removeChild(signWrap);
    const signId = signWrap.dataset.signId;
    this.state.signPositions.find((item: any) => item.id === signId)
    this.state.signPositions.splice(signId, 1)
  }
}

export default Pdf;
