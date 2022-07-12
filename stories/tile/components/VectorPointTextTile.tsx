import * as React from 'react';
import * as turf from '@turf/turf';
import {
  RasterLayer,
  Scene,
  LineLayer,
  ILayer,
  PointLayer,
  PolygonLayer,
} from '@antv/l7';
import { GaodeMap, GaodeMapV2, Map, Mapbox } from '@antv/l7-maps';

export default class RasterTile extends React.Component {
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    this.scene = new Scene({
      id: 'map',
      stencil: true,
      // map: new GaodeMap({
      // map: new GaodeMapV2({
      map: new Mapbox({
        // map: new Map({
        // center: [121.268, 30.3628],
        // center: [122.77, 43.333172],
        // style: 'normal',
        // center: [120, 30],
        // style: 'normal',
        // zoom: 6,
        // // zoom: 5,
        // // zoom: 19,
        // zooms: [0, 22],
        // maxZoom: 22,
        center: [120, 30],
        style: 'blank',
        zoom: 2,
        // zoom: 13,
        // center: [-122.447303, 37.753574],
      }),
    });

    this.scene.on('loaded', () => {
      // this.scene.on('zoom', () => console.log(this.scene.getZoom()));
      const layer = new PointLayer({
        featureId: 'COLOR',
        sourceLayer: 'ecoregions2',
      });
      layer
        .source(
          // 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          // 'http://localhost:3000/file3.mbtiles/{z}/{x}/{y}.pbf',
          'http://ganos.oss-cn-hangzhou.aliyuncs.com/m2/rs_l7/{z}/{x}/{y}.pbf',
          // 'http://localhost:3000/woods.mbtiles/{z}/{x}/{y}.pbf',
          // 'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoiMTg5Njk5NDg2MTkiLCJhIjoiY2s5OXVzdHlzMDVneDNscDVjdzVmeXl0dyJ9.81SQ5qaJS0xExYLbDZAGpQ',
          // 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.vector.pbf?sku=101lazXpJZeM7&access_token=pk.eyJ1IjoiMTg5Njk5NDg2MTkiLCJhIjoiY2s5OXVzdHlzMDVneDNscDVjdzVmeXl0dyJ9.81SQ5qaJS0xExYLbDZAGpQ',
          {
            parser: {
              type: 'mvt',
              tileSize: 256,
              zoomOffset: 0,
              maxZoom: 20,
              extent: [-180, -85.051129, 179, 85.051129],

              // coord: 'offset'
            },
          },
        )
        .shape('NNH_NAME', 'text')
        // .color('#f00')
        // .color('v', v => '#ff0')
        .color('COLOR')
        .size(12)
        .style({
          stroke: '#00f',
          strokeWidth: 1,
          textAllowOverlap: false,
          // color: "#ff0"
          // opacity: 0.4,
        });
      // .select(true);
      // .active(true);

      this.scene.addLayer(layer);

      // setTimeout(() => {
      //   layer.shape('circle');

      //   layer.size(20);
      //   // layer.style({
      //   //   // opacity: 0.4
      //   //   strokeWidth: 2
      //   // })
      //   // layer.select(true)
      //   layer.color('#f00');
      //   //   // layer.color('v', v => '#ff0')
      //   this.scene.render();
      // }, 2000);
    });
  }

  public render() {
    return (
      <>
        <div
          id="map"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </>
    );
  }
}