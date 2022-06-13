/**
 * 画布基类
 */

export default class Canvas {
  protected canvas;
  protected ctx;
  protected width;
  protected height;

  constructor(chart: any) {
    this.canvas = chart.node;
    this.ctx = this.canvas.getContext('2d');
    this.width = chart.width;
    this.height = chart.height;

    const dpr = wx.getSystemInfoSync().pixelRatio;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }
}
