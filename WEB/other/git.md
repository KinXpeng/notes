### git 常用命令

- 现有的git仓库与其它远程仓库作关联

  ```BASH
  git remote set-url --add origin 码云项目地址
  ```

- 新建远程仓库与本地初始化仓库关联

  ```js
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin https://github.com/KinXpeng/react-admin-vite.git
  git push -u origin main
  ```

  