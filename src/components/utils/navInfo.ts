interface nav {
  navHeight: number;
  statusBarHeight: number;
  capsuleLeft: number;
}

// 获取导航栏信息
function navInfo(): nav {
  const {
    top: capsuleTop,
    bottom: capsuleBottom,
    left: capsuleLeft,
  } = wx.getMenuButtonBoundingClientRect();

  const {
    statusBarHeight, // 状态栏高度
  } = wx.getSystemInfoSync();

  const navHeight: number =
    capsuleBottom + capsuleTop - 2 * statusBarHeight; // 导航栏高度

  return {
    navHeight, // 导航栏高度
    statusBarHeight,
    capsuleLeft, // 胶囊左边位置
  };
}

export default function useNavInfo() {
  let n;

  return (function (): nav {
    if (n) {
      return n;
    } else {
      return navInfo();
    }
  })();
}
