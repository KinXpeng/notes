# 1、原生模板

## 1.1 渲染

```go
func sayHi(w http.ResponseWriter, R *http.Request) {
	// 1.解析模板
	t, _ := template.ParseFiles("./hello.html")
	// 2.渲染模板
	t.Execute(w, "方糖")
}
```

## 1.2 模板嵌套

> 自定义函数

使用新的方式渲染，解析自义定函数

```go
func f1(w http.ResponseWriter, r *http.Request) {
	// 自定义函数
	sayShuai := func(name string) string {
		return name + "真帅"
	}
	// 第二种方式渲染
	t := template.New("f.html")
	t.Funcs(template.FuncMap{
		"kua": sayShuai,
	})
	// 解析
	t.ParseFiles("./web03/f.html")
	t.Execute(w, "肖哥")
}
```

```html
{{kua .}}
```

. 传来的数据，作为 kua 函数的变量即 name

> 模板嵌套

解析了 t.html 页面，t 中又引入了 ul.html 页面和 ol.html 页面

```go
func TempLate(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./web04/t.html", "./web04/ul.html")
	t.Execute(w, nil)
}
```

t.html

```html
{{template "ul.html"}}
{{template "ol.html"}}
// 自定义模板
{{ define "ol.html"}}
    <ol>
        <li>吃饭</li>
        <li>睡觉</li>
        <li>玩游戏</li>
    </ol>
{{end}}
```

## 1.3 模板继承（代码复用）

先引入共用块，在引入需要的页面

```go
func index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./web05/base.html", "./web05/index.html")
	t.Execute(w, "index")
}
```

base.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
</head>
<body>
    <div class="nav">
        <div class="main">
            <div class="menu"></div>
            <div class="content" style="text-align: center;">
                {{block "nr" .}}{{end}}
            </div>
        </div>
    </div>
    
</body>
<style>
    * {
        margin: 0;
    }
    .nav {
        height: 50px;
        width: 100%;
        position: fixed;
        background-color: blueviolet;
        top: 0;
    }
    .main {
        margin: 50px;
    }
    .content {
        width: 20%;
        height: 100%;
        position: fixed;
        left: 0;
        background-color: aquamarine;
    }
</style>
</html>
```

index.html

```html
// 嵌套
{{template "base.html"}}

// 修改区块
{{ define "nr"}}
{{.}}
{{end}}
```

## 1.4 模板补充

> 修改默认标识符

应该原生的标识符 {{}} 与许多前端框架冲突了，比如 vue。所以这里需要修改 Go 的标识符。

必须在解析之前，设置自定义标识符，得采用 New 的方式。

```go
func index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("index.html").Delims("{[", "]}").ParseFiles("./web06/index.html")
	t.Execute(w, "SUGAR")
}
```

> text/template 和 html/template 区别

`html/template`针对返回 html 场景，会将风险内容进行转义，防止 xss 攻击。

```go
func xss(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("xss.html").Delims("{[", "]}").ParseFiles("./web06/xss.html")
	t.Execute(w, "<script>alert('xss 攻击')</script>")
}
```

![image-20211027221017126](https://i.loli.net/2021/10/27/CYJ4lbmXz69DSae.png)

JS 脚本会被转义，不会执行，保证数据安全。

但是问题来了，所有的内容都会被转义，有些内容我们希望不被转义，那就需要实现一个自定义函数，将危险内容转义，其他的正常输出。

> 模拟 xss 攻击

定义一个函数 safe ，被 safe 标记的 都会不转义，否则被转义。

```go
func xss(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("xss.html").Funcs(template.FuncMap{
		"safe": func(str string) template.HTML {
			return template.HTML(str)
		},
	}).ParseFiles("./web06/xss.html")

	str1 := "<script>alert('xss 攻击')</script>"
	str2 := "<a href='baidu.com'>百度</a>"
	t.Execute(w, map[string]string{
		"str1": str1,
		"str2": str2,
	})
}
```

由于 .str1 加了 safe 故，故 str1 的内容不会被转义

```html
<p>{{.str1 | safe}}</p>
<p>{{.str2}}</p>
```

# 2、Gin框架

## 2.1 Gin渲染

```go
func main() {
	r := gin.Default()
    // 解析文件
	r.LoadHTMLFiles("./web07/index.html")
    // 映射
	r.GET("/index", func(c *gin.Context) {
        // 返回JSON数据
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "gin渲染",
		})
	})
	r.Run()
}
```

如果有上百个模板文件，这样书写会很麻烦，所以可以通过正则解析 web07 文件夹下所有模板

```go
r.LoadHTMLGlob("web07/*")
```

## 2.2 自定义函数

```go
// 自定义函数，指定字符串不转义
r.SetFuncMap(template.FuncMap{
	"safe": func(str string) template.HTML {
		return template.HTML(str)
	},
})
```

在标识符中用 管道符号 执行自定义函数

## 2.3 引入静态文件

```go
// 加载静态文件
r.Static("css", "./web07")
```

html 页面引入css时直接 `css/index.css`，css 相当于把文件路径起了别名。

## 2.4 返回JSON数据

1、gin.H 返回JSON格式

```go
r.GET("/json", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
			"msg":  "OK",
			"data": "方糖",
		})
})
```

2、结构体返回JSON（可使用tag定制化操作）

略

## 2.5 获取参数（get请求）

> 通过 c.query（）

```go
// 获取前端参数
r.GET("/web", func(c *gin.Context) {
	name := c.Query("name")
	c.JSON(http.StatusOK, gin.H{
		"name": name,
	})
})
```

> 通过c.DefaultQuery（），如果age没有传入则使用默认值 20

```go
age := c.DefaultQuery("age", 20)
```

## 2.6 获取表单参数

> c.PostForm（）

```go
// 获取表单参数（post）
r.POST("/login", func(c *gin.Context) {
	user := c.PostForm("user")
	pwd := c.PostForm("pwd")
	c.JSON(http.StatusOK, gin.H{
		"user": user,
		"pwd":  pwd,
	})
})
```

## 2.7 获取路径参数

> 用 :名称 来获取到路径参数

```go
// 3.获取路径参数
r.GET("/path/:name/:age", func(c *gin.Context) {
	name := c.Param("name")
	age := c.Param("age")
	c.JSON(http.StatusOK, gin.H{
		"name": name,
		"age":  age,
	})
})
```

## 2.8 参数绑定

使用 `ShouldBind` 可以将前端数据与结构体自动绑定。

```go
type UserInfo struct {
    // json 绑定
	Username string `form:"user"`
	Password string `form:"pwd"`
}

