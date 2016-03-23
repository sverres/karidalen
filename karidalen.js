/*
 * http://github.com/sverres
 *
 * sverre.stikbakke 22.03.2016
 *
 */

/*
http://kartverket.no/Kart/Gratis-kartdata/WMS-tjenester/
http://status.kartverket.no/tjenester/openwms.py?
http://openwms.statkart.no/skwms1/wms.topo2?request=GetCapabilities&Service=WMS

http://wms.geonorge.no/kr/koordsys_res.txt
*/

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent1200m = [596417, 6731415, 597617, 6732615];
var extent150km = [522017, 6657015, 672017, 6807015];
var extentKartverket = [-2000000, 3500000, 3545984, 9045984];

var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extent150km
});

var resolutions = [
  42.3125,
  21.15625,
  10.578125,
  5.2890625,
  2.64453125,
  1.322265625,
  0.6611328125,
  0.33056640625,
  0.165283203125
];

var matrixSet = 'EPSG:25832'; // EUREF89, UTM zone 32

var matrixIds = [
  'EPSG:25832:9',
  'EPSG:25832:10',
  'EPSG:25832:11',
  'EPSG:25832:12',
  'EPSG:25832:13',
  'EPSG:25832:14',
  'EPSG:25832:15',
  'EPSG:25832:16',
  'EPSG:25832:17'
];

var grunnkart = new ol.layer.Tile({
  minResolution: resolutions[5],
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
    layer: 'norges_grunnkart',
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extentKartverket,
      resolutions: resolutions,
      matrixIds: matrixIds,
    }),
    style: 'default',
  })
});

var topo2 = new ol.layer.Tile({
  maxResolution: resolutions[5],
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
    layer: 'topo2',
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extentKartverket,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var bakgrunn = new ol.layer.Tile({
  extent: extent150km,
  source: new ol.source.TileWMS({
    attributions: [attribution],
    url: 'http://openwms.statkart.no/skwms1/wms.topo2.graatone?',
    params: {
      'LAYERS': 'topo2_graatone_WMS',
      'STYLES': 'default'
    },
  })
});

var veger = new ol.layer.Tile({
  extent: extent150km,
  source: new ol.source.TileWMS({
    attributions: [attribution],
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'N250Bilveg',
      'STYLES': 'default'
    },
  })
});

var koter = new ol.layer.Tile({
  extent: extent1200m,
  source: new ol.source.TileWMS({
    attributions: [attribution],
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'fkb_hoydekurver_1m',
      'STYLES': 'default'
    },
  })
});

var map = new ol.Map({
  layers: [grunnkart,topo2],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: [597017, 6732015],
    resolutions: resolutions,
    zoom: 6
  })
});
