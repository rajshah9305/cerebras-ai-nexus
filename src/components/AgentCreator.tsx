import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Bot, Brain, Sparkles, Save, Play, Settings2 } from "lucide-react";

const AgentCreator = () => {
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    description: "",
    model: "",
    systemPrompt: "",
    temperature: [0.7],
    maxTokens: [2048],
    tags: [] as string[]
  });

  const models = [
    { id: "llama3.1-8b", name: "Llama 3.1 8B", speed: "Fast", cost: "Low" },
    { id: "llama3.1-70b", name: "Llama 3.1 70B", speed: "Medium", cost: "Medium" },
    { id: "llama3.1-405b", name: "Llama 3.1 405B", speed: "Slow", cost: "High" }
  ];

  const presetPrompts = [
    "Content Creation Assistant",
    "Data Analysis Expert", 
    "Code Review Specialist",
    "Customer Support Agent",
    "Research Assistant"
  ];

  const addTag = (tag: string) => {
    if (tag && !agentConfig.tags.includes(tag)) {
      setAgentConfig(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setAgentConfig(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
          <Bot className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Create AI Agent</h1>
        <p className="text-muted-foreground">Configure and deploy a new AI agent with Cerebras models</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Basic Configuration</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter agent name"
                    value={agentConfig.name}
                    onChange={(e) => setAgentConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-button"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select value={agentConfig.model} onValueChange={(value) => setAgentConfig(prev => ({ ...prev, model: value }))}>
                    <SelectTrigger className="glass-button">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <div className="flex gap-1 ml-2">
                              <Badge variant="outline" className="text-xs">{model.speed}</Badge>
                              <Badge variant="outline" className="text-xs">{model.cost}</Badge>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the agent's purpose"
                  value={agentConfig.description}
                  onChange={(e) => setAgentConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="glass-button"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  placeholder="Define the agent's role, behavior, and capabilities..."
                  value={agentConfig.systemPrompt}
                  onChange={(e) => setAgentConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                  className="glass-button min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Temperature: {agentConfig.temperature[0]}</Label>
                  <Slider
                    value={agentConfig.temperature}
                    onValueChange={(value) => setAgentConfig(prev => ({ ...prev, temperature: value }))}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Controls randomness in responses</p>
                </div>

                <div className="space-y-3">
                  <Label>Max Tokens: {agentConfig.maxTokens[0]}</Label>
                  <Slider
                    value={agentConfig.maxTokens}
                    onValueChange={(value) => setAgentConfig(prev => ({ ...prev, maxTokens: value }))}
                    min={128}
                    max={8192}
                    step={128}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Maximum response length</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {agentConfig.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add tags (press Enter)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addTag(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="glass-button"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="gradient" size="lg" className="flex-1 gap-2">
              <Save className="w-4 h-4" />
              Save Agent
            </Button>
            <Button variant="glass" size="lg" className="gap-2">
              <Play className="w-4 h-4" />
              Test Agent
            </Button>
          </div>
        </div>

        {/* Quick Presets & Preview */}
        <div className="space-y-6">
          <Card className="glass p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Quick Presets</h3>
              </div>
              <div className="space-y-2">
                {presetPrompts.map((preset) => (
                  <Button
                    key={preset}
                    variant="glass"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setAgentConfig(prev => ({ ...prev, name: preset }))}
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Agent Preview</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{agentConfig.name || "Unnamed Agent"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">{agentConfig.model || "Not selected"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-medium">{agentConfig.temperature[0]}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Tokens</p>
                  <p className="font-medium">{agentConfig.maxTokens[0]}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentCreator;