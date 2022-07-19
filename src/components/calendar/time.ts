import { Lunar, solarToLunar } from './lunar';

export interface dateObj {
  year: number;
  month: number;
  day: number;
  lunarday: Lunar; // 农历
  dateString: string; // Y-M-D 的形式
  spot?: boolean;
}

// 不足位数的日期上添加 "0" 补足位数
function formatNumber(n: number): string {
  return n > 9 ? String(n) : '0' + n;
}

// 格式化日期
function getDate(
  time: string | Date,
  format: string
): string {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  const returnArr: string[] = [];

  const date = new Date(time);

  returnArr.push(String(date.getFullYear())); // 年
  returnArr.push(formatNumber(date.getMonth() + 1)); // 月(从 1 开始)
  returnArr.push(formatNumber(date.getDate())); // 日
  returnArr.push(formatNumber(date.getHours())); // 时
  returnArr.push(formatNumber(date.getMinutes())); // 分
  returnArr.push(formatNumber(date.getSeconds())); // 秒

  returnArr.forEach((e, idx) => {
    // 使用获取的日期替换给定的格式化格式里字符
    // 如使用 "2021" 替换 "Y-M-D" 里的 "Y"
    format = format.replace(formateArr[idx], e);
  });

  return format;
}

// 获取当前时间与给定时间差
function getDateDiff(time: Date | string): string {
  let r;
  const ft = new Date(time);
  const nt = new Date();

  const nd = new Date(new Date().setHours(23, 59, 59, 999));

  // 给定时间(ft)与今天的 23 点 59 分 59 秒(nd)差多少天
  const d = Math.floor(
    (nd.getTime() - ft.getTime()) / 86400000
  );

  if (d === 0) {
    // 一天之内
    // 给定时间(ft)与当前时间(nt)差多少秒
    const s =
      Math.floor(nt.getTime() / 1000) -
      Math.floor(ft.getTime() / 1000);

    if (s < 60 && s >= 0) {
      r = '刚刚';
    } else if (s < 3600) {
      r = `${s / 60}分钟前`;
    } else {
      r = `${s / 3600}小时前`;
    }
  } else if (d === 1) r = '昨天';
  else if (d === 2) r = '前天';
  else if (d > 2 && d < 30) r = `${d}天前`;
  else r = getDate(time, 'Y-M-D');

  return r;
}

export default function formatTime(
  time: Date | string,
  format: string | undefined
) {
  if (!format) {
    // 如果没有提供格式化格式, 返回时间差
    return getDateDiff(time);
  } else {
    return getDate(time, format);
  }
}

// 获取完整的日期列表
export function getFullDateList(
  year: number,
  month: number // 从 1 开始
) {
  // 当月
  const nowList = getFullCalendar(year, month);

  // 上个月
  const lastMonth = new Date(year, month - 2);
  // setYear, setMonth 不一定是真实月份
  // 比如当月是 1 月, 则 setMonth - 2 是 -1
  const lyear = lastMonth.getFullYear();
  const lmonth = lastMonth.getMonth() + 1;
  const lastlist = getFullCalendar(lyear, lmonth);

  // 下个月
  const nextMonth = new Date(year, month);
  const nyear = nextMonth.getFullYear();
  const nmonth = nextMonth.getMonth() + 1;
  const nextlist = getFullCalendar(nyear, nmonth);

  return [lastlist, nowList, nextlist];
}

// 获取指定月份完整的日历
export function getFullCalendar(
  year: number,
  month: number // 从 1 月开始
) {
  const dateList: dateObj[] = [];

  const now = new Date(year, month - 1); // 1 号
  const startWeek = now.getDay(); // 目标月 1 号对应的星期
  const dayNums = new Date(year, month, 0).getDate(); // 当前月有多少天

  // ceil((某月 1 号星期数 + 某月天数) / 7) = 某月周数
  // 周数 * 7 = 可视日历的日期总数
  const forNums = Math.ceil((startWeek + dayNums) / 7) * 7;

  for (let i = 0; i < forNums; i++) {
    const n = new Date(now);
    n.setDate(i - startWeek + 1); // 设置几号

    const obj: dateObj = {
      day: n.getDate(),
      month: n.getMonth() + 1,
      year: n.getFullYear(),
      lunarday: solarToLunar(
        n.getFullYear(),
        n.getMonth() + 1,
        n.getDate()
      ),
      dateString: formatTime(n, 'Y-M-D'),
    };

    dateList[i] = obj;
  }

  return dateList;
}

// 收缩状态下的日期列表
export function get7DaysList(
  year: number,
  month: number,
  day: number
) {
  // 这周
  const nowList = get7DaysCalendar(year, month, day);

  // 上周
  const lastWeek = new Date(year, month - 2, day - 7);
  const lyear = lastWeek.getFullYear();
  const lmonth = lastWeek.getMonth() + 1;
  const lday = lastWeek.getDate();
  const lastlist = get7DaysCalendar(lyear, lmonth, lday);

  // 下周
  const nextWeek = new Date(year, month, day + 7);
  const nyear = nextWeek.getFullYear();
  const nmonth = nextWeek.getMonth() + 1;
  const nday = nextWeek.getDate();
  const nextlist = get7DaysCalendar(nyear, nmonth, nday);

  return [lastlist, nowList, nextlist];
}

// 获取围绕 day 的 7 天
export function get7DaysCalendar(
  year: number,
  month: number, // 从 1 月开始
  day: number
) {
  const dateList: dateObj[] = [];

  const now = new Date(year, month - 1); // 1 号
  const startWeek = now.getDay(); // 目标月 1 号对应的星期

  for (let i = 0; i < 7; i++) {
    const n = new Date(now);
    // 当前周的 7 天
    n.setDate(
      Math.ceil((day + startWeek) / 7) * 7 -
        6 -
        startWeek +
        i
    );

    const obj = {
      day: n.getDate(),
      month: n.getMonth() + 1,
      year: n.getFullYear(),
      lunarday: solarToLunar(
        n.getFullYear(),
        n.getMonth() + 1,
        n.getDate()
      ),
      dateString: formatTime(n, 'Y-M-D'),
    };

    dateList[i] = obj;
  }

  return dateList;
}
