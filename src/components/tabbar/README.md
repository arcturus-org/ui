# tabbar

## Usage

在根目录下创建 custom-tab-bar(具体参考[微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html))

index.json

```json
{
    "component": true,
    "usingComponents": {
        "ice-tabbar": "../components/tabbar/index",
        "ice-tabbar-item": "../components/tabbar-item/index"
    }
}
```

index.ts
```ts
Component({
  data: {
    selected: 0,
    list: [
      {
        path: '/pages/home/index',
        activeIcon: 'ri ri-stack-fill',
        inactiveIcon: 'ri ri-stack-line',
      },
      {
        path: '/pages/about/index',
        activeIcon: 'ri ri-user-smile-fill',
        inactiveIcon: 'ri ri-user-smile-line',
      },
    ],
  },
  methods: {
    onChange(e) {
      const { idx } = e.detail;

      this.setData({ selected: idx });

      wx.switchTab({
        url: this.data.list[idx].path,
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        selected: this.data.list.findIndex(
          (item) => item.path === `/${page!.route}`
        ),
      });
    },
  },
});
```

index.wxml
```html
<ice-tabbar
  selected="{{ selected }}"
  bind:change="onChange"
>
  <ice-tabbar-item
    wx:for="{{list}}"
    wx:key="index"
    active-icon="{{item.activeIcon}}"
    inactive-icon="{{item.inactiveIcon}}"
  ></ice-tabbar-item>
</ice-tabbar>
```

另外在每个页面的 onShow 中调用 init

```ts
Page({
    onShow() {
        this.getTabBar().init();
    },
})
```