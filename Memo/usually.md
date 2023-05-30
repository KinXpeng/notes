### push项目到git 仓库
```
echo "# react-admin-vite" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/KinXpeng/react-admin-vite.git
git push -u origin main
```

### 双开微信

```bash
open -n /Applications/WeChat.app
```

### 安装volta

```bash
curl https://get.volta.sh | bash

// 安装node
volta install node@14
volta install node@16

// 然后到对应的前端项目根目录
volta pin node@16
volta pin yarn@1.22.19
```

