// 参考 https://github.com/Sean-Chiu/cq-calendar

// 200条农历数据
const lunarInfo = new Array(
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900年~1909年
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910年~1919年
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920年~1929年
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930年~1939年
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940年~1949年
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950年~1959年
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960年~1969年
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, // 1970年~1979年
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980年~1989年
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, // 1990年~1999年
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000年~2009年
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010年~2019年
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020年~2029年
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030年~2039年
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040年~2049年
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050年~2059年
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060年~2069年
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070年~2079年
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080年~2089年
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090年~2099年
    0x0d520 // 2100年
)

const minYear = 1900; // 能计算的最小年份
const maxYear = 2100; // 能计算的最大年份

// 阳历每月天数，遇到闰年2月需加1天
const solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

// 农历月份别称
const monthName = new Array('正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月')

// 判断年份是否处于 1900~2100
function _checkYear(year) {
    if (year < minYear || year > maxYear) {
        return false
    } else {
        return true
    }
}

// 获取闰月
function getLunarLeapMonth(year) {
    if (_checkYear(year)) {
        return lunarInfo[year - minYear] & 0xf
    }
}

// 获取闰月天数
function getLeapMonthDaysCount(year) {
    if (getLunarLeapMonth(year)) {
        return lunarInfo[year - minYear] & 0x10000 ? 30 : 29
    }
    return 0;
}

// 农历年天数
function getLunarYearDaysCount(year) {
    if (_checkYear(year)) {
        let sum = 348; // 29天 * 12个月 = 348日    
        for (let i = 0x8000; i > 0x8; i >>= 1) {
            sum += (lunarInfo[year - minYear] & i ? 1 : 0)
        }
        return sum + getLeapMonthDaysCount(year)
    }
}

// 农历月天数
function getLunarYearMonthDaysCount(year, month) {
    if (_checkYear(year)) {
        return lunarInfo[year - minYear] & (0x10000 >> month) ? 30 : 29
    }
}

// 农历中文代号
function getLunarDayString(day) {
    const nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十')
    const nStr2 = new Array('初', '十', '廿', '卅')
    let str = ''
    switch (day) {
        case 10:
            str = '初十'
            break;
        case 20:
            str = '二十'
            break;
        case 30:
            str = '三十'
            break;
        default:
            str = nStr2[Math.floor(day / 10)]
            str += nStr1[day % 10]
            break
    }
    return str
}

// 获得节气
function getJQ(year, month, day) {
    // 二十节气代号
    var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758)
    // 二十四节气名称
    var solarTerm = new Array('小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至')
    var tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[(month - 1) * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
    var tmp2 = tmp1.getUTCDate()
    var solarTerms = ''
    if (tmp2 == day)
        solarTerms = solarTerm[(month - 1) * 2 + 1]
    tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[(month - 1) * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
    tmp2 = tmp1.getUTCDate()
    if (tmp2 == day)
        solarTerms = solarTerm[(month - 1) * 2]
    return solarTerms
}

// 阳历转农历
function solarToLunar(year, month, day) {
    if (_checkYear(year)) {
        const baseDate = new Date(minYear, 0, 31); // 基础日期1900年1月31日
        const objDate = new Date(year, month - 1, day); // 目标日期
        let offset = (objDate - baseDate) / 86400000; // 偏移天数 60 * 60 * 24 * 1000 = 86400000，1天的毫秒数
        let monCycle = 14;
        let temp = 0;
        let i = 0;

        for (i = minYear; i < maxYear && offset > 0; i++) {
            temp = getLunarYearDaysCount(i); // 农历year年的总天数
            if (offset - temp < 0) {
                break;
            } else {
                offset -= temp;
            }
            monCycle += 12;
        }

        const lunarYear = i; // 农历年份        
        const leap = getLunarLeapMonth(lunarYear); // 当年闰月是哪个月
        const isLeapYear = leap > 0 ? true : false; // 当年是否有闰月        
        let isLeapMonth = false; // 当前农历月份是否是闰月
        for (i = 1; i <= 12 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && !isLeapMonth) {
                --i;
                isLeapMonth = true;
                temp = getLeapMonthDaysCount(year);
            } else {
                temp = getLunarYearMonthDaysCount(year, i);
            }

            if (isLeapMonth && i == (leap + 1)) {
                isLeapMonth = false;
            }

            offset -= temp;
            if (!isLeapMonth) {
                monCycle++;
            }
        }

        if (offset == 0 && leap > 0 && i == leap + 1) {
            if (isLeapMonth) {
                isLeapMonth = false;
            } else {
                isLeapMonth = true;
                --i;
                --monCycle;
            }
        }

        if (offset < 0) {
            offset += temp;
            --i;
            --monCycle;
        }
        offset = parseInt(offset)
        const lunarMonth = i; // 农历月份
        const lunarDay = parseInt(offset) + 1; // 农历日期



        let monthStr = '';
        if (isLeapYear) {
            if (lunarMonth < leap) {
                monthStr = monthName[lunarMonth - 1];
            } else if (lunarMonth == leap) {
                monthStr = '闰' + monthName[lunarMonth - 1];
            } else {
                monthStr = monthName[lunarMonth - 2];
            }
        } else {
            monthStr = monthName[lunarMonth - 1];
        }
        return {
            year: lunarYear, // 农历年份
            month: lunarMonth, // 农历月份
            day: lunarDay, // 农历日期
            isLeap: isLeapMonth, // 是否闰月
            monthStr: monthStr, // 月份字符串
            dayStr: getLunarDayString(lunarDay) // 中文代号
        }
    }
}

module.exports = {
    getLunarLeapMonth, // 返回农历year年中哪个月是闰月
    getLeapMonthDaysCount, // 返回农历year年闰月的天数
    getLunarYearDaysCount, // 返回农历year年的总天数
    getLunarYearMonthDaysCount, // 返回农历year年month月的天数
    getLunarDayString, // 农历日期的中文字符串
    getJQ, // 指定日期的24节气名   
    solarToLunar, // 阳历日期转农历日期
}