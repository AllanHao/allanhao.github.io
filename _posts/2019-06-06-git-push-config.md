---
layout: post
title: 关于git push命令中的matching和simple
categories: [运维]
description: 关于git push命令中的matching和simple
keywords: git
---

最近使用git时，发现执行push命令时，出现了下面的提示：

```bash
warning: push.default is unset; its implicit value has changed in
Git 2.0 from 'matching' to 'simple'. To squelch this message
and maintain the traditional behavior, use:

  git config --global push.default matching

To squelch this message and adopt the new behavior now, use:

  git config --global push.default simple

When push.default is set to 'matching', git will push local branches
to the remote branches that already exist with the same name.

Since Git 2.0, Git defaults to the more conservative 'simple'
behavior, which only pushes the current branch to the corresponding
remote branch that 'git pull' uses to update the current branch.

See 'git help config' and search for 'push.default' for further information.
(the 'simple' mode was introduced in Git 1.7.11. Use the similar mode
'current' instead of 'simple' if you sometimes use older versions of Git)
```

push命令在2.0之后有了两种模式：

**matching（匹配所有分支）**

`matching` 参数是 Git 1.x 的默认参数，也就是老的执行方式。其意是如果你执行 git push 但没有指定分支，它将 push 所有你本地的分支到远程仓库中对应匹配的分支。

**simple（匹配单个分支）**

`simple` 参数是 Git 2.x 默认参数，意思是执行 git push 没有指定分支时，只有当前分支会被 push 到远程仓库。

所以,如果我们想使用matching方式，可以在命令行输入：

```bash
git config --global push.default matching
```

如果我们想使用simple方式，可以在命令行输入：

```bash
git config --global push.default simple
```