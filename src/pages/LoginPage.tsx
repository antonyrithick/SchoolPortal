import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Attempting login with:', email);

    setTimeout(() => {
      const user = login(email, password);
      
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        navigate(`/${user.role}`);
      } else {
        toast.error('Invalid email or password');
      }
      
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">School Management System</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg space-y-2 text-sm">
            <p className="font-semibold text-center mb-3">Demo Credentials</p>
            <div className="space-y-2">
              <div>
                <p className="font-medium">Admin:</p>
                <p className="text-muted-foreground">admin@school.com / admin123</p>
              </div>
              <div>
                <p className="font-medium">Teacher:</p>
                <p className="text-muted-foreground">teacher@school.com / teacher123</p>
              </div>
              <div>
                <p className="font-medium">Parent:</p>
                <p className="text-muted-foreground">parent@school.com / parent123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
