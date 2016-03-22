/*
 * http://github.com/sverres
 *
 * sverre.stikbakke 22.03.2016
 *
 */

//http://kartverket.no/Kart/Gratis-kartdata/WMS-tjenester/
//http://status.kartverket.no/tjenester/openwms.py?
//http://openwms.statkart.no/skwms1/wms.topo2?request=GetCapabilities&Service=WMS

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent = [596417, 6731415, 597617, 6732615];

var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extent
});

var topo2 = new ol.layer.Tile({
  extent: extent,
  source: new ol.source.TileWMS({
    attributions: [attribution],
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'topo2_WMS',
      'STYLES': 'default'
    },
  })
});

var map = new ol.Map({
  layers: [topo2],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: [597017, 6732015],
    minResolution: 0.1,
    maxResolution: 5.0,
    resolution: 1.0,
  })
});
