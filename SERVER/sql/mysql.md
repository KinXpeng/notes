#### 常见命令行

```bash
关闭MySQL：sudo /usr/local/mysql/support-files/mysql.server stop

开启MySQL：sudo /usr/local/mysql/support-files/mysql.server start

重启MySQL：sudo /usr/local/mysql/support-files/mysql.server restart

登录MySQL root账户：mysql -u root -p，然后输入密码，就能登录成功，进入mysql命令；

退出MySQL登录：exit

在登录MySQL的情况下，才能进行如下操作，注意⚠️后面的分号不能丢；

查看MySQL的版本号：select version();

显示所有数据库列表：show databases;

删除指定的数据库：drop database xxx;

修改root账户的密码：ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

