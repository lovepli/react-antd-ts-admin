// 缓动公式
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  let time = t;
  time /= d / 2;
  if (time < 1) {
    return (c / 2) * time * time + b;
  }
  time--;
  return (-c / 2) * (time * (time - 2) - 1) + b;
};



// 设置要滚动到的位置
const setScrollTo = (element: Element | Window, target: number) => {
  if (element === window) {
    document.body.scrollTop = target;
    document.documentElement.scrollTop = target;
  } else {
    (element as Element).scrollTop = target;
  }
}

// 获取当前已经滚动到的位置。
const getCurrentScroll = (element: Element | Window) => {
  if (element === window) {
    return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
  }
  return (element as Element).scrollTop;
}

/**
 * 滚动
 * @param {Element | Window} element 要滚动的元素
 * @param {Number} to 要滚动到的最终位置
 * @param {Number} duration    持续时间
 * @param { Function} callback  滚动完成后的回调函数
 */
export const scrollTo = (element: Element | Window, to: number, duration: number = 500, callback?: any) => {
  const start = getCurrentScroll(element);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  const animateScroll = () => {
    currentTime += increment;
    const target = easeInOutQuad(currentTime, start, change, duration);
    setScrollTo(element, target);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  };
  animateScroll();
}

