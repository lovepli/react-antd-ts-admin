export interface IColumnDefine {
  sorter?: (row1: object, row2: object) => number;
  canAutoOrder: boolean;
  dataIndex: string;
  key: string;
  render?: (text: any, row: object, index: number) => React.ReactNode;
  title: string;
  width?: number;
  /** 前缀 */
  prefixText?: string;
  /** 后缀 */
  suffixText?: string;
  style?: React.CSSProperties;
}
