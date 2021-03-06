# xb-tabs 标签页

选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

---

## 基础用法

<div class="demo-button">
  <div>
    <xb-tabs value="标签一">
        <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一">
  <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
  <xb-tabs-pane label="标签二">标签标题二</xb-tabs-pane>
  <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
</xb-tabs>
```

## 禁用某一项

禁用的选项与 xb-tabs 被选中的选项，不能是同一个

<div class="demo-button">
  <div>
    <xb-tabs value="标签一">
        <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二" disabled="true">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一">
  <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
  <xb-tabs-pane label="标签二" disabled="true">标签标题二</xb-tabs-pane>
  <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
</xb-tabs>
```

## 文案前加图标

<div class="demo-button">
  <div>
    <xb-tabs value="标签一">
        <xb-tabs-pane label="标签一" icon="edit">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二" icon="achievement">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三" icon="activity">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一">
  <xb-tabs-pane label="标签一" icon="edit">标签标题一</xb-tabs-pane>
  <xb-tabs-pane label="标签二" icon="achievement">标签标题二</xb-tabs-pane>
  <xb-tabs-pane label="标签三" icon="activity">标签标题三</xb-tabs-pane>
</xb-tabs>
```

## 可关闭标签

将当前标签页移除,若当前标签页被选中了，则被选中项自动向后移一位

<div class="demo-button">
  <div>
    <xb-tabs value="标签一" type="card">
        <xb-tabs-pane label="标签一" closable="true">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二" closable="true">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三" closable="true">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一" type="card">
  <xb-tabs-pane label="标签一" closable="true">标签标题一</xb-tabs-pane>
  <xb-tabs-pane label="标签二" closable="true">标签标题二</xb-tabs-pane>
  <xb-tabs-pane label="标签三" closable="true">标签标题三</xb-tabs-pane>
</xb-tabs>
```

## 多样式展示

#### 卡片样式

<div class="demo-button">
  <div>
    <xb-tabs value="标签一" type="card">
        <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一" type="card"> ... </xb-tabs>
```

#### 按钮样式

<div class="demo-button">
  <div>
  <xb-tabs value="标签一" type="btn">
        <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一" type="btn"> ... </xb-tabs>
```

#### 滑块样式

<div class="demo-button">
  <div>
  <xb-tabs value="标签一" type="slider">
        <xb-tabs-pane label="标签一">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一" type="slider"> ... </xb-tabs>
```

## 未读信息文案展示

<div class="demo-button">
  <div>
    <xb-tabs value="标签一">
        <xb-tabs-pane label="标签一" :count="1">标签标题一</xb-tabs-pane>
        <xb-tabs-pane label="标签二" :count="123">标签标题二</xb-tabs-pane>
        <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
    </xb-tabs>
  </div>
</div>

```html
<xb-tabs value="标签一">
  <xb-tabs-pane label="标签一" :count="1">标签标题一</xb-tabs-pane>
  <xb-tabs-pane label="标签二" :count="123">标签标题二</xb-tabs-pane>
  <xb-tabs-pane label="标签三">标签标题三</xb-tabs-pane>
</xb-tabs>
```

## 动态编辑标签

#### 在右侧增加编辑按钮

#### 紧跟标签内容，增加编辑按钮

## 外部传入的样式

## TODO

将当前标签页移除到最后一项的时候，需要给出一个提示，我直接用了 alert，以后需要根据需求修改掉

## 参数表

#### xb-tabs

| 参数名 | 参数说明                                                    | 类型   | 可选值                  | 默认值 |
| :----- | :---------------------------------------------------------- | :----- | :---------------------- | :----- |
| value  | 被选中的值，其内容必须与 xb-tabs-pane 的 label 中的一个相同 | string | ——                      | ——     |
| type   | 切换组件 样式展示                                           | string | line, card, btn, slider | line   |

#### xb-tabs-pane

| 参数名   | 参数说明                                 | 类型   | 可选值 | 默认值 |
| :------- | :--------------------------------------- | :----- | :----- | :----- |
| label    | 标签，用来与 xb-tabs 的 value 进行匹配   | string | ——     | ——     |
| disabled | 禁用某一选项                             | object | ——     | false  |
| icon     | 文案前面的 icon                          | string | ——     | ——     |
| closable | 可以关闭某一项，仅在 type 为 card 时有效 | object | ——     | false  |
| count    | 用户的未读数目，超过 99 则显示为：99+    | number | ——     | ——     |

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 黄莹 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
