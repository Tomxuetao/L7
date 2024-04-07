import { Cascader } from 'antd';
import 'antd/dist/reset.css';
import GUI from 'lil-gui';
import React, { useEffect, useState } from 'react';
import { DEFAULT_RENDER_OPTIONS, MAP_TYPES } from './constants';
import DemoList from './demos';
import { MapView } from './view/map';

export default () => {
  const searchParams = new URL(location as any).searchParams;
  const initState =
    searchParams.size === 0
      ? ['Point', 'fill']
      : [searchParams.get('type'), searchParams.get('name')];
  const [values, setValue] = useState(initState);
  const [mapOption, setMapOption] = useState(DEFAULT_RENDER_OPTIONS);
  const onGUIChange = (object: any) => {
    setMapOption({ ...object });
  };
  useEffect(() => {
    const gui = new GUI();
    const option = {
      map: 'Map',
      renderer: 'device',
      animate: false,
    };
    gui.add(option, 'map', MAP_TYPES);
    gui.add(option, 'renderer', ['regl', 'device']);
    gui.add(option, 'animate');
    gui.onChange((event) => {
      onGUIChange(event.object);
    });
  }, []);

  const CascaderOption = DemoList.map((group) => {
    return {
      label: group.name,
      value: group.name,
      children: Object.keys(group.demos).map((key) => {
        return {
          label: key,
          value: key,
          demo: group.demos[key],
        };
      }),
    };
  });

  const onChange = (e: any) => {
    history.pushState({ value: e }, '', `?type=${e[0]}&name=${e[1]}`);
    setValue(e);
  };
  return (
    <>
      <div style={{ position: 'absolute', left: '20px', zIndex: 10, top: '20px' }}>
        <Cascader
          size="large"
          defaultValue={initState as string[]}
          options={CascaderOption}
          onChange={onChange}
        />
      </div>

      {/* 不同 Demo 可替换 view 模板 */}
      <MapView data={values} options={mapOption} />
    </>
  );
};
