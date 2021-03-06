import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import * as React from 'react';
// @ts-ignore
import data from '../data/data.json';
export default class Point3D extends React.Component {
  // @ts-ignore
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json',
    );
    const pointsData = await response.json();

    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        center: [120.19382669582967, 30.258134],
        pitch: 0,
        style: 'dark',
        zoom: 3,
      }),
    });
    // scene.on('loaded', () => {
    const pointLayer = new PointLayer({})
      .source(pointsData, {
        cluster: true,
      })
      .shape('circle')
      .scale('point_count', {
        type: 'quantile',
      })
      .size('point_count', [5, 10, 15, 20, 25])
      .animate(false)
      .color('yellow')
      .style({
        opacity: 0.5,
        strokeWidth: 1,
      });
    scene.addLayer(pointLayer);
    pointLayer.on('mousemove', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });
    pointLayer.on('mousedown', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });
    pointLayer.on('mouseup', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });
    pointLayer.on('click', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });

    pointLayer.on('contextmenu', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });
    pointLayer.on('unpick', (e) => {
      const id = e.featureId;
      console.log(e.type);
      pointLayer.setActive(id);
    });

    this.scene = scene;
    // });
  }

  public render() {
    return (
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
    );
  }
}
