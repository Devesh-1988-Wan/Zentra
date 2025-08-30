'use client';
import { DashboardCanvas } from '@/components/runtime/DashboardCanvas';
import { demoLayout } from '@/components/runtime/demoLayout';

export default function Dashboard({ params }: { params: { id: string } }){
  const layout = demoLayout();
  return <DashboardCanvas layout={layout}/>;
}
