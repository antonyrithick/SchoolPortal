import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-foreground">
          Welcome, {user?.name}
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {user?.photo ? (
            <img 
              src={user.photo} 
              alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
