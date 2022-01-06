### thetaOffset 弧度参数

thetaOffset 参数 表示 arc 弧线的弧度，默认值是 0.314

```javascript
const layer = new LineLayer({})
  .source(data, {
    parser: {
      type: 'csv',
      x: 'lng1',
      y: 'lat1',
      x1: 'lng2',
      y1: 'lat2',
    },
  })
  .size(1)
  .shape('arc')
  .color('#8C1EB2')
  .style({
    thetaOffset: 0.35,
  });
```
<img width="450px" style="display: block;margin: 0 auto;" alt="案例" src='https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*i6d6SqQgjAwAAAAAAAAAAAAAARQnAQ'>

[在线案例1](../../../examples/gallery/animate#route_line)