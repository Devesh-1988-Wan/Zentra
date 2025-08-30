import Link from 'next/link';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function Card({ title, description, link, linkText }: CardProps) {
  return (
    <div className="card p-4">
      <h2 className="font-medium">{title}</h2>
      <p>{description}</p>
      <Link className="text-primary-500 underline" href={link}>
        {linkText}
      </Link>
    </div>
  );
}

export default function Page() {
  const cards: CardProps[] = [
    {
      title: 'Start',
      description: 'Create a new dashboard or open the demo.',
      link: '/dashboard/demo',
      linkText: 'Open Demo',
    },
    {
      title: 'Visual Gallery',
      description: 'Preview supported charts and widgets.',
      link: '/gallery',
      linkText: 'Open Gallery',
    },
    {
      title: 'Admin',
      description: 'Manage theme, icons, and data sources.',
      link: '/admin',
      linkText: 'Admin',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Zentra Advanced Dashboard</h1>
      <p className="text-slate-600">
        A BI-style dashboard builder with rich widgets inspired by Power BI, Tableau, and Qlik.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}