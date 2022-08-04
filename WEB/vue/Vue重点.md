#### 配置本地 `rollup` 开发环境

- 初始化

  ```js
  // 生成package.json文件
  npm init -y
  ```

- 安装依赖

  ```js
  npm install rollup rollup-plugin-babel @babel/core @babel/preset-env --save-dev
  ```

- 新建 `rollup.config.js` 配置文件

- 配置脚本

  ```json
  // package.json
  "scripts": {
    "dev": "rollup -cw"   // -c 使用配置文件 -w 监控
  },
  ```

  

- 111