'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/stores/auth-store';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUERIES = [
  'Berapa produksi beras di Jawa Barat bulan lalu?',
  'Daerah mana harga cabai paling tinggi?',
  'Apakah Indonesia surplus beras tahun ini?',
  'Rekomendasi distribusi stok jagung Bulog',
  'Prediksi harga bawang merah 2 minggu ke depan',
  'Gudang Bulog mana yang stoknya kritis?',
];

const MOCK_RESPONSES: Record<string, string> = {
  'beras': '📊 **Produksi Beras Jawa Barat (Feb 2026):**\n\nTotal produksi: ~127.500 ton dari 5 kabupaten utama:\n- Kab. Subang: 21 ton (Pak Suryanto)\n- Kab. Karawang: 48 ton\n- Kab. Indramayu: 55 ton\n- Kab. Klaten: 30 ton (via transfer)\n\nHarga rata-rata: Rp 14.200/kg (+2.3% MoM)\n\n💡 *Prediksi AI: Produksi April-Mei akan meningkat karena panen raya.*',
  'cabai': '🌶️ **Harga Cabai Tertinggi (Maret 2026):**\n\n1. Cabai Rawit - Sulawesi Selatan: Rp 52.000/kg\n2. Cabai Merah - Jawa Barat: Rp 45.000/kg\n3. Cabai Rawit - NTB: Rp 48.000/kg\n\n⚠️ Harga di Jawa Barat naik 18.4% dalam seminggu terakhir.\n\n💡 *AI memprediksi harga cabai akan stabil dalam 2-3 minggu seiring pasokan dari Garut dan Malang masuk pasar.*',
  'surplus': '📈 **Analisis Surplus/Defisit Indonesia 2026:**\n\n✅ **Surplus:**\n- Beras: +1.200 ribu ton\n- Jagung: +800 ribu ton\n- Bawang Merah: +500 ribu ton\n\n❌ **Defisit:**\n- Kedelai: -400 ribu ton (impor diperlukan)\n- Gula: -200 ribu ton\n\n💡 *Rekomendasi: Tingkatkan impor kedelai dan gula. Potensi ekspor beras ke negara ASEAN.*',
  'default': '🤖 Terima kasih atas pertanyaan Anda! Saya sedang menganalisis data platform untuk memberikan jawaban yang akurat.\n\n*Fitur AI Chatbot sedang dalam pengembangan. Dalam versi lengkap, saya akan bisa:*\n- Menjawab pertanyaan tentang data komoditas real-time\n- Membuat grafik dan tabel on-the-fly\n- Memberikan rekomendasi kebijakan\n- Analisis tren dan prediksi\n\n📊 Silakan coba pertanyaan tentang **beras**, **cabai**, atau **surplus pangan**.',
};

function getResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('beras') && (q.includes('produksi') || q.includes('jawa barat'))) return MOCK_RESPONSES['beras'];
  if (q.includes('cabai') || q.includes('harga') && q.includes('tinggi')) return MOCK_RESPONSES['cabai'];
  if (q.includes('surplus') || q.includes('defisit')) return MOCK_RESPONSES['surplus'];
  return MOCK_RESPONSES['default'];
}

export default function ChatbotPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0', role: 'assistant',
      content: `Halo ${user?.name || 'User'}! 👋 Saya adalah AI Assistant Nusantara TwinChain.\n\nSaya bisa membantu Anda dengan:\n- 📊 Data komoditas & harga\n- 📈 Prediksi & analisis tren\n- 🏭 Informasi stok & distribusi\n- 💡 Rekomendasi kebijakan\n\nSilakan tanyakan apa saja!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 1500));

    const response = getResponse(text);
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-foreground">AI Chatbot</h1>
              <Badge variant="purple">BETA</Badge>
            </div>
            <p className="text-xs text-muted">Tanya jawab data komoditas berbasis AI</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={<RotateCcw className="h-4 w-4" />}
          onClick={() => setMessages(messages.slice(0, 1))}>Reset</Button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              msg.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-violet-600' : 'bg-gradient-to-br from-primary to-primary-light'
            }`}>
              {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4 text-white" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' ? 'bg-primary text-white' : 'bg-surface border border-border'
            }`}>
              <div className={`text-xs whitespace-pre-wrap ${msg.role === 'user' ? 'text-white' : 'text-foreground'}`}>
                {msg.content}
              </div>
              <div className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-muted'}`}>
                {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="rounded-2xl bg-surface border border-border px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Sparkles className="h-3.5 w-3.5 animate-spin" /> Menganalisis...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold text-muted hover:border-primary hover:text-primary transition-all">
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ketik pertanyaan Anda..."
          className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          disabled={loading}
        />
        <Button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
          icon={<Send className="h-4 w-4" />} className="shrink-0">
          Kirim
        </Button>
      </div>
    </div>
  );
}
