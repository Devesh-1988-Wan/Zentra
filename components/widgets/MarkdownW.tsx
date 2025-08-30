'use client';
import ReactMarkdown from 'react-markdown';
const md = `**Notes**

- Add insights and context here.
- Supports basic Markdown.`;
export default function MarkdownW(){ return <ReactMarkdown>{md}</ReactMarkdown>; }
