### 不常用的CSS

```css
/* 定位 */ 
position:sticky;
/* 鼠标样式 */
cursor:zoom-in; /* 放大 */
cursor:zoom-out; /* 缩小 */
```

### 同级内联元素对不齐

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>文档标题</title>
  <style>
  .box{
    height:50px;
    background-color:#eee;
    white-space:nowrap;
  }
   /*
    	inline-block的元素默认对齐方式为baseline，元素中无内容时以盒子底边对齐，有文字时，以文字底部对齐。
    */
  .box > div{
    /* overflow:hidden; */
    /* vertical-align:top; */
    display:inline-block;
    width:100px;
    height:50px;
    border:1px solid red;
  }
  </style>
</head>
<body>
  <div class="box">
    <div></div>
    <div>1</div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</body>
</html>
```

