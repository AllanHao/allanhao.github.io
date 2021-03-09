---
layout: post
title: MySQL脚本备忘
categories: [SQL]
description: MySQL脚本备忘
keywords: SQL
excerpt:  MySQL脚本备忘
---

## MYSQL 根据表注解或字段注解查询表名

* 根据表注解查询表名
```SQL
SELECT
	table_name 表名,
	TABLE_COMMENT 表注释
FROM
	INFORMATION_SCHEMA. TABLES
WHERE
	table_schema = '数据库名'
AND TABLE_COMMENT LIKE '%注解%';
```

* 根据字段注解查询表名
```SQL
SELECT
	table_name 表名,
	COLUMN_NAME 字段名,
	COLUMN_COMMENT 字段注释
FROM
	INFORMATION_SCHEMA. COLUMNS
WHERE
	table_schema = '数据库名'
AND COLUMN_COMMENT LIKE '%注解%';
```
**关键点：从 `INFORMATION_SCHEMA.COLUMNS` 系统表查询信息**

* 连表查询
```SQL
SELECT
	c.table_name 表名,
  TABLE_COMMENT 表注释,
	COLUMN_NAME 字段名,
	COLUMN_COMMENT 字段注释
FROM
	INFORMATION_SCHEMA. COLUMNS c JOIN INFORMATION_SCHEMA. TABLES t ON c.TABLE_NAME = t.TABLE_NAME AND c.TABLE_SCHEMA = t.TABLE_SCHEMA
WHERE
	c.table_schema = '数据库名'
AND COLUMN_COMMENT LIKE '%注解%';
```