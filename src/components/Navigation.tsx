import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Bot, 
  MessageSquare, 
  Key, 
  Settings, 
  Brain,
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: LayoutDashboard,
      description: "Overview & Analytics"
    },
    { 
      path: "/agents", 
      label: "Create Agent", 
      icon: Bot,
      description: "Build AI Agents"
    },
    { 
      path: "/chat", 
      label: "Multi-Chat", 
      icon: MessageSquare,
      description: "Agent Orchestration"
    },
    { 
      path: "/api-keys", 
      label: "API Keys", 
      icon: Key,
      description: "Manage Credentials"
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 glass border-b border-border/20 px-6 py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 hover-float">
            <div className="w-12 h-12 rounded-full gradient-elite flex items-center justify-center shadow-elite">
              <Brain className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="font-orbitron font-black text-2xl text-elite">
                AGENTFLOW
              </h1>
              <p className="text-xs text-muted-foreground font-inter uppercase tracking-wider">Elite AI Platform</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "elite" : "gradient-outline"}
                    className="gap-3 transition-bounce hover-lift font-orbitron text-sm"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label.toUpperCase()}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Profile/Settings */}
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 font-orbitron font-bold px-3 py-1">
              3 ACTIVE
            </Badge>
            <Button variant="elite" size="icon" className="hover-float">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary-glow bg-clip-text text-transparent">
              AgentFlow
            </span>
          </Link>

          <Button
            variant="glass"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass border-b border-border/20 animate-slide-in-right">
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? "gradient" : "glass"}
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="w-4 h-4" />
                      <div className="text-left">
                        <div>{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
};

export default Navigation;