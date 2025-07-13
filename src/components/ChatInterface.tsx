import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Plus, Settings, Trash2, Copy } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  agentId?: string;
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  model: string;
  status: "active" | "idle";
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI agent orchestrator. How can I help you today?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAgents] = useState<Agent[]>([
    { id: "1", name: "Content Creator", model: "llama3.1-8b", status: "active" },
    { id: "2", name: "Data Analyst", model: "llama3.1-70b", status: "active" },
    { id: "3", name: "Code Assistant", model: "llama3.1-8b", status: "idle" }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. Let me coordinate with the available agents to provide the best response...",
        role: "assistant",
        agentId: "1",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="h-screen flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Multi-Agent Chat</h1>
              <p className="text-sm text-muted-foreground">
                {activeAgents.filter(a => a.status === "active").length} agents active
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="glass" size="sm" onClick={clearChat}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 gradient-primary flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] space-y-2 ${message.role === "user" ? "order-first" : ""}`}>
                  <Card className={`p-4 ${
                    message.role === "user" 
                      ? "glass bg-primary/10 border-primary/20" 
                      : "glass"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.agentId && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Content Creator
                      </Badge>
                    )}
                  </Card>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyMessage(message.content)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {message.role === "user" && (
                  <Avatar className="w-8 h-8 bg-muted flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <Avatar className="w-8 h-8 gradient-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </Avatar>
                <Card className="glass p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="glass p-4 border-t border-border/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI agents anything..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="glass-button flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                variant="gradient"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Agents Sidebar */}
      <div className="w-80 glass border-l border-border/20 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Active Agents</h2>
            <Button variant="glass" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {activeAgents.map((agent) => (
              <Card key={agent.id} className="glass p-3 hover-lift">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                      agent.status === "active" ? "bg-success" : "bg-warning"
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.model}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="glass p-4">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="glass" size="sm" className="w-full justify-start">
                Add Agent to Chat
              </Button>
              <Button variant="glass" size="sm" className="w-full justify-start">
                Create Workflow
              </Button>
              <Button variant="glass" size="sm" className="w-full justify-start">
                Export Conversation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;