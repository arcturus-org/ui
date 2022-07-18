# cell 组件

## Usage

### 设置标题

```html
<ice-cell label="关于"></ice-cell>
```

### 显示跳转箭头

```html
<ice-cell label="关于" is-link></ice-cell>
```

### 跳转路径

```html
<ice-cell label="关于" is-link path="/pages/about/index"></ice-cell>
```

### 设置标题图标

```html
<ice-cell label="关于" left-icon="ri ri-question-line"></ice-cell>
```

### 设置右图标

```html
<ice-cell label="搜索" right-icon="ri ri-search-line"></ice-cell>
```

> is-link 与 right-icon 不能同时生效

### 自定义插槽

```html
<ice-cell>
    <view class="row items-center" slot="label">
        <view>hello</view>
        <view>, world!</view>
    </view>
</ice-cell>
```

> label 与 slot 不能同时生效