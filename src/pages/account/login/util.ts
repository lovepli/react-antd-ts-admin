import  {randomNum} from '@/utils/core'

/*
  生成验证码
 */
export const createCaptcha = (canvas: any): string => {
    const ctx = canvas.getContext('2d')
    const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let captcha = ''
    ctx.clearRect(0, 0, 80, 39)
    for (let i = 0; i < 4; i++) {
      const char = chars[randomNum(0, 57)]
      captcha += char
      // 设置字体随机大小
      ctx.font = randomNum(20, 25) + 'px SimHei'
      // 文字颜色
      ctx.fillStyle = '#D3D7F7'
      ctx.textBaseline = 'middle'
      // 文字边缘阴影，执照模糊效果
      ctx.shadowOffsetX = randomNum(-3, 3)
      ctx.shadowOffsetY = randomNum(-3, 3)
      ctx.shadowBlur = randomNum(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      const x = 80 / 5 * (i + 1)
      const y = 39 / 2
      const deg = randomNum(-25, 25)
      // 设置旋转角度和坐标原点
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(char, 0, 0)
      // 恢复旋转角度和坐标原点
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    }
    return captcha;
  }