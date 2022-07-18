# navbar

## Usage

### 磨砂背景

```html
<!-- 背景色存在透明度时生效 -->
<ice-navbar 
    blur
    background-color="rgba(255, 255, 255, 0.8)"
></ice-navbar>
```

### 加载

```html
<ice-navbar loading ></ice-navbar>
```

### 导航栏标题

```html
<!-- 主标题 + 副标题 + icon -->
<ice-navbar 
    title="首页"
    sub="小程序组件" 
    left-icon="xxx"
></ice-navbar>
```

### 是否自动占位

```html
<!-- 防止导航栏遮挡底下元素 -->
<ice-navbar occupy></ice-navbar>
```

### 返回图标
```html
<ice-navbar back></ice-navbar>
```

> 如果定义 left-icon 优先使用 left-icon