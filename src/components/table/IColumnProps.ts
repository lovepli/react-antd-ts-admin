export interface IColumnProps {
  dataIndex: string;
  title?: string;
  width?: string | number;
  ellipsis?: boolean;
  render?: (value: any, record: object, index: number) => React.ReactNode;
  align?: "left" | "right" | "center";
}
