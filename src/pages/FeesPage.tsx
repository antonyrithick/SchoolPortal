import { useState } from 'react';
import { getFees } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, DollarSign } from 'lucide-react';

export default function FeesPage() {
  const [fees] = useState(getFees());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = fees.filter(fee =>
    fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'pending' || f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fee Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage student fees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
                <p className="text-3xl font-bold text-green-600 mt-2">${totalCollected}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">${totalPending}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by student name or receipt number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredFees.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Fee Records</h3>
              <p className="text-muted-foreground">Fee payment records will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Receipt No.</th>
                    <th className="text-left p-4 font-semibold">Student</th>
                    <th className="text-left p-4 font-semibold">Class</th>
                    <th className="text-left p-4 font-semibold">Amount</th>
                    <th className="text-left p-4 font-semibold">Payment Date</th>
                    <th className="text-left p-4 font-semibold">Mode</th>
                    <th className="text-left p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees.map((fee) => (
                    <tr key={fee.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="p-4 font-mono text-sm">{fee.receiptNumber}</td>
                      <td className="p-4 font-medium">{fee.studentName}</td>
                      <td className="p-4">{fee.class}</td>
                      <td className="p-4 font-semibold text-primary">${fee.amount}</td>
                      <td className="p-4">{new Date(fee.paymentDate).toLocaleDateString()}</td>
                      <td className="p-4 capitalize">{fee.paymentMode}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(fee.status)}`}>
                          {fee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
