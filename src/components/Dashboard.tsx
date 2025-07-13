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
      <div className="text-center space-y-8 py-16">
        <div className="relative inline-block">
          <img 
            src={heroIcon} 
            alt="AI Orchestration" 
            className="w-48 h-28 mx-auto hover-float filter drop-shadow-2xl"
          />
          <div className="absolute inset-0 blur-2xl opacity-50 gradient-elite animate-pulse-glow scale-150"></div>
          <div className="absolute inset-0 blur-3xl opacity-30 gradient-elite animate-pulse scale-125"></div>
        </div>
        <h1 className="text-7xl font-orbitron font-black text-elite leading-tight">
          AI AGENT
          <br />
          <span className="text-glow">ORCHESTRATION</span>
        </h1>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-inter font-light leading-relaxed">
          Elite AI agent orchestration platform powered by <span className="text-primary font-semibold">Cerebras inference models</span> for unparalleled automation workflows
        </p>
        <div className="flex justify-center gap-6 pt-4">
          <Button variant="elite" size="lg" className="gap-3 text-lg px-8 py-4">
            <Plus className="w-6 h-6" />
            CREATE AGENT
          </Button>
          <Button variant="gradient-outline" size="lg" className="gap-3 text-lg px-8 py-4 font-orbitron">
            <Play className="w-6 h-6" />
            QUICK START
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-8">
        <Card className="card-elite p-8 hover-float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-inter uppercase tracking-wider">Total Agents</p>
              <p className="text-4xl font-orbitron font-bold text-foreground mt-2">{totalAgents}</p>
            </div>
            <Bot className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </Card>
        
        <Card className="card-elite p-8 hover-float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-inter uppercase tracking-wider">Active</p>
              <p className="text-4xl font-orbitron font-bold text-primary mt-2">{activeAgents}</p>
            </div>
            <Activity className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </Card>

        <Card className="card-elite p-8 hover-float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-inter uppercase tracking-wider">Avg Usage</p>
              <p className="text-4xl font-orbitron font-bold text-primary mt-2">{avgUsage}%</p>
            </div>
            <Brain className="w-10 h-10 text-primary animate-float" />
          </div>
        </Card>

        <Card className="card-elite p-8 hover-float">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-inter uppercase tracking-wider">Performance</p>
              <p className="text-4xl font-orbitron font-bold text-primary mt-2">ELITE</p>
            </div>
            <Zap className="w-10 h-10 text-primary animate-shimmer" />
          </div>
        </Card>
      </div>

      {/* Active Agents */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-orbitron font-bold text-elite">ELITE AGENTS</h2>
          <Button variant="elite" className="gap-3">
            <Settings className="w-5 h-5" />
            MANAGE ALL
          </Button>
        </div>

        <div className="grid gap-8">
          {agents.map((agent) => (
            <Card key={agent.id} className="card-elite p-8 hover-float">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full gradient-elite flex items-center justify-center shadow-elite">
                      <Bot className="w-8 h-8 text-black" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-card ${
                      agent.status === "active" ? "bg-primary animate-pulse" :
                      agent.status === "idle" ? "bg-warning" : "bg-destructive"
                    }`}></div>
                  </div>
                  
                  <div>
                    <h3 className="font-orbitron font-bold text-2xl text-foreground">{agent.name}</h3>
                    <div className="flex items-center gap-3 text-base text-muted-foreground mt-2">
                      <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 font-orbitron">
                        {agent.model}
                      </Badge>
                      <span className="text-primary">•</span>
                      <span className="font-inter">Last active {agent.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground font-inter uppercase tracking-wider">Usage:</span>
                    <span className="font-orbitron font-bold text-xl text-primary">{agent.usage}%</span>
                  </div>
                  <Progress value={agent.usage} className="w-32 h-3 bg-black border border-primary/30" />
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