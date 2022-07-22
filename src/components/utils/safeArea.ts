export default function useSafeHeight(): number {
  let safeHeight;

  return (function () {
    if (safeHeight) {
      return safeHeight;
    } else {
      const {
        safeArea: { height },
      } = wx.getSystemInfoSync();
      
      return height - 60;
    }
  })();
}
