### 数据库连接

- 注意事项

  - 初始化mod

    ```go
    go mod init server
    ```

  - 下载 `gin` 框架和 `mysql` 库

    ```go
    // 下载gin
    go get -u github.com/gin-gonic/gin
    // 下载mysql
    go get -u github.com/go-sql-driver/mysql
    ```

- 连接mysql数据库

  ```go
  // utils/db.go
  package utils
  
  import (
  	"database/sql"
  	"fmt"
  
  	_ "github.com/go-sql-driver/mysql"
  )
  
  func DbConnect() *sql.DB {
  	db, err := sql.Open("mysql", "root:password@(localhost:3306)/database")
  	db.SetMaxOpenConns(10)
  	db.SetMaxIdleConns(5)
  	if err != nil {
  		panic(err)
  	}
  	if err := db.Ping(); err != nil {
  		fmt.Println("连接失败")
  		panic(err.Error())
  	}
  	fmt.Println("连接成功")
  	return db
  }
  ```

- 建立连接并查询

  ```go
  // routers/router.go
  package routers
  
  import (
  	"database/sql"
  	"fmt"
  	"log"
  	"net/http"
  	"server/utils"
  
  	"github.com/gin-gonic/gin"
  )
  
  var (
  	Db *sql.DB
  )
  
  type User struct {
  	Id       string `json:"id" form:"id"`
  	Username string `json:"username" form:"username"`
  	Age      string `json:"age" form:"age"`
  	Sex      string `json:"sex" form:"sex"`
  }
  
  // 中间件
  func MiddleWare() gin.HandlerFunc {
  	return func(c *gin.Context) {
  		fmt.Println("中间件执行完毕")
  		c.Next()
  	}
  }
  
  // 总路由
  func SetupRouter() *gin.Engine {
  	Db = utils.DbConnect()
  	// defer Db.Close()
  	r := gin.Default()
  	r.Use(MiddleWare())
  	user := r.Group("/user")
  	{
  		user.GET("/list", UserHandler)
  	}
  	return r
  }
  
  // user路由
  func UserHandler(c *gin.Context) {
  	var user User
  	userList := make([]User, 0)
  	rows, err := Db.Query("select * from articles")
  	defer rows.Close()
  	if err != nil {
  		log.Fatal(err)
  	}
  	i := 0
    for rows.Next() { //循环显示所有的数据(顺序与数据库顺序一致)
  		rows.Scan(&user.Id, &user.Username, &user.Age, &user.Sex)
  		userList = append(userList, user)
  		i++
  	}
  	c.JSON(http.StatusOK, gin.H{
  		"code": 0,
  		"msg":  "请求成功",
  		"data": &userList,
  	})
  }
  ```

- 入口文件初始化

  ```go
  // main.go
  package main
  
  import (
  	"server/routers"
  )
  
  func main() {
  	r := routers.SetupRouter()
  	r.Run(":88")
  }
  ```

