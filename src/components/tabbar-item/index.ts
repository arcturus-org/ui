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
    activate() {
      const { active } = this.data;

      // 防止反复点击
      if (!active) {
        this.setData({
          active: true,
        });

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
    // 取消激活
    deActivate() {
      this.setData({
        active: false,
      });
    },
    // 设置组件宽度
    setWidth(width: number) {
      this.setData({ width });
    },
  },
});
