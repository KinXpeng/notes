### 1.NodeJS特性

**特点就是如何解决服务器高性能瓶颈问题**

- **单线程**

  - 在Java、PHP或者.net等服务器端语言中，会为每一个客户端创建一个新的线程，而每个线程需要耗费大约2MB的内存，理论上一个8G内存的服务器可以同时连接的最大用户数量为4000个，要让Web应用程序支持更多的用户，就需要增加服务器的数量，硬件成本也就相应增加了。
  - Node.js不为每个用户连接创建新的线程，当有用户连接时，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，**让Node.js宏观上时并行的**，使用Node.js，可以让一个8G的服务器同时处理超过4万用户的连接。
  - 单线程带来的好处，还有操作系统完全不再有线程创建、销毁的时间开销。
  - 缺点：**当一个用户使得单线程崩溃时，整个服务都崩溃了，其它用户也就崩溃了。**

- **非阻塞I/O**（访问数据库取得数据）

  - 当访问数据库取得数据时，需要一段时间。在传统的单线程处理机制中，在执行了访问数据库的代码之后，整个线程都将暂停下来，等待数据库返回结果，才能执行后面的代码。**也就是说，I/O阻塞了代码的执行，极大的降低了程序执行的效率。**

  - 由于Node.js中采用了非阻塞型I/O机制，因此在执行了访问数据库的代码之后，将会立即执行后面 的代码，把数据库返回的结果放在了**回调函数**当中，从而提高了程序的执行效率。

    ```js
    fs.readFile('./1.txt',(err,data)=>{
    	if(err) throw err
    	console.log(data)
    })
    ```

  - 当某个I/O执行完毕时，将以事件的形式通知执行I/O操作的线程，线程执行事件的回调函数，为了异步处理I/O，**线程必须有事件循环，不断检查有没有未处理的事件，依次予以处理**。
  - 非阻塞模式下，一个线程永远执行计算操作，这个线程的CPU核心利用率永远就是100% 。

- **事件驱动**
  
  - 在Node中，客户端请求建立连接，提交数据等行为 ，会触发相应的事件。在Node中，在一个时刻，只能执行一个事件的回调函数，但是在执行一个回调函数的中途，可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行事件的回调函数，这种处理机制，称为“事件环”机制。

### 2.NodeJS核心模块

##### 1. node 中没有DOM操作，没有alert()方法

##### 2.Buffer

​	2.1 `buf.fill()`返回的是一个Buffer

​	2.2 `buf.write()`返回的是字节数

### 3.express框架

#### 1.get请求

```js
const express = require('express');
// 创建服务器
// 传参 http://localhost:3000/index?id=1
// 传参 http://localhost:3000/index/1
const app = express();
app.get('/index',(req,res)=>{  // 第二种 '/index:id'
  res.send(req.query.id) //返回路由的参数  第二种: req.params.id
})
// 监听端口
app.listen(3000,()=>{
  console.log('服务器已启动');
})
```

#### 2.post请求

```js
const express = require('express');
const bodyParser = require('body-parser');

// 创建服务器
const app = express();

// 拦截所有请求

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended:false}))
// create application/json parser (raw)
app.use(bodyParser.json())

app.post('/add',(req,res)=>{
  res.send(req.body)
})

// 监听端口
app.listen(3000,()=>{
  console.log('服务器已启动');
})
```

```js
const express = require('express');

// 创建服务器
const app = express();
// 使用中间件对url进行编码
app.use(express.urlencoded({extended:true})) 
app.post('/login',(req,res)=>{
  res.send(req.body.id)
})

// 监听端口
app.listen(3000,()=>{
  console.log('服务器已启动');
})
```



#### 3.所有请求

```js
app.all('/',(req,res)=>{
	res.send('服务已启动')
})
```

#### 4.常用方法

```js
// 发送文件，注意要用到绝对路径
app.get('/',(req,res)=>{
	res.sendFile(`${__dirname}/package.json`)
})
// 重定向
app.get('/',(req,res)=>{
	res.redirect('/index')
})
// 结束
res.end()
```

