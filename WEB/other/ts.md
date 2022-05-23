#### 1.开发环境搭建

- 全局安装ts

  ```js
  npm install typescript -g // 或者使用yarn安装（yarn global add typescript）
  ```

- 项目运行

  ```js
  npm install -g ts-node
  // 再使用
  ts-node index.ts
  ```


##### ts格式文件转js

- 控制台中输入将ts文件转换为js

```bash
tsc index.ts
```

##### ts基本配置

- 生成ts配置文件

  ```typescript
  tsc --init  // 初始化tsconfig.json文件
  ```

- 实时编译成js文件

  ```typescript
  tsc --watch 
  ```

- ts文件没有错误时才可编译

  ```typescript
  tsc --noEmitOnError
  ```

- 1

##### 变量声明

- 定义声明类型

  ```js
  // 声明类型之后，赋值其它类型会报错
  let a:number; // number类型，只能给a赋值为数字
  a = 1;
  ```