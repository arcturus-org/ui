Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../page/index': {
      type: 'child',
    },
    '../tabbar/index': {
      type: 'child',
    },
  },
  properties: {
    selected: {
      // 当前页
      type: Number,
      value: 0,
    },
    animated: {
      // 是否显示滑动动画
      type: Boolean,
      value: true,
    },
    swipeable: {
      // 是否可以滑动
      type: Boolean,
      value: true,
    },
  },
  data: {
    pages: [],
    offset: 0,
    scrollWidth: 0,
  },
  methods: {
    swiperEnd(e: any) {
      const { scrollLeft } = e.detail;
      const { selected, scrollWidth } = this.data;
      const offset = scrollLeft - selected * scrollWidth;

      if (offset === 0) {
        console.log('滑到底了啦 (╯°□°）╯︵');
      } else {
        let current = selected;
        // 滑动超过一半, 则滑到下一页或上一页
        if (Math.abs(offset) > scrollWidth / 2) {
          if (offset > 0) {
            current++;
          } else {
            current--;
          }

          // 向父组件/页面传值, 方便修改 tabbar 的 current
          this.triggerEvent('change', {
            idx: current,
          });
        }

        this.setData({
          offset: current * scrollWidth,
        });
      }
    },
    scroll(idx: number): void {
      // 跳转到指定页面
      const { scrollWidth } = this.data;
      this.setData({
        offset: idx * scrollWidth,
      });
    },
  },
  lifetimes: {
    ready() {
      const pages = this.getRelationNodes('../page/index');

      this.createSelectorQuery()
        .in(this)
        .select('.i-pages__scroll')
        .fields({ node: true, size: true })
        .exec((res) => {
          const { width } = res[0];
          const { selected } = this.data;

          this.setData({
            scrollWidth: width,
            offset: selected * width,
            pages,
          });
        });
    },
  },
  observers: {
    // 监听到页面 idx 变化后滑动
    selected(idx: number): void {
      this.scroll(idx);
    },
  },
});
