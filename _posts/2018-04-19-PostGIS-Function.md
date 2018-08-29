---
layout:     post
title:      "PostGIS Function"
date:       2018-04-19
author:     "Allan" 
tags:
    - postgis
    - opengis
category: blog
---

```
SELECT row_to_json(fc)
FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
FROM (SELECT 'Feature' As type
, ST_AsGeoJSON(lg.geog)::json As geometry
, row_to_json((loc_id, loc_name)) As properties
FROM locations As lg ) As f ) As fc;
```

```
select name,
(ST_distance(geom::geography, ST_GeomFromText('POINT(116.389 39.918)', 4326)::geography)) 
as distance
from public.bj_subway
where 
ST_dwithin(geom::geography, ST_GeomFromText('POINT(116.389 39.918)', 4326)::geography, 2000)
order By distance asc
```

```
select ST_AsText(ST_Intersection(
c.geom,b.the_geom) ) as line,b.name as storeName ,c.macName
from (
    select ST_MakeLine(a.the_geom) as geom,'mac2' as macName 
    from public.nts_io_postgis_2d as a where a.name ='mac2'
    ) As c,public.nts_io_postgis_region b 
where ST_Intersects(c.geom,b.the_geom)  
```