func main() {
	r := gin.Default()

	r.GET("/user", func(c *gin.Context) {
		var data UserInfo
        // 在这里哦
		c.ShouldBind(&data)
		c.JSON(http.StatusOK, gin.H{
			"code": 200,
			"count" : 1,
			"data":  data,
		})
	})
    
	r.Run()
}
```

## 2.9 文件上传

- 单文件上传

```go
r.POST("/upload", func(c *gin.Context) {
	// 读文件
	f, _ := c.FormFile("file")
	// 保存文件
	c.SaveUploadedFile(f, "./web12/"+f.Filename)
    // 返回json
	c.JSON(http.StatusOK, gin.H{
		"msg": "上传成功",
	})
})
```

- 多文件上传

```go
r.POST("/up", func(c *gin.Context) {
    // 接受多文件
	form, _ := c.MultipartForm()
    // 拿到多文件对象
	fs := form.File["file"]
    // 遍历保存
	for _,file := range fs {
		c.SaveUploadedFile(file,"./web12/"+file.Filename)
	}
    // 返回json
	c.JSON(http.StatusOK,gin.H{
		"msg" : "上传成功",
	})
})
```

## 2.10 请求重定向

```go
// http重定向
r.GET("/go",func(c *gin.Context) {
c.Redirect(http.StatusMovedPermanently,"https://www.baidu.com/")
})

// 路由重定向
r.GET("/go1",func(c *gin.Context) {
	c.Request.URL.Path = "/go"
	r.HandleContext(c)
})
```

## 2.11 路由和路由组

- 匹配所有请求类型（GET,POST,PUT,DELETE，......）

```go
r.Any("/",func(c *gin.Context){
    c.JSON(http.StatusOK, gin.H{
		"msg": "ok",
	})
})
```

- 自定义404页面

```go
// 自定义404页面
r.NoRoute(func(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"msg": "页面跑丢了",
	})
})
```

- 路由组

```go
// 路由组,页面路径为 /av/index  和 /av/detail
av := r.Group("/av")
{
	av.GET("/index", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "index",
		})
	})
	av.GET("/detail", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "detail",
		})
	})
}
```

# 3、中间件

`c.Next()` 调用后面的函数，`c.Abort()` 阻止后面函数执行。

- 中间件入门

```go
// 计时中间件
func midle1(c *gin.Context){
	start := time.Now()
	c.Next()	// 调用后面的函数
	cost := time.Since(start)
	fmt.Println(cost)
}

func main() {
	// 中间件
	r := gin.Default()
	r.GET("/", midle1, func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "index",
		})
	})
	r.Run()
}
```

- 全局注册中间件

```go
r.Use(midle1)
```

- 中间件采用闭包封装

```go
func midel1(doCheck bool) gin.HandlerFunc{
    // 好处，在执行函数前可以 做一些其他业务
    // 比如查数据库等
    return func(c *gin.Context) {
    	start := time.Now()
    	c.Next()	// 调用后面的函数
    	cost := time.Since(start)
    	fmt.Println(cost)
    }
}
```

# 4、GORM连接数据库

## 4.1 简单操作

```go
type User struct {
	ID     uint
	Name   string
	Gender string
	Hobby  string
}

func main() {
	// gorm使用
	// 连接Mysql数据库
    db,_ := gorm.Open("mysql","账号:密码@(IP:端口)/Golang?charset=utf8mb4")
	defer db.Close()

	// 创建表 - 自动迁移
	db.AutoMigrate(&User{})

	// 插入数据
	u1 := User{1,"xnx","男","敲代码"}
	db.Create(&u1)

	// 更新数据
	var u User
	db.Model(&u).Update("hobby","足球")

	// 查询第一条数据
	db.First(&u)
	fmt.Println(u)

	// 删除数据
	db.Delete(&u)
}
```

## 4.2 模型定义



















