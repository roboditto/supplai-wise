import { AppLayout } from "@/components/AppLayout";
import { aiPredictions, alerts, inventoryItems, shipments } from "@/data/mock-data";
import { mockAIProvider } from "@/services/ai-mock";
import { useState, useRef, useEffect } from "react";
import { Brain, Send, TrendingDown, AlertTriangle, Clock, Lightbulb, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssistantMessage } from "@/types";

function PredictionCard({ prediction }: { prediction: typeof aiPredictions[0] }) {
  const typeConfig = {
    delay_risk: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
    stockout: { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' },
    eta: { icon: Clock, color: 'text-info', bg: 'bg-info/10' },
  };

  const config = typeConfig[prediction.type];
  const Icon = config.icon;

  return (
    <div className="bg-card rounded-xl border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg", config.bg)}>
          <Icon className={cn("w-4 h-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{prediction.entityId}</span>
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded",
              prediction.confidence >= 80 ? "bg-destructive/10 text-destructive" :
              prediction.confidence >= 50 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
            )}>
              {prediction.confidence}% confidence
            </span>
          </div>
          <p className="text-sm font-semibold text-card-foreground mb-1">{prediction.prediction}</p>
          <p className="text-xs text-muted-foreground mb-2">{prediction.details}</p>
          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary">{prediction.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIInsights() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI logistics assistant. Ask me about shipments, inventory, or risk analysis.\n\nTry:\n- "Where is shipment TRK-102?"\n- "Which items are low in stock?"\n- "What shipment is most at risk?"', timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: AssistantMessage = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Replace mockAIProvider.chat with real AI provider
      const response = await mockAIProvider.chat([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date().toISOString() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "Where is shipment TRK-102?",
    "Which items are low in stock?",
    "What shipment is most at risk?",
    "What inventory will run out first?",
  ];

  return (
    <AppLayout title="AI Insights" subtitle="Predictions, recommendations, and AI assistant">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Predictions Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">AI Predictions & Recommendations</h2>
          </div>

          {aiPredictions.map(pred => (
            <PredictionCard key={pred.id} prediction={pred} />
          ))}
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border flex flex-col h-[600px] sticky top-24">
            <div className="px-4 py-3 border-b flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-card-foreground">AI Assistant</h3>
                <p className="text-[10px] text-muted-foreground">Ask about shipments, inventory, or risks</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                    msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-card-foreground"
                  )}>
                    <div className="whitespace-pre-wrap text-xs leading-relaxed">
                      {msg.content.split('\n').map((line, j) => (
                        <span key={j}>
                          {line.replace(/\*\*(.*?)\*\*/g, '').replace(/📍|📦|⚠️|🔴|🟡|⏰|📊|📈/g, match => match + ' ')}
                          {j < msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary animate-pulse-slow" />
                  </div>
                  <div className="bg-muted rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-[10px] px-2 py-1 rounded-full bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about logistics..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-muted text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
