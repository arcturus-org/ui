Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../tabbar-item/index': {
      type: 'child',
    },
    '../pages/index': {
      type: 'parent',
    },
  },
  properties: {
    selected: {
      // 选中的 tab
      type: Number,
      value: 0,
    },
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
  },
  data: {
    children: <any>[],
    current: 0,
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
        children: nodes,
        current: this.data.selected,
      });

      if (nodes.length > 0) {
        // 父组件准备完成, 把相关子组件激活
        nodes[this.data.selected].activate();
      }

      this.createSelectorQuery()
        .in(this)
        .select('.i-tabbar__container')
        .fields({ node: true, size: true })
        .exec((res) => {
          const width = (res[0].width - 50) / nodes.length;
          nodes.forEach((node) => {
            node.setWidth(width);
          });
        });
    },
  },
  observers: {
    selected: function (n: number) {
      if (this.data.children.length > 0) {
        this.data.children[this.data.current].deActivate();
        this.data.children[n].activate();
      }

      this.setData({
        current: n,
      });
    },
  },
});
