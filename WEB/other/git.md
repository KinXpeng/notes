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

  

### git切换分支与远程仓库关联

```js
// 1.拉取远程分支origin/branch到本地并创建一个新的关联分支
git checkout -b newbranch origin/branch
// 2.将本地分支上传到远端，同时关联newbranch和远端branch分支
git push --set-upstream origin newbranch:origin/branch
// 3.将本地newbranch分支与远端branch分支关联
git branch --set-upstream-to=origin/branch newbranch
```

### 使用gum配置多个git账号

```js
// 安装
npm i -g @gauseen/gum

// 列出本地配置
gum list

// 使用
Usage: gum [options] [command]

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  list                        List all the user config group
  set [options] <group-name>  Set one group for user config
    --name                    User name
    --email                   User email
  use [options] <group-name>  Use one group name for user config
    --global                  Git global config
  delete <group-name>         Delete one group
  help [command]              display help for command
```

