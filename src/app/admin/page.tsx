import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { getRegistrations } from '@/app/actions';

export default async function AdminPage() {
  const { registrations, error } = await getRegistrations();

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="container mx-auto flex w-full flex-col items-center justify-center space-y-8 p-4 md:p-8">
        <div className="w-full max-w-6xl">
           <Button asChild variant="outline" className="mb-8">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          <Card>
            <CardHeader>
              <CardTitle>Conference Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {error && <p className="text-destructive">{error}</p>}
              <Table>
                <TableCaption>A list of recent conference registrations.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Affiliation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations?.map((reg, index) => (
                    <TableRow key={index}>
                      <TableCell>{reg.firstName} {reg.lastName}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.affiliation}</TableCell>
                      <TableCell>{reg.status}</TableCell>
                      <TableCell>{format(new Date(reg.registrationDate), 'PPP')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               {registrations?.length === 0 && !error && (
                <p className="text-center text-muted-foreground py-8">No registrations yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
