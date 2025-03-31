import { Suspense } from 'react';
import StatsCards from './components/stats-cards';
import QuickActions from './components/quick-actions';
import RecentTickets from './components/recent-tickets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPage = async () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsCards />
      </Suspense>

      <Suspense fallback={<div>Loading quick actions...</div>}>
        <QuickActions />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div>Loading recent tickets...</div>}>
          <RecentTickets />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              More dashboard features coming soon, including:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Ticket payment trends</li>
              <li>• Vehicle usage analytics</li>
              <li>• Payment reminders</li>
              <li>• Custom notifications</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
