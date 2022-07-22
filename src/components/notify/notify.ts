/**
 * use
 * <i-notify id="i-notify"></i-notify>
 *
 * notify({
 *   message: 'hello',
 *   duration: 1000,
 * })
 *
 * or
 *
 * notify.success({
 *   message: 'hello',
 * })
 */

interface options {
  message: string;
  selector?: string;
  type?: string;
  duration?: number;
  icon?: string;
  showIcon?: boolean;
  position?: string;
  backgroundColor?: string;
  color?: string;
  context?: WechatMiniprogram.Page.Instance<
    WechatMiniprogram.IAnyObject,
    WechatMiniprogram.IAnyObject
  >;
}

const defaultOptions = {
  selector: '#i-notify',
  showIcon: true,
  type: 'info',
  position: 'bottom',
};

// 获取上下文
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export default function notify(options: options) {
  options = Object.assign(defaultOptions, options);
  const context = options.context ?? getContext();

  // 组件节点
  const node = context.selectComponent(options.selector!);

  // 不要把无关的东西传给组件
  delete options.context;
  delete options.selector;

  if (node) {
    node.setData({ ...options });
    node.show();
  } else {
    console.warn('未找到 i-notify 节点');
  }
}

['positive', 'negative', 'info', 'warning'].forEach((e) => {
  (notify as any)[e] = function (options: options) {
    options = Object.assign(options, {
      type: e,
    });

    notify(options);
  };
});