#### 5.连接数据库（查询接口）

```js
// index.js
const express = require('express')
const mysql = require('mysql');  

const conn = mysql.createConnection({  // 数据库连接配置
  host:'localhost',
  port:'3306', // 默认3306可以不写
  user:'root',
  password:'123456',
  database:'test'
})

conn.connect() // 连接数据库

const app = express(); // 创建主应用
app.get('/',(req,res)=>{
  // let username = req.query.username;
  // if(username=='kinxpeng'){
  //   res.send('express')
  // }
  let sql = 'select * from user'; // sql查询语句
  conn.query(sql,(err,result)=>{
    if(err) throw err
    console.log(result);
    res.send(result);
  })
})
// conn.end()


// 发送文件 
// app.get('/',(req,res)=>{
//   res.sendFile(`${__dirname}/package.json`)
// })

// post请求
// app.use(express.urlencoded({extended:true}))  // post请求时需要对url进行编码
// app.post('/login',(req,res)=>{
//   console.log(req.body.id);
//   res.send('登录成功')
// })

app.listen(3000,()=>{  // 默认监听3000端口
  console.log('服务已启动');
})
```





### 4.用express搭建node服务器

 #### 1.项目创建

- 在`express`中文网，点击`快速入门` ==>`Express项目生成器`

  ```
  npx express-generator
  ```

- 创建配置目录文件夹`db `，并创建`config.js`和`index.js`文件

  <img src="/Users/mac/Library/Application Support/typora-user-images/image-20210225232804515.png" alt="image-20210225232804515"  />

- 在`config.js`中写入数据库配置

  ```js
  let dbOption = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
    }
  
  module.exports = dbOption;
  ```

- 在`index.js`中创建连接池

  ```js
  const mysql = require("mysql");
  const dbOption = require("./config");
  //创建连接池
  const pool = mysql.createPool(dbOption);
  function query(sql, params) {
    return new Promise((resolve, reject) => {
      //获取连接
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
          return;
        }
        //执⾏sql语句
        conn.query(sql, params, (err, result) => {
          conn.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  }
  module.exports = query;
  ```

- 并在`routes`中接口文件（例如`index.js`）中导入

  ```js
  const query = require("../db/index");
  ```

- 使用 `npm install` 安装相关的配置

- 安装nodemon `npm install nodemon --save`

- 安装mysql `npm install mysql --save`

- 安装跨域中间件，并在app.js中导入 (没有时安装`npm install cors  -S`)

  ```js
  // app.js
  const cors = require("cors"); // 跨域中间件
  app.use(cors()); // 使用跨域中间件
  ```

- 接口的`https`协议配置

  - 根目录下创建`https`文件夹，并且把相关的SSL证书密钥放入该文件夹

    ![image-20210225233849568](/Users/mac/Library/Application Support/typora-user-images/image-20210225233849568.png)

  ```js
  // 在.bin/www中
  const https = require("https");
  const fs = require("fs");
  const path = require("path");
  const privateCrt = fs.readFileSync(
    path.join(process.cwd(), "./https/1_api.kinxpeng.com_bundle.crt"),
    "utf8"
  );
  const privateKey = fs.readFileSync(
    path.join(process.cwd(), "./https/2_api.kinxpeng.com.key"),
    "utf8"
  );
  const HTTPS_OPTOIN = {
    key: privateKey,
    cert: privateCrt,
  };
  ```

  - 并且在`./bin/www`目录中把相关的`http`服务改为`https`

    ```js
    var server = https.createServer(HTTPS_OPTOIN, app);
    ```

    

  - 当本地服务器文件放在云服务器后可以调用`https`，进入node服务器根目录

    ```js
    // 可以使用node start启动服务或者安装了nodemon的话可以使用nodemon start
    // 推荐使用pm2启动服务
    pm2 start /bin/www
    ```

