---
layout: post
title: VS Code运行html文件
categories: [软件工具]
description: 
keywords: VSCode
---

用VS Code编写html文件，想在VS Code中直接打开运行，配置如下：

### 配置tasks.json ###

1. 打开VS Code，点击“终端”，选择“配置任务”。
   ![](https://allanhao.com/images/vscode-run-html/1.jpg)

2. 选择“使用模板创建tasks.json文件”。
   ![](https://allanhao.com/images/vscode-run-html/2.jpg)

3. 选择“Others”。
   ![](https://allanhao.com/images/vscode-run-html/3.jpg)

4. tasks.json新建完成，默认如下图：
   ![](https://allanhao.com/images/vscode-run-html/4.jpg)

5. 修改tasks.json

```javascript
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "在Chrome中运行",
            "type": "process",  // [shell,process]
            "command": "Chrome",
            "args": ["${file}"],
            "windows": {
                "command": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
            },
            "group": "build",
            "presentation": {
                // Reveal the output only if unrecognized errors occur.
                "reveal": "never"  //[always,never,silent]
            },
            // Use the standard MS compiler pattern to detect errors, warnings and infos
            "problemMatcher": "$msCompile"
        }
    ]
}
```

### 运行任务 ###

选中需要运行的html文件，按住Ctrl+Shift+B，选择“在Chome中运行”，即可。
![](https://allanhao.com/images/vscode-run-html/5.jpg)