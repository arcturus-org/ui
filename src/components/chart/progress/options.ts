export default interface Options {
  textStyle?: {
    color?: string;
    fontSize?: number | string;
    fontFamily?: string;
    textAlign?: string;
  };
  data: {
    value: number;
    max?: number;
    min?: number;
    itemStyle: {
      activeColor?: string;
      gradientColor?: string;
      backgroundColor: string;
      width: number;
    };
    sub?: {
      color?: string;
      value: string;
    };
  };
}
