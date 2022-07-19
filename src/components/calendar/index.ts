import formatTime, {
  dateObj,
  get7DaysList,
  getFullCalendar,
  getFullDateList,
} from './time';
import { solarToLunar } from './lunar';

function getOffset(
  year: number,
  month: number,
  day: number
) {
  const _ = new Date(year, month - 1);
  const startWeek = _.getDay();

  // 50px
  return (Math.ceil((day + startWeek) / 7) - 1) * 50;
}

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
    offset: 0, // 日历收起后偏移
  },
  methods: {
    // picker 设置月份
    editDate(e) {
      const arr: string[] = e.detail.value.split('-');
      const year = Number(arr[0]);
      const month = Number(arr[1]);
      const day = Number(arr[2]);

      this.setDate(year, month, day);
    },

    setDate(
      year: number,
      month: number, // 从 1 开始
      day: number,
      index: number,
      key: string
    ) {
      const {
        selectDay: { year: y, month: m, day: d },
        open,
      } = this.data;

      // 与已经选择的日期一致什么都不需要做
      if (y === year && m === month && d === day) return;

      // 设置的日期其月份最大天数(如2021年6月最大天数30)与当前已设置的日期(selectDay.day)做比较
      // 选择小的那个, 为了防止这个月跳下个月时不存在某一天 -> 如8月31日跳下个月后不存在31日
      const maxDay = new Date(year, month, 0).getDate();
      let D;
      if (day && day < maxDay) {
        D = day;
      } else {
        D = maxDay;
      }

      const date = new Date(year, month - 1, D);

      const selectDay = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        lunarday: solarToLunar(year, month, D),
        dateString: formatTime(date, 'Y-M-D'),
      };

      if (y !== year || m !== month) {
        if (key === 'last') {
          // 上个月
          this.setData({
            [`dateList[${index}]`]: getFullCalendar(
              year,
              month - 1
            ),
          });
        } else if (key === 'next') {
          // 下个月
          this.setData({
            [`dateList[${index}]`]: getFullCalendar(
              year,
              month + 1
            ),
          });
        } else {
          // 既不是左滑也不是又滑, 则进行初始化操作
          this.setData({
            dateList: getFullDateList(year, month),
          });
        }

        this.setSpot();

        if (year !== y) {
          this.triggerEvent('yearChange', selectDay);
        } else {
          this.triggerEvent('monthChange', selectDay);
        }
      }

      // 无论是年、月、日哪个改变都要重新设置这个
      this.setData({
        selectDay,
        offset: getOffset(year, month, day),
      });

      this.triggerEvent('dayChange', selectDay);
    },

    // 展开收起
    openChange() {
      this.setData({
        open: !this.data.open,
      });
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
        swiperIndex: lastIndex,
        selectDay: { year, month, day },
      } = this.data; // 滑动前滑块

      const {
        detail: { current: currentIndex },
      } = e; // 滑动后滑块

      // 默认左滑
      let flag = false;
      // 滑动后的相邻月份下标
      let index = 2;

      // 因为当前滑块和之前滑块均有正确的日历
      // 因此只需要更新当前滑块相邻滑块日历即可
      // 例如当轮播图为[一月,二月,三月]时
      // “左滑”后轮播图为[三月,一月,二月]
      // 只需要将“三月”更新为“去年十二月”即可
      //
      // 右滑的情况有:
      // 1.当前滑块下标(currentIndex)大于之前滑块下标(lastIndex)
      // 2.当前滑块下标等于0 之前等于2(刚好右循环)
      // 左滑的情况有:
      // 1.当前滑块下标小于之前滑块下标
      // 2.当前滑块下标为2 之前滑块下标等于0(刚好左循环)

      if (lastIndex > currentIndex) {
        // lastIndex > currentIndex 一般为左滑
        // 除了 lastIndex === 2 && currentIndex === 0
        lastIndex === 2 && currentIndex === 0
          ? ((flag = true), (index = 1))
          : currentIndex === 0
          ? null
          : (index = currentIndex - 1);
      } else {
        // lastIndex < currentIndex 一般为右滑
        // 除了 lastIndex === 0 && currentIndex === 2 的情况
        lastIndex === 0 && currentIndex === 2
          ? (index = 1)
          : ((flag = true),
            currentIndex === 2
              ? (index = 0)
              : (index = currentIndex + 1));
      }

      if (flag) {
        this.setDate(year, month + 1, day, index, 'next'); // 右滑, 提前生成下个月
      } else {
        this.setDate(year, month - 1, day, index, 'last'); // 左滑, 提前生成上个月
      }

      this.setData({
        swiperIndex: currentIndex,
      });
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
        selectDay.day
      );

      // 修改
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
