'use client';
import { useState } from 'react';
import GridLayout from 'react-grid-layout/legacy';
import type { Layout, LayoutItem } from 'react-grid-layout';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import LineGraph from '@/components/charts/LineGraph';
import ChatPanel from '@/components/chat/ChatPanel';
import 'react-grid-layout/css/styles.css';

interface ComponentConfig {
  type: 'card' | 'piechart' | 'barchart' | 'linegraph' | 'table';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

interface DashboardLayoutProps {
  components: ComponentConfig[];
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function DashboardLayout({ components, messages, onSendMessage }: DashboardLayoutProps) {
  const getDefaultLayout = () => {
    const cards = components.filter(c => c.type === 'card');
    const charts = components.filter(c => c.type === 'piechart' || c.type === 'barchart' || c.type === 'linegraph');
    const tables = components.filter(c => c.type === 'table');
    
    const layout: LayoutItem[] = [];
    const TOTAL_COLS = 16; // From user config
    let currentX = 0;
    let currentY = 0;
    let currentRowMaxH = 0;

    const addItem = (config: ComponentConfig, index: number, prefix: string, defaultW: number, defaultH: number, defaultMinW: number, defaultMinH: number) => {
      const w = config.props.w || defaultW;
      const h = config.props.h || defaultH;
      let x = config.props.x;
      let y = config.props.y;
      
      if (x === undefined || y === undefined) {
        if (currentX + w > TOTAL_COLS) {
          currentX = 0;
          currentY += currentRowMaxH;
          currentRowMaxH = 0;
        }
        x = currentX;
        y = currentY;
        currentX += w;
        currentRowMaxH = Math.max(currentRowMaxH, h);
      }

      layout.push({
        i: `${prefix}-${index}`,
        x,
        y,
        w,
        h,
        minW: config.props.minW || defaultMinW,
        minH: config.props.minH || defaultMinH,
        maxW: config.props.maxW,
        maxH: config.props.maxH
      } as LayoutItem);
    };

    cards.forEach((c, i) => addItem(c, i, 'card', 4, 3, 2, 2));
    if (currentRowMaxH > 0) { currentY += currentRowMaxH; currentX = 0; currentRowMaxH = 0; }
    
    charts.forEach((c, i) => addItem(c, i, 'chart', 5, 5, 3, 3));
    if (currentRowMaxH > 0) { currentY += currentRowMaxH; currentX = 0; currentRowMaxH = 0; }
    
    tables.forEach((c, i) => addItem(c, i, 'table', 16, 6, 6, 4));

    return layout;
  };

  const [layout, setLayout] = useState<LayoutItem[]>(getDefaultLayout());

  const handleLayoutChange = (newLayout: Layout) => {
    setLayout(newLayout as LayoutItem[]);
  };

  const renderComponent = (config: ComponentConfig, key: string) => {
    switch (config.type) {
      case 'card':
        return <Card key={key} {...config.props} />;
      case 'piechart':
        return <PieChart key={key} {...config.props} />;
      case 'barchart':
        return <BarChart key={key} {...config.props} />;
      case 'linegraph':
        return <LineGraph key={key} {...config.props} />;
      case 'table':
        return <Table key={key} {...config.props} />;
      default:
        return null;
    }
  };

  const cards = components.filter(c => c.type === 'card');
  const charts = components.filter(c => c.type === 'piechart' || c.type === 'barchart' || c.type === 'linegraph');
  const tables = components.filter(c => c.type === 'table');

  return (
    <div className="flex h-screen">
      <div 
        className="flex-1 p-6 overflow-y-auto"
        style={{backgroundImage: 'url(/grid_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}
      >
        <GridLayout
          className="layout"
          layout={layout}
          cols={16}
          rowHeight={30}
          width={1200}
          margin={[10, 10] as const}
          containerPadding={[0, 0] as const}
          compactType={null}
          preventCollision={true}
          onLayoutChange={handleLayoutChange}
          isResizable={true}
          resizeHandles={['se', 's', 'e', 'sw', 'w', 'nw', 'n', 'ne']}
        >
          {cards.map((config, index) => (
            <div key={`card-${index}`} style={{ pointerEvents: 'none' }}>
              <div style={{ height: '100%', width: '100%', overflow: 'hidden', pointerEvents: 'auto' }}>
                {renderComponent(config, `card-${index}`)}
              </div>
            </div>
          ))}
          {charts.map((config, index) => (
            <div key={`chart-${index}`}>
              <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                {renderComponent(config, `chart-${index}`)}
              </div>
            </div>
          ))}
          {tables.map((config, index) => (
            <div key={`table-${index}`}>
              <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                {renderComponent(config, `table-${index}`)}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
      <div className="w-96 bg-white">
        <ChatPanel messages={messages} onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}
