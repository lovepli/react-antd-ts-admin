import React from "react";
import TRTC from "trtc-js-sdk";
import "./style.less";

interface IProps {}

interface IState {
  client: any;
  localStream: any;
}

class Blank extends React.Component<IProps, IState> {
  public async componentDidMount() {
    // (1)创建client对像
    const client = TRTC.createClient({
      mode: "videoCall",
      sdkAppId: "1400359847",
      userId: "wly",
      userSig:
        "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwuU5lVDh4pTsxIKCzBQlK0MTAwNjU0sLE3OITGpFQWZRKlDc1NTUyMDAACJakpkLFrMwt7AwMjcxhZqSmQ40NTwz0N89wyvIXNssMczPLd-f0z-f3yUowjjYOd9Q2zHSL8k9wDE9N8vF0NdWqRYApXkvuw__",
    });
    this.setState({ client });

    // (2)加入房间
    await client.join({ roomId: 1234 });
    // (3)创建本地音视频流
    /*  从麦克风和摄像头采集本地音视频流 */
    const localStream = TRTC.createStream({
      userId: "wly",
      audio: true,
      video: true,
    });

    // (4)初始化本地音视频流
    await localStream.initialize();

    // 播放音视频流
    /* play方法接受一个 div 元素 ID 作为参数，SDK 内部会在该 div 元素下自动创建相应的音视频标签并在其上播放音视频 */
    localStream.play("local_stream");

    // (5)发布本地音视频流
    await client.publish(localStream);
  }

  public componentWillUnmount() {
    this.exit();
  }
  public render() {
    return (
      <div className="blank">
        <div id="local_stream" />
      </div>
    );
  }

  // 创建client对像
  private createClient = () => {
    const client = TRTC.createClient({
      mode: "videoCall",
      sdkAppId: "1400359847",
      userId: "wly",
      userSig:
        "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwuU5lVDh4pTsxIKCzBQlK0MTAwNjU0sLE3OITGpFQWZRKlDc1NTUyMDAACJakpkLFrMwt7AwMjcxhZqSmQ40NTwz0N89wyvIXNssMczPLd-f0z-f3yUowjjYOd9Q2zHSL8k9wDE9N8vF0NdWqRYApXkvuw__",
    });
    this.setState({ client });
  };

  // 创建本地音视频流;
  private createLocalStream = () => {
    /*  从麦克风和摄像头采集本地音视频流 */
    const localStream = TRTC.createStream({
      userId: "wly",
      audio: true,
      video: true,
    });
    this.setState({ localStream });
  };

  // 订阅远端音视频流
  private subscribeStream = () => {
    const { client } = this.state;
    client.on("stream-added", (event) => {
      const remoteStream = event.stream;
      // 订阅远端流
      client.subscribe(remoteStream);
      console.log("远端流增加: " + remoteStream.getId());
    });
    client.on("stream-subscribed", (event) => {
      const remoteStream = event.stream;
      // 播放远端流
      remoteStream.play("remote_stream-" + remoteStream.getId());
      console.log("远端流订阅成功：" + remoteStream.getId());
    });
  };

  // 退出音视频通话
  private exit = async () => {
    const { client } = this.state;
    await client.leave();
    // this.setState({ client: null, localStream: null });
  };
}

export default Blank;
