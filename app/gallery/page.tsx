'use client';
import dynamic from 'next/dynamic';
const GalleryGrid = dynamic(()=>import('@/components/GalleryGrid'),{ssr:false});
export default function Gallery(){
  return <GalleryGrid/>;
}
