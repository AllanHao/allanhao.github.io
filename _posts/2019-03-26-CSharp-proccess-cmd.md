---
layout: post
title: C#线程调用控制台程序并获取输出
categories: [C#]
description: C#线程调用控制台程序并获取输出
keywords: C#, 控制台
---

下面简单记录一下C#利用Process调用控制台程序的方法，后续有更复杂的应用场景再更新。

```C#
   string cmdPath = @"E:\Git\GitHub\GeoMapper\TransformConsole\bin\Debug\TransformConsole.exe";
   Process process = new System.Diagnostics.Process();
   //启动控制台程序，并传入参数
   ProcessStartInfo startInfo = new ProcessStartInfo(cmdPath, string.Format("{0} {1} {2} {3} {4}", parameter.FileName, parameter.Host, parameter.Database, parameter.UserName, parameter.Passwd));
   // ProcessStartInfo startInfo = new ProcessStartInfo(cmdPath, string.Format("{0}", parameter.FileName));
   startInfo.UseShellExecute = false;
   startInfo.RedirectStandardInput = true;
   startInfo.RedirectStandardOutput = true;
   process.StartInfo = startInfo;
   process.Start();

   //   process.StandardInput.WriteLine(cmd);
   process.StandardInput.WriteLine("exit");
   string layersStr = process.StandardOutput.ReadToEnd();
   process.WaitForExit();
   process.Close();
```
