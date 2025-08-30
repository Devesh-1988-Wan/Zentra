'use client';
export default function RichText({ config }: any){
  return <div className="prose" dangerouslySetInnerHTML={{ __html: config?.html ?? '' }} />;
}
