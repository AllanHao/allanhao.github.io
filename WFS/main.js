var urlWMTS = 'http://120.52.31.31:590/service/api/egis/base/v1/wmts'; //wmts服务地址
var urlService = 'http://120.52.31.31:590/service/api/egis/base/v1'; //服务地址
var client_id = '28524d8c65844630a3427270c9a16323'; //用户id
var client_secret = '84bc17650bb04491aa8475b9cbe3d1c4'; //用户密码
var tokenUrl = 'http://120.52.31.31:590/oauth/token'; //授权服务地址
var authType = 'Token'; //授权类型
// 创建地图
var egismap = new egis.carto.Map({
    "defaultExtent": {
        "center": [
            116.3466,
            39.87040
        ],
        "maxZoom": 18,
        "minZoom": 2,
        "level": 10,
        "extent": [-180, -90, 180, 90],
        "projection": "EPSG:4490"
    },
    fullExtent: {
        level: 14,
        center: [
            116.3466,
            39.87040
        ]
    }
});

// 初始化地图，传入要初始化的DOM对象的id
egismap.init({
    targetId: 'egismap'
});
var resthttp = new egis.core.RestHttp({
    client_id: client_id,
    client_secret: client_secret
});

// 创建 天地图矢量 瓦片图层
var tiandituvec = new egis.carto.TileLayer({
    "restHttp": resthttp,
    "name": "天地图矢量",
    "layers": "kd",
    "//": "图层名称",
    "matrix": 21,
    "//": "切图级别小于等于切图级别",
    "matrixSet": "c",
    "//": "切图策略",
    "matrixPrefix": "",
    "//": "切图策略加冒号：",
    "format": "tiles",
    "//": "图层格式",
    "projection": "EPSG:4490",
    "//": "投影参考",
    "layerType": 1,
    "//": "图层类型",
    "tileType": 102,
    "//": "瓦片类型",
    "opacity": 1.0,
    "//": "透明度",
    "visible": true,
    "//": "是否显示",
    "crossOrigin": "anonymous",
    "style": "default",
    "extent": {
        minx: -180,
        miny: -90,
        maxx: 180,
        maxy: 90
    },
    "url": urlWMTS
});

// 创建 天地图中文标注 瓦片图层
var tianditucta = new egis.carto.TileLayer({
    "restHttp": resthttp,
    "name": "天地图中文标注",
    "layers": "cia", // 图层名称
    "matrixSet": "c", // 切图策略
    "format": "tiles", // 图层格式
    "projection": "EPSG:4490",
    "extent": {
        minx: -180,
        miny: -90,
        maxx: 180,
        maxy: 90
    },
    "matrixPrefix": "",
    "matrix": 21,
    "tileType": 102, // 瓦片类型
    "opacity": 1.0,
    "visible": true,
    "url": urlWMTS // 图层服务 url
});
//添加天地图矢量图层
egismap.addLayer(tiandituvec);
//添加天地图中文标注图层
egismap.addLayer(tianditucta);


//创建要素图层
var featureLayer = new egis.carto.FeatureLayer({
    id: 'featureLayer',
    name: "要素图层",
    visible: true,
    opacity: 1
});
egismap.addLayer(featureLayer); //将要素图层添加到地图
//创建符号
// var symbol = new egis.sfs.SimpleLineSymbol({
//     color: new egis.sfs.Color({r: 255, g: 0, b: 0}),
//     style:5
//     // size: 4
// })
var simplePolygonSymbol = new egis.sfs.SimpleFillSymbol({
    fillColor: new egis.sfs.Color({
        r: 100,
        g: 149,
        b: 237,
        a: 100
    }),
    borderColor: new egis.sfs.Color({
        r: 0,
        g: 0,
        b: 0,
        a: 0
    })
});

//创建简单样式渲染对象，
var render = new egis.render.SimpleRenderer({
    symbol: simplePolygonSymbol
});
featureLayer.render(render); //使用指定的渲染样式和符号渲染要素

var WFSService = new egis.ews.RestWFSService({
    url: urlService, //服务
    clientId: client_id,
    clientSecret: client_secret,
    authType: authType,
    tokenUrl: tokenUrl
});
// 创建空间过滤查询几何对象

//界面调用
//添加矢量要素数据
window.addWFS = function () {
    if (document.getElementById('input').value == "") {
        alert("请输入查询日期！")
        return;
    }
    document.getElementById("over").style.display = "block";
    document.getElementById("layout").style.display = "block";
    featureLayer.clear()
    var filterOutput = new egis.ews.FilterOutput();
    // featureLayer.render(render);
    var polygon = new egis.sfs.Polygon({
        spatialReference: 4490
    });

    var LinearRing = new egis.sfs.LinearRing({
        spatialReference: 4490
    });
    LinearRing.addPoint(new egis.sfs.Point({
        x: 118.56464,
        y: 31.38241,
        spatialReference: 4490
    }));
    LinearRing.addPoint(new egis.sfs.Point({
        x: 118.56868,
        y: 31.3878,
        spatialReference: 4490
    }));
    LinearRing.addPoint(new egis.sfs.Point({
        x: 118.56625,
        y: 31.39131,
        spatialReference: 4490
    }));
    LinearRing.addPoint(new egis.sfs.Point({
        x: 118.56625,
        y: 31.39104,
        spatialReference: 4490
    }));
    LinearRing.addPoint(new egis.sfs.Point({
        x: 118.56464,
        y: 31.38241,
        spatialReference: 4490
    }));



    polygon.addGeometry(LinearRing);
    //创建Within空间过滤条件
    // var filterWithin = filterOutput.within("shape", polygon, 'EPSG:4490');
    // // 创建IsLike属性过滤条件
    let like = document.getElementById('input').value
    var filterLike = filterOutput.like('vers', like); //模糊查询
    var filterEqualTo = filterOutput.equalTo('watertype',4);
    let and1 = filterOutput.and(filterLike, filterEqualTo); //模糊查询

    // 创建要素查询对象，根据count属性控制要素查询返回结果
    var wfsInput = new egis.ews.FeatureInput({
        typenames: 'water_identification_sum_a', //查询要素的类型或类别（图层名称），多个名称以逗号分隔
        // count: 1000,
        filter: filterLike
        // startIndex:780
    });

    var result = WFSService.getFeature(wfsInput); //获取要素信息
    result.then(function (data) {
        document.getElementById("over").style.display = "none";
        document.getElementById("layout").style.display = "none";
        console.log(data);
        featureLayer.addFeatureCollection(data); //向图层上添加要素对象集合
        egismap.pan(featureLayer.getExtent());
    })
}