import formatTime, {
  dateObj,
  getFullCalendar,
  getFullDateList,
  getOffset,
  getOffsetList,
} from './time';
import { solarToLunar } from './lunar';

Component({
  properties: {
    // 事件日期 string[]
    spot: {
      type: Array,
      value: [],
    },
    // 默认时间
    defaultTime: {
      type: String,
      value: '',
    },
  },
  data: {
    week: ['日', '一', '二', '三', '四', '五', '六'],
    dateList: [[], [], []], // 日历主体(前中后三个月)
    swiperIndex: 1, // 当前所在滑块
    selectDay: {}, // 选中时间
    nowDate: {}, // 当前时间
    open: true, // 日历是否展开
    offset: [0, 0, 0], // 日历收起后偏移
  },
  methods: {
    // picker 设置月份
    editDate(e) {
      const arr: string[] = e.detail.value.split('-');
      const year = Number(arr[0]);
      const month = Number(arr[1]);
      const day = Number(arr[2]);

      // 使用 pick 选择的话, 缓存就无效了, 需要重新初始化
      this.setDate(year, month, day, true);
    },

    // 判断需要左滑还是右滑
    swiperDirection(
      year: number,
      month: number,
      day: number
    ) {
      const {
        selectDay: { year: y, month: m, day: d }, // 当前日期
        open,
      } = this.data;

      if (open) {
        if (year < y) return -1;
        else if (year > y) return 1;
        else if (month < m) return -1;
        else if (month > m) return 1;
      } else {
        // 此时处于关闭状态
        console.log(
          `当前:${day}, ${month}, 原来: ${d}, ${m}`
        );
        // 月份一致, 小 6 天左滑, 大 6 天右滑
        if (day > d || day < d - 6) {
          return -1;
        } else if (day < d || day > d + 6) {
          console.log('油滑');
          return 1;
        }
      }

      return 0;
    },

    setDate(
      year: number,
      month: number, // 从 1 开始
      day: number,
      init: boolean = false // 是否需要初始化
    ) {
      const {
        selectDay: { year: y, month: m, day: d },
        swiperIndex: index,
        open,
      } = this.data;

      // 与已经选择的日期一致什么都不需要做
      if (y === year && m === month && d === day) return;

      let date;
      if (open) {
        const num = new Date(year, month, 0).getDate();
        const D = day && num > day ? day : num;

        // 当前日期
        date = new Date(year, month - 1, D);
      } else {
        // 如果是收缩状态, 则超过这个月跳到下个月或上个月
        date = new Date(year, month - 1, day);
      }

      const selectDay = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        lunarday: solarToLunar(year, month, day),
        dateString: formatTime(date, 'Y-M-D'),
      };

      if (init) {
        // 进行初始化
        this.setData({
          dateList: getFullDateList(
            selectDay.year,
            selectDay.month
          ),
          selectDay,
          offset: getOffsetList(
            1,
            selectDay.year,
            selectDay.month,
            selectDay.day
          ),
        });

        // 初始化操作, 三个都要执行
        this.triggerEvent('yearChange', selectDay);
        this.triggerEvent('monthChange', selectDay);
        this.triggerEvent('dayChange', selectDay);
      } else {
        const { year, month, day } = selectDay;
        const flag = this.swiperDirection(year, month, day);

        if (flag === -1) {
          // 需要左滑, 提前生成上上个月
          // 本月索引(index)是 0 1 2
          // 则上上月在数组中的索引(idx)是 1 2 0
          // 上月的索引(sidx)是 2 0 1
          const idx = (index + 4) % 3,
            sidx = (index + 2) % 3;

          this.setData({
            [`dateList[${idx}]`]: open
              ? getFullCalendar(year, month - 1)
              : getFullCalendar(year, month, day - 7),
            [`offset[${idx}]`]: open
              ? getOffset(year, month - 1, day)
              : getOffset(year, month, day - 7),
            [`offset[${sidx}]`]: getOffset(
              year,
              month,
              day
            ),
            swiperIndex: sidx,
            selectDay,
          });
        } else if (flag === 1) {
          // 需要右滑, 提前生成下下个月
          // 本月索引是 0 1 2
          // 则下下个月索引 2 0 1
          // 下个月索引 1 2 0
          const idx = (index + 2) % 3,
            sidx = (index + 4) % 3;

          this.setData({
            [`dateList[${idx}]`]: open
              ? getFullCalendar(year, month + 1)
              : getFullCalendar(year, month, day + 7),
            [`offset[${idx}]`]: open
              ? getOffset(year, month + 1, day)
              : getOffset(year, month, day + 7),
            [`offset[${sidx}]`]: getOffset(
              year,
              month,
              day
            ),
            swiperIndex: sidx,
            selectDay,
          });
        } else
          open
            ? this.setData({
                selectDay,
                offset: getOffsetList(
                  index,
                  year,
                  month,
                  day
                ),
              })
            : this.setData({
                selectDay,
              });

        if (y !== year)
          this.triggerEvent('yearChange', selectDay);
        else if (month !== m)
          this.triggerEvent('monthChange', selectDay);

        this.triggerEvent('dayChange', selectDay);
      }

      // this.setSpot();
    },

    // 展开收起
    openChange() {
      const {
        open,
        swiperIndex: idx,
        selectDay: { year, month, day },
      } = this.data;

      const next = (idx + 4) % 3,
        last = (idx + 2) % 3;

      if (open) {
        // 打算关闭, 左右替换成上周和下周
        this.setData({
          [`offset[${next}]`]: getOffset(
            year,
            month,
            day + 7
          ),
          [`offset[${last}]`]: getOffset(
            year,
            month,
            day - 7
          ),
          [`dateList[${next}]`]: getFullCalendar(
            year,
            month,
            day + 7
          ),
          [`dateList[${last}]`]: getFullCalendar(
            year,
            month,
            day - 7
          ),
          open: !open,
        });
      } else {
        // 打算展开, 左右替换成上月和下月
        this.setData({
          [`offset[${next}]`]: getOffset(
            year,
            month + 1,
            day
          ),
          [`offset[${last}]`]: getOffset(
            year,
            month - 1,
            day
          ),
          [`dateList[${next}]`]: getFullCalendar(
            year,
            month + 1
          ),
          [`dateList[${last}]`]: getFullCalendar(
            year,
            month - 1
          ),
          open: !open,
        });
      }
    },

    // 设置日历底下小圆点
    setSpot() {
      const {
        spot,
        dateList,
      }: {
        spot: string[];
        dateList: dateObj[][];
      } = this.data;

      // 返回处理过的新数组
      const timeArr = spot.map((item): string => {
        return formatTime(item, 'Y-M-D');
      });

      // 列出数组中所有元素
      dateList[1].forEach((item) => {
        // 小圆点数组里存在的日期才显示小圆点
        if (timeArr.indexOf(item.dateString) !== -1) {
          item.spot = true;
        } else {
          item.spot = false;
        }
      });

      this.setData({ dateList });
    },

    // 某一天被点击时
    selectChange(e) {
      const {
        currentTarget: {
          dataset: {
            select: { year, month, day },
          },
        },
      } = e;

      this.setDate(year, month, day);
    },

    // 滑动时事件
    swiperChange(e) {
      const {
        selectDay: { year, month, day },
        swiperIndex: index,
        open,
      } = this.data;

      const {
        detail: { current: idx, source },
      } = e;

      if (source === 'touch') {
        if (index > idx) {
          if (idx === 0 && index === 2) {
            // 右滑
            open
              ? this.setDate(year, month + 1, day)
              : this.setDate(year, month, day + 7);
          } else {
            // 左滑
            open
              ? this.setDate(year, month - 1, day)
              : this.setDate(year, month, day - 7);
          }
        } else {
          if (idx === 2 && index === 0) {
            // 左滑
            open
              ? this.setDate(year, month - 1, day)
              : this.setDate(year, month, day - 7);
          } else {
            // 右滑
            open
              ? this.setDate(year, month + 1, day)
              : this.setDate(year, month, day + 7);
          }
        }
      }
    },
  },

  lifetimes: {
    // 组件初始化完毕时执行
    attached() {
      // 如果存在默认时间则 dateString 使用默认时间
      // 否则获取当前时间
      const { defaultTime } = this.data;

      const now = defaultTime
        ? new Date(defaultTime)
        : new Date();

      const selectDay = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        dateString: formatTime(now, 'Y-M-D'),
      };

      // 选中时间设置成当前时间
      this.setDate(
        selectDay.year,
        selectDay.month,
        selectDay.day,
        true
      );

      // 修改当前时间
      this.setData({
        nowDate: selectDay,
      });
    },
  },

  // 数据监听器
  observers: {
    spot: function () {
      this.setSpot();
    },
  },
});
