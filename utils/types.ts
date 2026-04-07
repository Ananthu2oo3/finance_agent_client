export interface CardData {
  type: 'card';
  props: {
    heading: string;
    subheading?: string;
    value: string | number;
    color?: string;
    textColor?: string;
  };
}

export interface PieChartData {
  type: 'piechart';
  props: {
    data: Array<{ label: string; value: number; color: string }>;
    title?: string;
  };
}

export interface BarChartData {
  type: 'barchart';
  props: {
    data: Array<{ label: string; value: number; color: string }>;
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
  };
}

export interface LineGraphData {
  type: 'linegraph';
  props: {
    data: Array<{ label: string; value: number }>;
    title?: string;
    lineColor?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
  };
}

export interface TableData {
  type: 'table';
  props: {
    headers: string[];
    rows: Array<Array<string | number>>;
    title?: string;
    headerColor?: string;
  };
}

export type ComponentData = CardData | PieChartData | BarChartData | LineGraphData | TableData;

export interface ApiResponse {
  components: ComponentData[];
  responseText?: string;
}
