#### 1.EventBus

```js
// 为保持和vue2版本中使用bus一致，emit,on,off前面都加了$
class Bus {
	list: { [key: string]: Array<Function> };
	constructor() {
		// 收集订阅信息,调度中心
		this.list = {};
	}

	// 订阅
	$on(name: string, fn: Function) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}

	// 发布
	$emit(name: string, data?: any) {
		if (this.list[name]) {
      		this.list[name].forEach((fn: Function) => {
        	fn(data);
      });
    }
	}

	// 取消订阅
	$off(name: string) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}
export default Bus;
```

```js
// 引入
import Bus from './bus'
export default new Bus();
```

- 也可以使用引入mitt依赖的方法，用法和事件总线相似。

#### 2.Mock的使用方法

```js
// *******************mock.js中*******************
import Mock from 'mockjs';

Mock.setup({
  timeout:'200-2000'
});

// 三个参数 （1.正则，设置接口名 2.请求方法 string 格式 3.回调函数）
Mock.mock(/\/api\/login/,'post',(req:any)=>{
  // 账号池
  const accoutPools = [
    {username:'admin',password:'123456'},
    {username:'test',password:'123456'},
  ];
  // 获取请求的数据
  const {username,password} = JSON.parse(req.body);
  // 过滤账号是否存在
  const exsitAcc = accoutPools.filter((res)=>{
    return res.username == username;
  });
  if(exsitAcc.length>0){
    // 校验密码
    if(exsitAcc[0].password == password){
      return {
        code:0,
        msg:'登录成功',
        token:'qweqweqwrq'
      }
    }else{
      return {
        code:-1,
        msg:'密码错误'
      }
    }
  }else{
    return {
      code:-1,
      msg:'账号不存在！'
    }
  }
});

export default Mock;


// *******************在main.js中引入*******************
import './mock'
```

#### 3.日期禁用

```js
// 去掉日期选择右上角下一月被禁用
      if (document.getElementsByClassName("el-picker-panel")[0]) {
        let butten = document.getElementsByClassName("el-picker-panel")[0].getElementsByClassName("is-left")[0].getElementsByClassName("el-icon-arrow-right")[0];
        butten.classList.remove("is-disabled");
        butten.removeAttribute("disabled"); // 去掉日期选择右上角下一年
        let nextYear = document.getElementsByClassName("el-picker-panel")[0].getElementsByClassName("is-left")[0].getElementsByClassName("el-icon-d-arrow-right")[0];
        nextYear.classList.remove("is-disabled");
        nextYear.removeAttribute("disabled");
      }
```

### 4.vue3中jsx语法的ui组件插槽的写法

```jsx
<Search v-model={state.searchValue} placeholder="输入车牌号/检查单号进行查询" background="#eee" left-icon="">
  {{
     "right-icon":(()=>
        <span className={styles.search_btn} onClick={handleSearch}>搜索</span>
     )
  }}
</Search>
```

### 5.css Modules中样式穿透的写法

```scss
// 使用global进行样式穿透
:global(.van-icon-arrow-left) {
  padding: 10px 0;
  font-size: 16px;
  &:hover {
    background-color: #ddd;
  }
}
```



