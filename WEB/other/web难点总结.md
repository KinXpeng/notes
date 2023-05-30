####  数据响应式

- 数据的变化会引发界面的变化

- 数据变化的时候会自动运行一些相关函数

- 数据响应式例子：

  ```js
  /**
   * 观察某个对象的所有属性
   * @param {Object} obj
   * */
  function observe(obj) {
  	for (const key in obj) {
  		let internalValue = obj[key]
  		// const funcs = new Set() // 避免出现重复的函数
  		const funcs = []
  		Object.defineProperty(obj, key, {
  			get: function () {
  				// 记录：哪个函数在用
  				// funcs.add(window.__func)
  				if (window.__func && !funcs.includes(window.__func)) {
  					funcs.push(window.__func)
  				}
  				return internalValue
  			},
  			set: function (val) {
  				internalValue = val
  				// 派发更新，运行：执行用我的函数
  				for (let i = 0; i < funcs.length; i++) {
  					funcs[i]()
  				}
  			}
  		})
  	}
  }
  
  // 自动执行
  function autorun(fn) {
  	window.__func = fn
  	fn()
  	window.__func = null
  }
  ```

#### 闭包

- 2个特点
  - 函数嵌套函数
  - 内层函数可以访问外层函数的变量和参数

- 2个作用

  - 防止变量和参数被GC（垃圾回收机制回收）
  - 防止变量和参数被外部污染

- 1个风险

  - 滥用可能会造成内存泄露的风险

- 例子：

  ```js
  function createCounter() {
    let count = 0;
    return function() {
      count++;
      console.log(count);
    };
  }
  
  const counter = createCounter();
  counter(); // 1
  counter(); // 2
  
  // 防抖和节流也采用了闭包
  ```

#### class类

- 使用class实现继承

  ```js
  class Person {
  	constructor(name) {
  		this.name = name
  	}
  
  	drink() {
  		console.log('喝水')
  	}
  }
  
  class Student extends Person {
  	constructor(name, score) {
  		super(name)
  		this.score = score
  	}
  
  	introduce() {
  		console.log(`我叫${this.name}，考了${this.score}分`)
  	}
  }
  
  const student = new Student('张三', 78) // 实例对象
  console.log(student)
  student.introduce()
  student.drink()
  
  class Teacher extends Person {
  	constructor(name, subject) {
  		super(name)
  		this.subject = subject
  	}
  
  	introduce() {
  		console.log(`我叫${this.name}，教${this.subject}`)
  	}
  }
  
  const teacher = new Teacher('李四', '前端')
  console.log(teacher)
  teacher.introduce()
  ```

#### 原型

- 原型链是有两个概念的一个显式原型和隐式原型。先有个Person这个类，类里面有喝水这个方法（函数），Person这个类里面的所有方法（函数）看做为显示原型。好，Person这里是这样理解的，再来看Teacher，Teacher这个地方开始真的分为隐式和显式了，因为Teacher的类继承了Person所以Person的显式原型变成了Teacher的隐式原型。最后再被new出来的teacher的显式原型是自己的几个参数，然后隐式原型指向着Teacher，Teacher又继承了Person，然后特性就是调用方法（函数）的时候自己没有会去隐式原型里面找，找不到就又会去上一级找直到最上面。

- 详解

  ```js
  // 实例化出来的student上的__proto__与类Student上的prototype相等
  
  console.log(student.__proto__ === Student.prototype) // true
  
  // 隐式原型(student.__proto__)会指向类的显式原型（Student.prototype）
  ```

#### 原型链

- 原型上的属性都能直接访问到

- 当我们访问一个对象的属性或方法的时候，首先它会从自身去找，如果找不到的话，就会往它的原型(\__proto__)上去找，原型上还是找不到的话，就会往原型的原型上去找，这样以来，就形成一条链式的结构，称之为原型链。

