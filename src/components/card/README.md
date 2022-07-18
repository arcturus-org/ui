# card 组件

## Usage

### 标题

```html
<ice-card>
    <ice-header title="标题" sub="副标题"></ice-header>
    <!-- 分割线 -->
    <ice-separator></ice-separator>
</ice-card>
```

### section 自带 padding

```html
<ice-card>
    <ice-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat.
    </ice-card-section>
  </ice-card>
```

### actions 可以放按钮

```html
<ice-card>
    <ice-card-actions align="right">
      <ice-button label="取消"></ice-button>
      <ice-button label="确认"></ice-button>
    </ice-card-actions>
  </ice-card>
```
