# calendar 组件

## 使用

### 日期切换事件

```html
<!-- 日期变化时 -->
<ice-calendar bind:dayChange="dayChange"></ice-calendar>

<!-- 月份变化时 -->
<ice-calendar bind:monthChange="monthChange"></ice-calendar>

<!-- 年份变化时 -->
<ice-calendar bind:yearChange="yearChange"></ice-calendar>
```

### 事件小红点


```html
<ice-calendar spot="{{spots}}"></ice-calendar>
```

```js
Page({
  data: {
    spots: [
      '2022-07-20',
      '2022-07-20',
      '2022-07-20',
      '2022-07-20',
      '2022-07-20',
      '2022-07-20',
      '2022-07-21',
      '2022-07-21',
      '2022-07-22',
      '2022-07-22',
      '2022-07-23',
      '2022-07-24',
    ],
  },
});
```