const lunar = require('./lunar.js')

Component({
  properties: {
    // 事件日期
    spot: {
      type: Array,
      value: []
    },
    // 默认时间
    defaultTime: {
      type: String,
      value: ''
    }
  },
  data: {
    week: ['日', '一', '二', '三', '四', '五', '六'],
    dateList: [
      [],
      [],
      []
    ], // 日历主体(前中后三个月)
    swiperIndex: 1, // 当前所在滑块
    selectDay: {}, // 选中时间
    nowdate: {} // 当前时间
  },
  methods: {
    /**
     * time: 需要被格式化的时间
     * format：格式化后返回的格式
     */
    formatTime(time, format) {
      // 不足位数的日期上添加 "0" 补足位数
      function formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
      }

      // 格式化日期
      function getDate(time, format) {
        const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
        const returnArr = []
        const date = new Date(time)
        returnArr.push(date.getFullYear())
        returnArr.push(formatNumber(date.getMonth() + 1))
        returnArr.push(formatNumber(date.getDate()))
        returnArr.push(formatNumber(date.getHours()))
        returnArr.push(formatNumber(date.getMinutes()))
        returnArr.push(formatNumber(date.getSeconds()))
        for (const i in returnArr) {
          // 使用获取的日期替换给定的格式化格式里字符
          // 如使用 "2021" 替换 "Y-M-D" 里的 "Y"
          format = format.replace(formateArr[i], returnArr[i])
        }
        return format
      }

      // 获取当前时间与给定时间差
      function getDateDiff(time) {
        let r = ''
        const ft = new Date(time)
        const nt = new Date()
        const nd = new Date()
        nd.setHours(23)
        nd.setMinutes(59)
        nd.setSeconds(59)
        nd.setMilliseconds(999)
        // 给定时间(ft)与当天的23点59分59秒(nd)差多少天
        const d = parseInt((nd - ft) / 86400000)
        switch (true) {
          // 一天之内(不包括1天整)
          case d === 0:
            // 给定时间(ft)与当前时间(nt)差多少秒
            const s = parseInt(nt / 1000) - parseInt(ft / 1000)
            switch (true) {
              case s < 60:
                r = '刚刚'
                break
              case s < 3600:
                r = parseInt(s / 60) + '分钟前'
                break
              default:
                r = parseInt(s / 3600) + '小时前'
            }
            break
            // 两天之内
          case d === 1:
            r = '昨天'
            break
            // 三天之内
          case d === 2:
            r = '前天'
            break
            // 三天及以上
          case d > 2 && d < 30:
            r = d + '天前'
            break
          default:
            r = getDate(time, 'Y-M-D')
        }
        return r
      }
      if (!format) {
        // 如果没有提供格式化格式 返回时间差
        return getDateDiff(time)
      } else {
        return getDate(time, format)
      }
    },

    // picker 设置月份
    editMonth(e) {
      const arr = e.detail.value.split('-')
      const year = parseInt(arr[0])
      const month = parseInt(arr[1])
      const day = parseInt(arr[2])
      this.setMonth(year, month, day)
    },

    // 设置月份
    setMonth(setYear, setMonth, setDay, index, key) {
      // 判断需要设置的日期与当前已设置的日期是否相同
      /** 
       * 需要设置的日期其月份最大天数(如2021年6月最大天数30)与当前已设置的日期(selectDay.day)做比较
       * 选择小的那个
       * 为了防止这个月跳下个月时不存在某一天 -> 如8月31日跳下个月后不存在31日
       */
      const day = Math.min(new Date(setYear, setMonth, 0).getDate(), this.data.selectDay.day)
      const time = new Date(setYear, setMonth - 1, setDay ? setDay : day)
      const data = {
        selectDay: {
          year: setYear,
          month: setMonth,
          day: setDay ? setDay : day,
          lunarday: lunar.solarToLunar(setYear, setMonth, setDay ? setDay : day),
          dateString: this.formatTime(time, 'Y-M-D')
        }
      }
      if (this.data.selectDay.year !== setYear || this.data.selectDay.month !== setMonth) {
        if (!setDay) {
          data.open = true
        }
        this.setData(data)
        var List = this.dateInit(setYear, setMonth)
        if (key === 'last') {
          this.setData({
            ['dateList[' + index + ']']: List[0]
          })
        } else if (key === 'next') {
          this.setData({
            ['dateList[' + index + ']']: List[2]
          })
        } else {
          var dateList = [List[0], List[1], List[2]]
          this.setData({
            dateList: dateList
          })
        }
        this.setSpot()
        this.triggerEvent('change', this.data.selectDay)
      } else if (this.data.selectDay.day !== setDay) {
        /** 
         * 如果年月相同 但是日子不同 
         * 不需要重新获取当月日历(即不需要 dateInit 和 setSpot)
         * 只需要设置一下选中的日期即可
         */
        this.setData(data)
        this.triggerEvent('change', this.data.selectDay)
      }
    },

    // 展开收起
    openChange() {
      this.setData({
        open: !this.data.open
      })
      var dateList = this.dateInit()
      this.setData({
        dateList: dateList
      })
      this.setSpot()
      this.triggerEvent('aaa', {
        a: 0
      })
    },

    // 设置日历底下是否展示小圆点
    setSpot() {
      // 返回处理过的新数组
      const timeArr = this.data.spot.map(item => {
        return this.formatTime(item, 'Y-M-D')
      })
      // 列出数组中所有元素
      // console.log(this.data.dateList)
      this.data.dateList[1].forEach(item => {
        // 小圆点数组里存在的日期才显示小圆点
        if (timeArr.indexOf(item.dateString) !== -1) {
          item.spot = true
        } else {
          item.spot = false
        }
      })
      this.setData({
        dateList: this.data.dateList
      })
    },

    // 日历主体的渲染方法
    // 传入 year 和 month 即可知道当月天数 故不需要传 day
    dateInit(setYear = this.data.selectDay.year, setMonth = this.data.selectDay.month) {
      // 当月
      var nowList = this.getCalendar(setYear, setMonth)
      // 上个月
      const lastMonth = new Date(this.data.selectDay.year, this.data.selectDay.month - 2)
      const lyear = lastMonth.getFullYear()
      const lmonth = lastMonth.getMonth() + 1
      var lastlist = this.getCalendar(lyear, lmonth)
      // 下个月
      const nextMonth = new Date(this.data.selectDay.year, this.data.selectDay.month)
      const nyear = nextMonth.getFullYear()
      const nmonth = nextMonth.getMonth() + 1
      var nextlist = this.getCalendar(nyear, nmonth)

      return [lastlist, nowList, nextlist]
    },

    // 获取指定月份的日历
    getCalendar(setYear, setMonth) {
      var dateList = []
      let now = new Date(setYear, setMonth - 1) // 1号
      let startWeek = now.getDay(); // 目标月1号对应的星期
      let dayNum = new Date(setYear, setMonth, 0).getDate() // 当前月有多少天
      /**
       * ceil ->向上取整
       * ceil((某月1号星期数 + 某月天数) / 7) = 某月周数
       * 周数 * 7 = 可视日历的日期总数
      */ 
      let forNum = Math.ceil((startWeek + dayNum) / 7) * 7

      if (this.data.open) {
        // 展开状态 需要渲染完整的月份
        for (let i = 0; i < forNum; i++) {
          const now2 = new Date(now)
          now2.setDate(i - startWeek + 1)
          let obj = {};
          obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
            lunarday: lunar.solarToLunar(now2.getFullYear(), now2.getMonth() + 1, now2.getDate()),
            dateString: this.formatTime(now2, 'Y-M-D')
          };
          dateList[i] = obj;
        }
      } else {
        // 非展开状态 只需要渲染当前周
        for (let i = 0; i < 7; i++) {
          const now2 = new Date(now)
          // 当前周的7天
          now2.setDate(Math.ceil((this.data.selectDay.day + startWeek) / 7) * 7 - 6 - startWeek + i)
          let obj = {};
          obj = {
            day: now2.getDate(),
            month: now2.getMonth() + 1,
            year: now2.getFullYear(),
            lunarday: lunar.solarToLunar(now2.getFullYear(), now2.getMonth() + 1, now2.getDate()),
            dateString: this.formatTime(now2, 'Y-M-D')
          };
          dateList[i] = obj;
        }
      }
      return dateList
    },

    //一天被点击时
    selectChange(e) {
      const year = e.currentTarget.dataset.year
      const month = e.currentTarget.dataset.month
      const day = e.currentTarget.dataset.day
      const dateString = e.currentTarget.dataset.dateString
      const selectDay = {
        year: year,
        month: month,
        day: day,
        lunarday: lunar.solarToLunar(year, month, day),
        dateString: dateString
      }
      if (this.data.selectDay.year !== year || this.data.selectDay.month !== month) {
        this.setMonth(year, month, day)
      } else if (this.data.selectDay.day !== day) {
        this.setData({
          selectDay: selectDay
        })
        this.triggerEvent('change', this.data.selectDay)
      }
    },

    // 获取下个月或上个月日历
    getMonth(key, index) { // 上月
      if (key === 'last') {
        const lastMonth = new Date(this.data.selectDay.year, this.data.selectDay.month - 2)
        const year = lastMonth.getFullYear()
        const month = lastMonth.getMonth() + 1
        this.setMonth(year, month, undefined, index, 'last')
      } else if (key === 'next') { // 下月
        const nextMonth = new Date(this.data.selectDay.year, this.data.selectDay.month)
        const year = nextMonth.getFullYear()
        const month = nextMonth.getMonth() + 1
        this.setMonth(year, month, undefined, index, 'next')
      }
    },

    // 滑动时事件
    swiperChange(e) {
      const lastIndex = this.data.swiperIndex // 滑动前滑块
      const currentIndex = e.detail.current // 滑动后滑块
      console.group('Task Group');
      console.log('之前滑块下标', lastIndex)
      console.log('当前滑块下标', currentIndex)
      // 默认左滑
      let flag = false
      let key = 'last'
      let index = 2 // 滑动后的相邻月份下标
      /**
       * 因为当前滑块和之前滑块均有正确的日历
       * 因此只需要更新当前滑块相邻滑块日历即可
       * 例如当轮播图为[一月,二月,三月]时
       * “左滑”后轮播图为[三月,一月,二月]
       * 只需要将“三月”更新为“去年十二月”即可
       */
      /** 
       * 右滑的情况有：
       * 1.当前滑块下标(currentIndex)大于之前滑块下标(lastIndex)
       * 2.当前滑块下标等于0 之前等于2(刚好右循环)
       * 左滑的情况有：
       * 1.当前滑块下标小于之前滑块下标
       * 2.当前滑块下标为2 之前滑块下标等于0(刚好左循环)
       */
      if (lastIndex > currentIndex) {
        // “lastIndex > currentIndex” 一般为左滑
        // “lastIndex === 2 && currentIndex === 0” 是特殊的右滑
        lastIndex === 2 && currentIndex === 0 ? (flag = true, index = 1) : (currentIndex === 0 ? null : index = currentIndex - 1)
      } else {
        // “lastIndex < currentIndex” 一般为右滑
        // 除了“lastIndex === 0 && currentIndex === 2”的情况
        lastIndex === 0 && currentIndex === 2 ? (index = 1) : (flag = true, (currentIndex === 2 ? index = 0 : index = currentIndex + 1))
      }
      if (flag) { // 如果右滑
        key = 'next'
      }
      console.log('需要更改的滑块下标', index)
      console.groupEnd('Task Group');
      this.getMonth(key, index)

      console.log(this.data.dateList[1].length)
      console.log(this.data.dateList[1])

      this.setData({
        swiperIndex: currentIndex
      })
    }
  },
  lifetimes: {
    // 组件初始化完毕时执行
    attached() {
      /**
       * 如果存在默认时间则 dateString 使用默认时间
       * 否则获取当前时间
       */
      let now = this.data.defaultTime ? new Date(this.data.defaultTime) : new Date()
      let selectDay = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        dateString: this.formatTime(now, 'Y-M-D')
      }
      // 选中时间设置成当前时间
      this.setMonth(selectDay.year, selectDay.month, selectDay.day)
      // 保存当前时间
      this.setData({
        nowdate: selectDay
      })
    }
  },
  // 数据监听器
  observers: {
    spot: function (spot) {
      this.setSpot()
    }
  }
})