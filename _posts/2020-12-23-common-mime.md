---
layout: post
title: 常见的MIME类型
categories: [运维]
description: 常见的MIME类型
keywords: 运维
excerpt: 本文主要介绍常见的MIME类型解析配置
---

```xml
<remove fileExtension=".czml"/>
<mimeMap fileExtension=".czml" mimeType="application/json"/>
<remove fileExtension=".glsl"/>
<mimeMap fileExtension=".glsl" mimeType="text/plain"/>
<remove fileExtension=".b3dm"/>
<mimeMap fileExtension=".b3dm" mimeType="application/octet-stream"/>
<remove fileExtension=".pnts"/>
<mimeMap fileExtension=".pnts" mimeType="application/octet-stream"/>
<remove fileExtension=".i3dm"/>
<mimeMap fileExtension=".i3dm" mimeType="application/octet-stream"/>
<remove fileExtension=".cmpt"/>
<mimeMap fileExtension=".cmpt" mimeType="application/octet-stream"/>
<remove fileExtension=".gltf"/>
<mimeMap fileExtension=".gltf" mimeType="model/gltf+json"/>
<remove fileExtension=".bgltf"/>
<mimeMap fileExtension=".bgltf" mimeType="model/gltf-binary"/>
<remove fileExtension=".glb"/>
<mimeMap fileExtension=".glb" mimeType="model/gltf-binary"/>
<remove fileExtension=".json"/>
<mimeMap fileExtension=".json" mimeType="application/json"/>
<remove fileExtension=".geojson"/>
<mimeMap fileExtension=".geojson" mimeType="application/json"/>
<remove fileExtension=".topojson"/>
<mimeMap fileExtension=".topojson" mimeType="application/json"/>
<remove fileExtension=".woff"/>
<mimeMap fileExtension=".woff" mimeType="application/font-woff"/>
<remove fileExtension=".woff2"/>
<mimeMap fileExtension=".woff2" mimeType="application/font-woff2"/>
<remove fileExtension=".kml"/>
<mimeMap fileExtension=".kml" mimeType="application/vnd.google-earth.kml+xml"/>
<remove fileExtension=".kmz"/>
<mimeMap fileExtension=".kmz" mimeType="application/vnd.google-earth.kmz"/>
<remove fileExtension=".svg"/>
<mimeMap fileExtension=".svg" mimeType="image/svg+xml"/>
<remove fileExtension=".terrain"/>
<mimeMap fileExtension=".terrain" mimeType="application/vnd.quantized-mesh"/>
<remove fileExtension=".ktx"/>
<mimeMap fileExtension=".ktx" mimeType="image/ktx"/>
<remove fileExtension=".crn"/>
<mimeMap fileExtension=".crn" mimeType="image/crn"/>
```