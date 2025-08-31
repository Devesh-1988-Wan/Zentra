
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect the app root to the dashboards route
  redirect('/dashboards');
}