- 接口文件中引入`../db/index.js`的配置

  ```js
  var express = require("express");
  const query = require("../db/index");
  var router = express.Router();
  
  /* 后台登录接口 */
  // 使用async await 获取异步数据
  router.post("/login",async (req, res, next)=> {
    let { username,password } = req.body;
    try {
      let result = await query("select * from user where username = ? and password = ?", [username,password]);  
      if(!result || result.length === 0){
        res.send({ code: -1, msg: "账号或密码不正确"});
      }else{
        res.send({code:0,msg:'登录成功',data:null})
      }
    }catch(err){
      console.log(err);
      next(err)
    }
  });
  
  module.exports = router;
  ```


#### 2.路由守卫的设置 

- 在路由文件中，即`router/index.js` 中，需要守卫的路由中添加`meta`属性

  ```js
  {
      path:'/manage',
      name:'manage',
      component:() => import('@/views/admin/manage.vue'),
      meta:{
        requireAuth:true
      }
   }
  ```

- 根目录下的`main.js`中添加路由前置钩子函数

  ```js
  router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){ // 判断是否要权限
      if(store.state.token){ // token的判断
        next()
      }else{
        next({path:'/login'})
      }
    }else{
      next()
    }
  })
  ```

  

#### 3.pm2的使用(也可以使用sudo启动)

- 列出pm2管理的所有应用程序

  ```js
  pm2 list // pm2 ls
  ```

-  启动项目

  ```js
  pm2 start ./bin/www 
  // 可根据id启动某一项
  pm2 start id  // pm2 start 0
  ```

- 重启项目

  ```js
  pm2 restart all // pm2 restart 0
  ```

- 暂停项目

  ```js
  pm2 stop all // pm2 stop 0
  ```

- 重载项目

  ```js
  pm2 reload all // pm2 reload 0
  ```

- 删除项目

  ```js
  pm2 delete all // pm2 delete 0
  ```

- 项目重命名

  ```js
  pm2 start ./bin/www --name test
  ```


####  文件读写

- `fs.readFile()` 

  ```js
  // 读取文件 异步/同步为fs.readFileSync(),没有回调函数
  // 1.文件路径 2.对象 flag为读写标志，r为读取，encoding为文件格式编码 3.回调函数
  fs.readFile('1.txt',{flag:'r',encoding:'utf-8'},(err,data)=>{
    if(err)throw err
    console.log(data)
  })
  ```

- `fs.writeFile()`

  ```js
  // 写入文件
  // 1.路径 2.写入内容 3.对象 4.回调函数
  fs.writeFile('./index.txt','写入内容',{flag:'w',encoding:'utf-8'},(err)=>{
    if (err) throw err;
    console.log('写入成功！');
  })
  ```

- `fs.appendFile()`

  ```js
  // 追加写入文件
  // 1.路径 2.追加写入内容 3.对象 4.回调函数
  fs.writeFile('./index.txt','写入内容',{flag:'a',encoding:'utf-8'},(err)=>{
    if (err) throw err;
    console.log('追加写入成功！');
  })
  ```

- `fs.unlink()`

  ```js
  // 删除文件
  fs.unlink('./test.txt',()=>{  // 1.路径  2.回调函数
    console.log('删除成功!');
  })
  ```

- `fs.readdir()`

  ```js
  // 读取目录
  // 1.路径 2.回调函数
  fs.readfir('./test',(err,files)=>{
    if(err) throw err;
    console.log(files) // 输出该目录下的所有文件 
  })
  ```

- `fs.rmdir()`

  ```js
  // 删除目录
  // 1.路径 2.回调函数
  fs.rmdir('./test',(err)=>{
    if(err) throw err;
    console.log('删除成功') // 删除该目录下的所有文件 
  })
  ```


- `fs.readline()`

  ```js
  // 引入包
  const readline = require('readline');
  // 创建接口对象
  let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
  });
  // 提出问题
  r1.question("在吗？",function(answer){
    console.log('答案：'+answer);
    r1.close();
  })
  // 关闭后退出进程
  r1.on('close',function(){
    process.exit(0)
  })
  
  /* 避免重复嵌套函数可用Promise对象进行封装*/
  function Question(title){
    return new Promise((resolve,reject)=>{
      r1.question(title,(answer)=>{
        resolve(answer)
      })
    })
  }
  async function fn(){  // 调用Promise时最好使用async异步方法
    await Qusetion('在吗？');
    r1.close();
  }
  ```