- 通过`student.hasOwnProperty('name')`可以判断某个属性或方法是不是对象自身拥有的。

  ```js
  let obj = {}
  obj.__proto__ = {}
  obj.__proto__.a = 1
  console.log(obj.a) // 1
  
  Object.__proto__ = null // 执行null
  hasOwnProperty这个方法存在于 Object.prototype上
  ```

#### instanceof

```js
[] instanceof Array  // true  原型上的构造函数是Array
{} instanceof Object // true  原型上的构造函数是Object

/*
[]
__proto__:
		constructor:f Array()  // 数组原型上构造函数是Array
*/ 
```

#### webpack

- 初始化项目

  ```js
  npm init -y // 或者yarn init -y  生成package.json文件
  ```

- 安装webpack

  ```js
  npm install webpack webpack-cli --dev  // 仅在开发环境生效
  ```

- 创建webpack.config.js

  - 安装 style-loader css-loader 解析css

    ```js
    npm install style-loader css-loader --dev
    ```

  - 安装html-webpack-plugin生成html

    ```js
    npm install html-webpack-plugin --dev
    ```

  - 安装babel兼容低版本浏览器

    ```js
    npm install babel-loader @babel/core @babel/preset-env --dev
    ```

  - 安装terser-webpack-plugin，压缩打包后的代码

    ```js
    npm install terser-webpack-plugin --dev
    ```

  - 安装webpack-dev-server，修改后自动重新打包刷新页面

    ```js
    npm install webpack-dev-server --dev
    ```

    ```js
    // 在package.json中添加webpack serve --open，自动打开浏览器
    "scripts": {
      "dev": "webpack serve --open"
    }
    
    // 配置后可通过 npm run dev 运行项目自动打开浏览器
    ```

  - 安装webpack-bundle-analyzer打包分析工具

    ```js
    npm install webpack-bundle-analyzer --dev // 会在打包的时候自动打开浏览器，显示打包后的文件体积
    ```

  - 1111

    ```js
    const path = require('path') 
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const TerserPlugin = require('terser-webpack-plugin')
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    
    module.exports = {
      mode: 'development', // 指定环境
      devtool: 'inline-source-map', // 定位源文件中的错误，映射到具体的行数
    	entry: './src/index.js', // 入口文件
    	output: {
    		path: path.resolve(__dirname, 'dist'), // 输出文件夹名称及路径
    		// filename: 'index.js' // 输出文件
        filename: '[name][contenthash].js' // 配置contenthash，每次修改后打包生成的文件名都不一样
    	},
      resolve: {
    		alias: { // 设置文件路径别名
    			'@': path.resolve(__dirname, 'src')
    		}
    	},
      optimization:{
        minimize: true, // 是否要压缩
        minimizer: [new TerserPlugin()], // 使用什么工具压缩
      },
      devServer: {
    		static: './dist' // 指定dist目录，配合命令自动打开浏览器
    	},
      // 加载插件
      plugins:[
        new HtmlWebpackPlugin({ title: '测试标题', // 自定义生成html的标题
      	}),
        new BundleAnalyzerPlugin.BundleAnalyzerPlugin() // 打包分析工具，分析打包后的文件大小
      ],
      // 此处模块的使用为了解析css，需要安装style-loader和css-loader
      // 安装命令：npm install style-loader css-loader --dev
    	module: { // 模块使用
    		rules: [
    			{
    				test: /\.css$/i, // 利用正则匹配css文件
    				use: ['style-loader', 'css-loader'] // 使用依赖
    			},
          {
    				test: /\.(png|jpg|jpeg|svg)$/i, // 解析图片（webpack自带解析图片，不需要安装依赖）
    				type: 'asset/resource'
    			},
          {
    				test: /\.js$/i,
    				exclude: /node_modules/, // 忽略node_modules文件夹
    				use: { // 自定义配置项使用对象的形式
    					loader: 'babel-loader', 
    					options: {
    						presets: ['@babel/preset-env']
    					}
    				}
    			}
    		]
    	}
    }
    ```

    

  

- 111

#### 1111