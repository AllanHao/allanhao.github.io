---
layout: post
title: Homebrew查看并修改源配置
categories: [Homebrew,运维]
description: Homebrew查看并修改源配置
keywords: Homebrew , 运维
excerpt: 本篇文章主要介绍如何查看并修改HomeBrew的源url配置
---

本篇文章主要介绍如何查看并修改HomeBrew的源url配置

## Homebrew配置所在目录

Homebrew的配置分成三个目录，分别是
1、brew（`brew --repo`）
2、homebrew/core（`brew --repo homebrew/core`）
3、homebrew/cask（`brew --repo homebrew/cask`）

## Homebrew查看源配置

在目录中可以通过git remote get-url origin来查看当前的源的URL。

```shell
git -C "$(brew --repo)" remote get-url origin
git -C "$(brew --repo homebrew/core)" remote get-url origin 
git -C "$(brew --repo homebrew/cask)" remote get-url origin 
```
## Homebrew修改源配置

可以通过以下三个命令设置为默认值，最后需要更新

```shell
git -C "$(brew --repo)" remote set-url origin 'https://github.com/Homebrew/brew.git'
git -C "$(brew --repo homebrew/core)" remote set-url origin 'https://github.com/Homebrew/homebrew-core.git'
git -C "$(brew --repo homebrew/cask)" remote set-url origin 'https://github.com/Homebrew/homebrew-cask.git'

brew update
```