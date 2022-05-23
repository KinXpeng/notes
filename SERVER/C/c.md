#### 常用命令

- 编译c/c++程序

  ```bash
  gcc -o test index.cpp
  ```

- 配置vscode debug调试

  `.vscode`文件夹

  - launch.json

    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "lldb",
          "request": "launch",
          "name": "Debug",
          //"program": "${workspaceFolder}/a.out",
          //上一行是官方写法，但是不同的cpp调试都要改配置，非常麻烦
          "program": "${workspaceFolder}/${fileBasenameNoExtension}",
          "args": [],
          "cwd": "${workspaceFolder}",
          "preLaunchTask": "Build with Clang"
        }
      ]
    }
    ```

  - tasks.json

    ```json
    {
      "version": "2.0.0",
      "tasks": [
        {
          "label": "Build with Clang", //这个任务的名字在launch.json最后一项配置
          "type": "shell",
          "command": "clang++",
          "args": [
            "-std=c++17",
            "-stdlib=libc++",
            // "index.cpp", // 这里是官方写法，不具有普遍性，注意两个配置文件的统一性即可
            "${fileBasenameNoExtension}.cpp",
            "-o",
            // "a.out",
            "${fileBasenameNoExtension}",
            "--debug"
          ],
          "group": {
            "kind": "build",
            "isDefault": true
          }
        }
      ]
    }
    ```

    

    

- 11