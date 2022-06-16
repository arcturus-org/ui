Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../tabbar-item/index': {
      type: 'child',
    },
  },
  properties: {
    shadow: {
      // 是否有阴影
      type: Boolean,
      value: true,
    },
    blur: {
      // 是否开启磨砂背景
      type: Boolean,
      value: true,
    },
    backgroundColor: {
      type: String,
      value: 'rgba(255, 255, 255, 0.8)',
    },
    selected: {
      type: Number,
      value: 0,
    },
    fixed: {
      // 是否固定在底部
      type: Boolean,
      value: true,
    },
  },
  data: {
    current: 0,
    children: [],
  },
  methods: {
    switchTab(idx: number): void {
      // 取消激活
      this.data.children[this.data.current].deActivate();

      this.setData({
        current: idx,
      });

      // 允许外部获取当前 idx
      this.triggerEvent('change', { idx });
    },
  },
  lifetimes: {
    ready() {
      const nodes = this.getRelationNodes(
        '../tabbar-item/index'
      );

      this.setData({
        children: nodes, // 保存子节点
        current: this.data.selected,
      });

      // 父组件准备完成, 把相关子组件激活
      nodes[this.data.selected].activate();
    },
  },
  observers: {
    selected: function (n: number) {
      if (this.data.children.length > 0) {
        this.data.children[this.data.current].deActivate(); // 取消激活当前子节点
        this.data.children[n].activate();
      }

      this.setData({
        current: n,
      });
    },
  },
});
