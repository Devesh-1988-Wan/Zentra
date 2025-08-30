'use client';
export default function Table(){
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-600">
          <th className="py-2">Name</th>
          <th className="py-2">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="py-2">Alpha</td>
          <td className="py-2">123</td>
        </tr>
        <tr className="border-t">
          <td className="py-2">Beta</td>
          <td className="py-2">456</td>
        </tr>
      </tbody>
    </table>
  );
}
