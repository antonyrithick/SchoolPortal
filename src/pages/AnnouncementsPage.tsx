import { useState, FormEvent } from 'react';
import { getAnnouncements, saveAnnouncements } from '@/lib/mockData';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Bell, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AnnouncementsPage() {
  const user = getCurrentUser();
  const [announcements, setAnnouncements] = useState(getAnnouncements());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: 'all' as 'all' | 'parents' | 'teachers' | 'specific',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newAnnouncement = {
      id: Date.now().toString(),
      ...formData,
      createdBy: user?.name || 'Unknown',
      createdAt: new Date().toISOString()
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    saveAnnouncements(updated);
    
    toast.success('Announcement created successfully');
    setIsFormVisible(false);
    setFormData({
      title: '',
      message: '',
      targetAudience: 'all',
      priority: 'medium'
    });
  };

  const handleDelete = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    saveAnnouncements(updated);
    toast.success('Announcement deleted');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground mt-1">Broadcast important messages</p>
        </div>
        {user?.role === 'admin' || user?.role === 'teacher' ? (
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Announcement
          </Button>
        ) : null}
      </div>

      {isFormVisible && (
        <Card>
          <CardHeader>
            <CardTitle>New Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select 
                    value={formData.targetAudience} 
                    onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="parents">Parents Only</SelectItem>
                      <SelectItem value="teachers">Teachers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsFormVisible(false)}>
                  Cancel
                </Button>
                <Button type="submit">Publish</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bell className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">{announcement.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{announcement.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>By {announcement.createdBy}</span>
                    <span>•</span>
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="capitalize">Target: {announcement.targetAudience}</span>
                  </div>
                </div>
                {(user?.role === 'admin' || user?.role === 'teacher') && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