- `fs.createWriteStream('./index.txt',{flag:'w',encoding:'utf-8'})`   ==文件写入流==

- `fs.createReadStream('./index.txt',{flag:'r',encoding:'utf-8'})`   ==文件读取流==

  ```js
  // 写入流
  let ws = fs.createWriteStream('./index.txt',{flag:'w',encoding:'utf-8'})
  ws.write('hello',(err)=>{
    if(err) throw err
  })
  ws.end(()=>{
    console.log('写入完成');
    process.exit()
  })
  ```

#### Buffer

- `Buffer.from()`
  
  - 使用 `0` – `255` 范围内的字节数组 `array` 来分配一个新的 `Buffer`
  
- `Buffer.alloc()`

  ```js
  // 开辟一个大小为10的内存空间
  let buf = Buffer.alloc(10);
  buf[0] = '123';  // 用来存放数据
  ```

- `Buffer.allocUnsafe()` 
  
  - 不安全，但效率高。

#### 事件循环

```js
let events = require('events');
let evEmitter = new events.EventEmitter(); // 事件触发
evEmitter.on('fn',(data)=>{ // 监听
  console.log('触发')
  console.log(data)
})
fs.readFile('./test.txt',{flag:'r',encoding:'utf-8'},(err,data)=>{
  if(err){
    console.log(err)
  }else{
    console.log(data);
    evEmitter.emit('fn',data)
  }
})	
```

#### path

- `path.extname()`

  ```js
  // 获取后缀名
  let path = require("path");
  let str = "www.baidu.com/123.txt"; 
  let info = path.extname(str);
  console.log(info);  // ==> .txt
  ```

- `path.resolve()`  // 将数组的每一项拼接， 解析为绝对路径  (数组需要展开,...arr)

- `path.__dirname()` // 绝对路径

#### os

- `os.cpus()`

  ```js
  let os = require("os");
  console.log(os.cpus()); // cpu信息
  ```

- `os.arch()`
- `os.platform()`

#### url

- `url.parse()`

  ```js
  let url = require("url");
  let httpUrl = "https://www.baidu.com";
  console.log(url.parse(httpUrl));
  ```

- `url.resolve()`  // 合成新地址

#### axios

- 安装axios，进行请求/爬虫。

  `npm install axios`

##### 爬取网络图片并下载到本地

```js
const https = require('https');
const cheerio = require('cheerio'); // node中使用jquery
const fs = require('fs');
const request = require('request'); // 需要安装request模块（npm i request）

let url = 'https://www.w3cschool.cn/';//'https://www.cnbeta.com/'
let reg = /^https?:\/\//; // 校验url是否可用
downImgs();
function downImgs(){
  https.get(url,(res)=>{
    let data = '';
    res.setEncoding('binary'); // 下载图片的编码
    res.on('data',(chunk)=>{
      data += chunk;
    })
    res.on('end',()=>{
      const $ = cheerio.load(data);
      let imgUrl = '';
      if(!fs.existsSync('./imgs')){ // 判断是否存在该目录
        fs.mkdirSync('./imgs') // 不存在时创建目录
      }
      $('img').each((index,el)=>{
        imgUrl = 'http:' + $(el).attr('src');
        if(reg.test(imgUrl)){
          request(imgUrl).pipe(fs.createWriteStream(`./imgs/${index+1}.png`));
          let progress = (((index+1)/$('img').length)*100).toFixed(1); // 下载进度
          if(progress < 100.0){
            console.log(progress+'%');
          }
        }
      })
      console.log('下载完成');
    })
  }).on('error',()=>{
    console.log('下载错误');
  })
}
```

##### 阿里OSS

```js
const client = new OSS({
  region: "oss-cn-beijing", //填写你开通的oss
  accessKeyId: "LTAI5t9hvDnffbrSCZAGtXgw",
  accessKeySecret: "yzXWOjvUSsLgVnjxgjcXRdDkRgr2dR"
});
```

