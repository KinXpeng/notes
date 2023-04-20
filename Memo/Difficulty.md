### js拖拽页面控制滚动条

- 通过js拖拽页面控制滚动条滚动不平滑，忽快忽慢

- 鼠标移动距离和页面拖动距离不相符合

- 解决：

  ```html
  <div class="box" ref="scroll">
    <div class="container" ref="content" @mousedown="mouseDown" @mouseup="mouseLeave" @mouseleave="mouseLeave" @mousemove="mouseMove">
      <div class="item" v-for="item in 20">{{item}}</div>
    </div>
  </div>
  ```

  ```js
  data() {
    return {
      downX: 0, // 鼠标按下的x坐标
      scrollX: 0, // 移动的距离
      downFlag: false // 鼠标是否按下
    }
  },
  // 鼠标拖动事件
  mouseDown(e) {
    this.downX = e.clientX
    this.downFlag = true
    this.scrollX = this.$refs.scroll.scrollLeft
  },
  mouseLeave() {
  	this.downFlag = false
  },
  mouseMove(e) {
    if (this.downFlag) {
      // 鼠标移动的距离
      const moveX = e.clientX - this.downX
      // 移动的距离 = 鼠标按下的时候，获取当前元素的scrollLeft + 鼠标移动的距离
      if (this.$refs.scroll) {
        const _scroll = this.$refs.scroll
        this.$refs.scroll.scrollLeft = this.scrollX - moveX
  			// 判断滚动条已到最右侧
        if (_scroll.scrollLeft >= _scroll.scrollWidth - _scroll.offsetWidth) {
        	this.$refs.scroll.scrollLeft = _scroll.scrollWidth - _scroll.offsetWidth
        }
      }
    }
  }
  ```


### vuedraggable

- 对一个盒子使用 `vue-draggable`时，其盒子自身的拖拽等事件被禁止，使用disabled禁止拖拽后，事件仍然禁止，源码中的配置了`preventOnFilter=true`，将其关闭即可。

### 11111