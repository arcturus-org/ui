Component({
  relations: {
    '../tabbar/index': {
      type: 'parent',
    },
  },
  properties: {
    activeIcon: String,
    inactiveIcon: String,
    name: String,
    iconSize: {
      type: Number,
      value: 30,
    },
  },
  data: {
    active: false,
    width: 0,
  },
  methods: {
    // tab 激活事件
    activate() {
      //  避免反复点击触发多次 setData
      if (!this.data.active) {
        this.setData({
          active: true,
        });

        // 父组件一般只有一个
        const parent = this.getRelationNodes(
          '../tabbar/index'
        )[0];

        const idx = parent.data.children.indexOf(this);

        if (idx !== parent.data.current) {
          // 父组件 tabbar 进行切换(关掉其他 tabbar-item)
          parent.switchTab(idx);
        }
      }
    },
    // tab 取消激活事件
    deActivate() {
      if (this.data.active) {
        this.setData({
          active: false,
        });
      }
    },
    // 设置组件宽度
    setWidth(width: number) {
      this.setData({ width });
    },
  },
});
