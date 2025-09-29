import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bot, Settings, LogOut, User, MessageCircle, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatModal } from "@/components/ChatModal";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 px-6 shadow-soft">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                AgentFlow
              </h1>
              <p className="text-sm text-muted-foreground">Enterprise Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsChatOpen(true)}
            className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 relative group"
          >
            <MessageCircle className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse group-hover:scale-110 transition-transform" />
            <span className="sr-only">Open chat</span>
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all duration-200">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-gradient-primary text-white text-sm">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 shadow-large border-border/50">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.signInDetails?.loginId || 'user@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted/50 transition-colors">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                <Lock className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <ChangePasswordForm 
            onSuccess={() => setIsChangePasswordOpen(false)}
            onCancel={() => setIsChangePasswordOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}