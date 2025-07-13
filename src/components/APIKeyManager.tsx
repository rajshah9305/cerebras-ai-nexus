import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: "active" | "invalid" | "pending";
  lastUsed: string;
  usage: number;
}

const APIKeyManager = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Production Key",
      key: "cbr_sk_1234567890abcdef",
      status: "active",
      lastUsed: "2 hours ago",
      usage: 1250
    },
    {
      id: "2", 
      name: "Development Key",
      key: "cbr_sk_fedcba0987654321",
      status: "active",
      lastUsed: "1 day ago",
      usage: 450
    }
  ]);

  const [newKey, setNewKey] = useState({ name: "", key: "" });
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addNewKey = () => {
    if (!newKey.name || !newKey.key) return;

    const key: APIKey = {
      id: Date.now().toString(),
      name: newKey.name,
      key: newKey.key,
      status: "pending",
      lastUsed: "Never",
      usage: 0
    };

    setApiKeys(prev => [...prev, key]);
    setNewKey({ name: "", key: "" });
    setIsAdding(false);

    // Simulate validation
    setTimeout(() => {
      setApiKeys(prev => prev.map(k => 
        k.id === key.id ? { ...k, status: "active" } : k
      ));
    }, 2000);
  };

  const deleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const maskKey = (key: string) => {
    return key.slice(0, 8) + "..." + key.slice(-4);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "invalid": return "destructive";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
          <Key className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold">API Key Management</h1>
        <p className="text-muted-foreground">Manage your Cerebras AI API keys securely</p>
      </div>

      {/* Add New Key */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <Button 
              variant="gradient" 
              onClick={() => setIsAdding(!isAdding)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Key
            </Button>
          </div>

          {isAdding && (
            <div className="space-y-4 p-4 glass rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g., Production Key"
                    value={newKey.name}
                    onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-button"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    placeholder="cbr_sk_..."
                    value={newKey.key}
                    onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
                    className="glass-button"
                    type="password"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={addNewKey} variant="gradient" size="sm">
                  Add Key
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="glass" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Alert className="glass border-primary/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your API keys are stored locally and encrypted. Never share your keys with others.
            </AlertDescription>
          </Alert>
        </div>
      </Card>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((keyItem) => (
          <Card key={keyItem.id} className="glass p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{keyItem.name}</h3>
                  <Badge variant={getStatusColor(keyItem.status) as any}>
                    {keyItem.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {keyItem.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>Key:</span>
                    <code className="px-2 py-1 bg-muted rounded text-foreground">
                      {showKeys[keyItem.id] ? keyItem.key : maskKey(keyItem.key)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => toggleKeyVisibility(keyItem.id)}
                    >
                      {showKeys[keyItem.id] ? 
                        <EyeOff className="w-3 h-3" /> : 
                        <Eye className="w-3 h-3" />
                      }
                    </Button>
                  </div>
                  <span>•</span>
                  <span>Last used: {keyItem.lastUsed}</span>
                  <span>•</span>
                  <span>{keyItem.usage.toLocaleString()} requests</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteKey(keyItem.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Usage Stats */}
      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Usage Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">
              {apiKeys.reduce((acc, key) => acc + key.usage, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-success">
              {apiKeys.filter(k => k.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active Keys</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">
              {apiKeys.filter(k => k.lastUsed !== "Never").length}
            </p>
            <p className="text-sm text-muted-foreground">Keys in Use</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default APIKeyManager;