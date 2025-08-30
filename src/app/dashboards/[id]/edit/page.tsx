'use client';

import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ReactECharts from 'echarts-for-react';
import { createClient } from '@/utils/supabase/client';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardEditor({ params }: { params: { id: string } }) {
  const [layout, setLayout] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data, error } = await supabase
          .from('dashboards')
          .select('*')
          .eq('id', params.id)
          .single();
        if (error) throw error;
        if (data) {
          setWidgets(data.widgets || []);
          setLayout(data.layout || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };
    fetchDashboard();
  }, [params.id]);

  const onLayoutChange = async (newLayout) => {
    try {
      const { error } = await supabase
        .from('dashboards')
        .update({ layout: newLayout })
        .eq('id', params.id);
      if (error) throw error;
      setLayout(newLayout);
    } catch (error) {
      console.error('Error updating layout:', error);
    }
  };

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {widgets.map((widget) => (
          <div key={widget.i} className="bg-white p-4 rounded-lg shadow">
            <ReactECharts option={widget.chartOptions} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}