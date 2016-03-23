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
*/

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent1200m = [596417, 6731415, 597617, 6732615];
var extent150km = [522017, 6657015, 672017, 6807015];


var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extent150km
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
  //minResolution: 0.1,
  //maxResolution: 0.5,
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
  layers: [bakgrunn, veger, koter],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: [597017, 6732015],
    minResolution: 0.1,
    maxResolution: 500.0,
    resolution: 1.0,
  })
});
