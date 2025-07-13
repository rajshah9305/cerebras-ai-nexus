import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Brain, Zap, Activity, Plus, Settings, Play } from "lucide-react";
import heroIcon from "@/assets/ai-hero-icon.png";

interface Agent {
  id: string;
  name: string;
  status: "active" | "idle" | "error";
  model: string;
  usage: number;
  lastActive: string;
}

const Dashboard = () => {
  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "Content Creator",
      status: "active",
      model: "llama3.1-8b",
      usage: 85,
      lastActive: "2 minutes ago"
    },
    {
      id: "2", 
      name: "Data Analyst",
      status: "idle",
      model: "llama3.1-70b",
      usage: 45,
      lastActive: "1 hour ago"
    },
    {
      id: "3",
      name: "Code Assistant",
      status: "active",
      model: "llama3.1-8b",
      usage: 92,
      lastActive: "30 seconds ago"
    }
  ]);

  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === "active").length;
  const avgUsage = Math.round(agents.reduce((acc, a) => acc + a.usage, 0) / totalAgents);

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="relative inline-block">
          <img 
            src={heroIcon} 
            alt="AI Orchestration" 
            className="w-24 h-14 mx-auto animate-float"
          />
          <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-primary to-secondary-glow animate-pulse-glow"></div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary-glow bg-clip-text text-transparent">
          AI Agent Orchestration
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Orchestrate multiple AI agents with Cerebras inference models for powerful automation workflows
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="gradient" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create Agent
          </Button>
          <Button variant="glass" size="lg" className="gap-2">
            <Play className="w-5 h-5" />
            Quick Start
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="glass p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Agents</p>
              <p className="text-3xl font-bold text-foreground">{totalAgents}</p>
            </div>
            <Bot className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="glass p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold text-success">{activeAgents}</p>
            </div>
            <Activity className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="glass p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Usage</p>
              <p className="text-3xl font-bold text-primary">{avgUsage}%</p>
            </div>
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="glass p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Performance</p>
              <p className="text-3xl font-bold text-warning">Fast</p>
            </div>
            <Zap className="w-8 h-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Active Agents */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Agents</h2>
          <Button variant="glow" className="gap-2">
            <Settings className="w-4 h-4" />
            Manage All
          </Button>
        </div>

        <div className="grid gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="glass p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                      agent.status === "active" ? "bg-success" :
                      agent.status === "idle" ? "bg-warning" : "bg-destructive"
                    }`}></div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="text-primary border-primary/30">
                        {agent.model}
                      </Badge>
                      <span>•</span>
                      <span>Last active {agent.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Usage:</span>
                    <span className="font-semibold">{agent.usage}%</span>
                  </div>
                  <Progress value={agent.usage} className="w-24 h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;