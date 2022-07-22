export default function useSafeArea(): WechatMiniprogram.SafeArea {
  let safeArea;

  return (function () {
    if (safeArea) {
      return safeArea;
    } else {
      const { safeArea: a } = wx.getSystemInfoSync();
      safeArea = a;

      return safeArea;
    }
  })();
}
