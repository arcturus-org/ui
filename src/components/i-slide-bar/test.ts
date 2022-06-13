const test = [
  {
    value: 4,
    dt: 1644984000,
  },
  {
    value: 4,
    dt: 1644987600,
  },
  {
    value: 4,
    dt: 1644991200,
  },
  {
    value: 4,
    dt: 1644994800,
  },
  {
    value: 5,
    dt: 1644998400,
  },
  {
    value: 3,
    dt: 1645002000,
  },
  {
    value: 4,
    dt: 1645005600,
  },
  {
    value: 4,
    dt: 1645009200,
  },
  {
    value: 3,
    dt: 1645012800,
  },
  {
    value: 2,
    dt: 1645016400,
  },
  {
    value: 2,
    dt: 1645020000,
  },
  {
    value: 2,
    dt: 1645023600,
  },
  {
    value: 2,
    dt: 1645027200,
  },
  {
    value: 4,
    dt: 1645030800,
  },
  {
    value: 2,
    dt: 1645034400,
  },
  {
    value: 3,
    dt: 1645038000,
  },
  {
    value: 3,
    dt: 1645041600,
  },
  {
    value: 3,
    dt: 1645045200,
  },
  {
    value: 2,
    dt: 1645048800,
  },
  {
    value: 5,
    dt: 1645052400,
  },
  {
    value: 3,
    dt: 1645056000,
  },
  {
    value: 2,
    dt: 1645059600,
  },
  {
    value: 4,
    dt: 1645063200,
  },
  {
    value: 2,
    dt: 1645066800,
  },
  {
    value: 3,
    dt: 1645070400,
  },
  {
    value: 4,
    dt: 1645074000,
  },
  {
    value: 2,
    dt: 1645077600,
  },
  {
    value: 2,
    dt: 1645081200,
  },
  {
    value: 3,
    dt: 1645084800,
  },
  {
    value: 3,
    dt: 1645088400,
  },
  {
    value: 3,
    dt: 1645092000,
  },
  {
    value: 3,
    dt: 1645095600,
  },
  {
    value: 2,
    dt: 1645099200,
  },
  {
    value: 2,
    dt: 1645102800,
  },
  {
    value: 2,
    dt: 1645106400,
  },
  {
    value: 3,
    dt: 1645110000,
  },
  {
    value: 3,
    dt: 1645113600,
  },
  {
    value: 4,
    dt: 1645117200,
  },
  {
    value: 2,
    dt: 1645120800,
  },
  {
    value: 2,
    dt: 1645124400,
  },
  {
    value: 3,
    dt: 1645128000,
  },
  {
    value: 3,
    dt: 1645131600,
  },
  {
    value: 2,
    dt: 1645135200,
  },
  {
    value: 3,
    dt: 1645138800,
  },
  {
    value: 3,
    dt: 1645142400,
  },
  {
    value: 2,
    dt: 1645146000,
  },
  {
    value: 2,
    dt: 1645149600,
  },
  {
    value: 3,
    dt: 1645153200,
  },
  {
    value: 2,
    dt: 1645156800,
  },
  {
    value: 2,
    dt: 1645160400,
  },
  {
    value: 2,
    dt: 1645164000,
  },
  {
    value: 2,
    dt: 1645167600,
  },
  {
    value: 2,
    dt: 1645171200,
  },
  {
    value: 3,
    dt: 1645174800,
  },
  {
    value: 2,
    dt: 1645178400,
  },
  {
    value: 2,
    dt: 1645182000,
  },
  {
    value: 2,
    dt: 1645185600,
  },
  {
    value: 2,
    dt: 1645189200,
  },
  {
    value: 3,
    dt: 1645192800,
  },
  {
    value: 4,
    dt: 1645196400,
  },
  {
    value: 3,
    dt: 1645200000,
  },
  {
    value: 3,
    dt: 1645203600,
  },
  {
    value: 3,
    dt: 1645207200,
  },
];

// 一个简易的时间格式化函数
function timeFormat(dt: Date): string {
  const year = dt.getFullYear(),
    month = dt.getMonth() + 1,
    day = dt.getDay(),
    hour = dt.getHours(),
    minute = dt.getMinutes();

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export default function () {
  return test.map((e, idx) => {
    const dt = new Date(e.dt * 1000);
    return {
      value: e.value,
      x:
        idx % 4 === 0
          ? dt.getHours() == 0
            ? `${dt.getMonth()}-${dt.getDay()}`
            : dt.getHours()
          : '',
      message: `${timeFormat(dt)} ${e.value}`,
    };
  });
}
