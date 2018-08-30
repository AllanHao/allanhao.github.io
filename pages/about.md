---
layout: page
title: About
description: 开源GIS爱好者，致力探索开源GIS生态系统
keywords: AllanHao, 张浩
comments: true
menu: 关于
permalink: /about/
---

开源GIS爱好者，

.NET 开发人员

致力探索开源GIS生态系统

## 联系

{% for website in site.data.social %}
* {{ website.sitename }}：[@{{ website.name }}]({{ website.url }})
{% endfor %}

## Skill Keywords

{% for category in site.data.skills %}
### {{ category.name }}
<div class="btn-inline">
{% for keyword in category.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}
