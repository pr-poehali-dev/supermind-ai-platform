import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

type ApiKey = { id: number; name: string; key: string; created: string; calls: number; active: boolean };
type App = { id: number; name: string; icon: string; desc: string; category: string; connected: boolean; config: string };

const INITIAL_KEYS: ApiKey[] = [
  { id: 1, name: 'Основной ключ', key: 'sk_live_4f8a...c21b', created: '01 июн 2026', calls: 8420, active: true },
  { id: 2, name: 'Тестовый ключ', key: 'sk_test_9d2e...77fa', created: '10 июн 2026', calls: 134, active: true },
];

const INITIAL_APPS: App[] = [
  { id: 1, name: 'Telegram', icon: 'Send', desc: 'Боты и рассылки', category: 'Мессенджеры', connected: true, config: 'Bot Token: 7412...xAA' },
  { id: 2, name: 'Slack', icon: 'Hash', desc: 'Уведомления в каналы', category: 'Мессенджеры', connected: true, config: 'Workspace: supermind.slack.com' },
  { id: 3, name: 'Notion', icon: 'FileText', desc: 'Синхронизация контента', category: 'Продуктивность', connected: false, config: '' },
  { id: 4, name: 'Zapier', icon: 'Zap', desc: '5000+ автоматизаций', category: 'Автоматизация', connected: false, config: '' },
  { id: 5, name: 'Google Sheets', icon: 'Table', desc: 'Экспорт данных и таблицы', category: 'Продуктивность', connected: true, config: 'Sheet: SuperMind_Export' },
  { id: 6, name: 'Webhook', icon: 'Webhook', desc: 'Свои HTTP-эндпоинты', category: 'Разработка', connected: false, config: '' },
  { id: 7, name: 'GitHub', icon: 'Github', desc: 'Коммиты и автоматизация', category: 'Разработка', connected: false, config: '' },
  { id: 8, name: 'Airtable', icon: 'Database', desc: 'База данных и формы', category: 'Продуктивность', connected: false, config: '' },
];

const CATEGORIES = ['Все', 'Мессенджеры', 'Продуктивность', 'Автоматизация', 'Разработка'];
const SDK = ['REST API', 'Webhooks', 'Python SDK', 'JS / TS SDK', 'OAuth 2.0', 'GraphQL'];

function maskKey(key: string) { return key; }

export default function Integrations() {
  const [keys, setKeys] = useState<ApiKey[]>(INITIAL_KEYS);
  const [apps, setApps] = useState<App[]>(INITIAL_APPS);
  const [catFilter, setCatFilter] = useState('Все');

  const [showNewKey, setShowNewKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [deleteKeyId, setDeleteKeyId] = useState<number | null>(null);

  const [connectApp, setConnectApp] = useState<App | null>(null);
  const [connectInput, setConnectInput] = useState('');
  const [disconnectApp, setDisconnectApp] = useState<App | null>(null);

  const [tab, setTab] = useState<'services' | 'api'>('services');

  const shownApps = catFilter === 'Все' ? apps : apps.filter((a) => a.category === catFilter);
  const connectedCount = apps.filter((a) => a.connected).length;

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const raw = 'sk_live_' + Math.random().toString(36).slice(2, 10) + '...' + Math.random().toString(36).slice(2, 6);
    const newKey: ApiKey = {
      id: Date.now(), name: newKeyName, key: raw,
      created: new Date().toLocaleDateString('ru', { day: '2-digit', month: 'short', year: 'numeric' }),
      calls: 0, active: true,
    };
    setKeys((k) => [...k, newKey]);
    setCreatedKey(raw);
    setNewKeyName('');
    setShowNewKey(false);
  };

  const toggleKey = (id: number) => setKeys((k) => k.map((x) => x.id === id ? { ...x, active: !x.active } : x));
  const deleteKey = (id: number) => { setKeys((k) => k.filter((x) => x.id !== id)); setDeleteKeyId(null); };

  const copyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConnect = () => {
    if (!connectApp) return;
    setApps((list) => list.map((a) => a.id === connectApp.id ? { ...a, connected: true, config: connectInput || 'Настроено' } : a));
    setConnectApp(null);
    setConnectInput('');
  };

  const handleDisconnect = () => {
    if (!disconnectApp) return;
    setApps((list) => list.map((a) => a.id === disconnectApp.id ? { ...a, connected: false, config: '' } : a));
    setDisconnectApp(null);
  };

  return (
    <Layout>
      <PageHeader
        tag="ИНТЕГРАЦИИ"
        title="Подключите SuperMind ко всему"
        subtitle="Публичный API, готовые SDK и интеграции с популярными сервисами. Управляйте ключами доступа в одном месте."
      />

      <section className="relative z-10 container pb-28">

        {/* tabs */}
        <div className="flex gap-1 p-1 glass rounded-xl w-fit mb-8">
          {(['services', 'api'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t === 'services' ? `Сервисы · ${connectedCount}` : 'API и ключи'}
            </button>
          ))}
        </div>

        {/* ===== SERVICES TAB ===== */}
        {tab === 'services' && (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${catFilter === c ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {shownApps.map((app, i) => (
                <div
                  key={app.id}
                  className="glass rounded-2xl p-6 hover:neon-border transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon name={app.icon} size={24} className={app.connected ? 'text-neon-cyan' : 'text-muted-foreground'} />
                    </div>
                    {app.connected && (
                      <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-neon-cyan/15 text-neon-cyan">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-glow-pulse" />
                        Активно
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-base mb-0.5">{app.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{app.desc}</p>
                  {app.connected && app.config && (
                    <p className="text-xs font-mono text-neon-purple/70 mt-1 mb-3 truncate">{app.config}</p>
                  )}
                  {!app.connected && <div className="mb-3" />}
                  <Button
                    onClick={() => app.connected ? setDisconnectApp(app) : (setConnectApp(app), setConnectInput(''))}
                    variant={app.connected ? 'outline' : 'default'}
                    className={app.connected
                      ? 'w-full border-border bg-transparent hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 text-muted-foreground rounded-lg transition-all'
                      : 'w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:opacity-90 rounded-lg'}
                  >
                    {app.connected ? 'Отключить' : 'Подключить'}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== API TAB ===== */}
        {tab === 'api' && (
          <div className="space-y-8">
            {/* API keys */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl">API-ключи</h2>
                <Button onClick={() => setShowNewKey(true)} className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
                  <Icon name="Plus" size={18} className="mr-1" />
                  Создать ключ
                </Button>
              </div>

              {createdKey && (
                <div className="glass border border-neon-cyan/40 rounded-xl p-4 mb-4 flex items-start gap-3 animate-fade-in">
                  <Icon name="CheckCircle" size={20} className="text-neon-cyan shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neon-cyan mb-1">Ключ создан! Сохраните его — он больше не будет показан полностью.</p>
                    <p className="font-mono text-sm text-foreground/80 break-all">{createdKey}</p>
                  </div>
                  <button onClick={() => setCreatedKey(null)} className="text-muted-foreground hover:text-foreground">
                    <Icon name="X" size={16} />
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {keys.map((k) => (
                  <div key={k.id} className="glass rounded-xl p-5 flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${k.active ? 'bg-neon-cyan animate-glow-pulse' : 'bg-muted-foreground'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium">{k.name}</span>
                        {!k.active && <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Отключён</span>}
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">{maskKey(k.key)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{k.calls.toLocaleString()} вызовов · создан {k.created}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyKey(k.id, k.key)}
                        className="p-2 rounded-lg bg-secondary hover:bg-neon-purple/20 transition-colors"
                        title="Скопировать"
                      >
                        <Icon name={copied === k.id ? 'Check' : 'Copy'} size={15} className={copied === k.id ? 'text-neon-cyan' : 'text-muted-foreground'} />
                      </button>
                      <button
                        onClick={() => toggleKey(k.id)}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        title={k.active ? 'Отключить' : 'Включить'}
                      >
                        <Icon name={k.active ? 'PauseCircle' : 'PlayCircle'} size={15} className="text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => setDeleteKeyId(k.id)}
                        className="p-2 rounded-lg bg-secondary hover:bg-red-500/10 transition-colors"
                        title="Удалить"
                      >
                        <Icon name="Trash2" size={15} className="text-muted-foreground hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* code block */}
            <div className="glass neon-border rounded-3xl p-8 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="font-mono text-sm text-neon-cyan">// ПУБЛИЧНЫЙ API</span>
                <h2 className="font-display font-bold text-2xl mt-3 mb-4">Единый REST API для всех функций</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  Авторизация по ключу, стабильный отклик &lt;200мс и SDK для популярных языков.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SDK.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-mono text-foreground/80">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-[#0a0a14] border border-border p-5 font-mono text-sm overflow-x-auto glow-blue">
                <div className="flex gap-1.5 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <pre className="text-foreground/90 leading-relaxed whitespace-pre">
<span className="text-muted-foreground"># генерация через API</span>
<span className="text-neon-purple">curl</span> -X POST \
  https://api.supermind.ai/v1/generate \
  -H <span className="text-green-400">"Authorization: Bearer sk_..."</span> \
  -d <span className="text-green-400">'{"{"}"type":"text"{"}"}'</span>

<span className="text-muted-foreground">→ 200 OK · 184ms</span>
                </pre>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MODAL: подключить сервис */}
      {connectApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setConnectApp(null)} />
          <div className="relative glass neon-border rounded-3xl p-8 w-full max-w-md animate-fade-in">
            <button onClick={() => setConnectApp(null)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-5">
              <Icon name={connectApp.icon} size={28} className="text-neon-cyan" />
            </div>
            <span className="font-mono text-xs text-neon-cyan">// ПОДКЛЮЧЕНИЕ</span>
            <h2 className="font-display font-bold text-2xl mt-1 mb-5">Подключить {connectApp.name}</h2>

            <div className="space-y-4 mb-7">
              <div className="space-y-2">
                <Label>{connectApp.name === 'Webhook' ? 'URL эндпоинта' : connectApp.name === 'Telegram' ? 'Bot Token' : connectApp.name === 'Slack' ? 'Webhook URL' : 'Токен / ключ доступа'}</Label>
                <Input
                  placeholder={
                    connectApp.name === 'Webhook' ? 'https://yourapp.com/webhook' :
                    connectApp.name === 'Telegram' ? '7412345678:AAF...' :
                    connectApp.name === 'Slack' ? 'https://hooks.slack.com/...' :
                    'Вставьте токен или API-ключ'
                  }
                  value={connectInput}
                  onChange={(e) => setConnectInput(e.target.value)}
                  className="bg-secondary border-border font-mono"
                />
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary text-xs text-muted-foreground">
                <Icon name="Info" size={14} className="shrink-0 mt-0.5 text-neon-cyan" />
                Данные хранятся в зашифрованном виде и используются только для отправки запросов от вашего имени.
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setConnectApp(null)} variant="outline" className="flex-1 border-border bg-transparent hover:bg-secondary rounded-lg">
                Отмена
              </Button>
              <Button onClick={handleConnect} className="flex-1 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
                Подключить
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: создать API-ключ */}
      {showNewKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowNewKey(false)} />
          <div className="relative glass neon-border rounded-3xl p-8 w-full max-w-md animate-fade-in">
            <button onClick={() => setShowNewKey(false)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>
            <span className="font-mono text-xs text-neon-cyan">// НОВЫЙ КЛЮЧ</span>
            <h2 className="font-display font-bold text-2xl mt-1 mb-6">Создать API-ключ</h2>
            <div className="space-y-2 mb-7">
              <Label>Название ключа</Label>
              <Input
                placeholder="Например: Мобильное приложение"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateKey()}
                className="bg-secondary border-border"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowNewKey(false)} variant="outline" className="flex-1 border-border bg-transparent hover:bg-secondary rounded-lg">
                Отмена
              </Button>
              <Button onClick={handleCreateKey} className="flex-1 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
                <Icon name="Key" size={16} className="mr-1" />
                Создать
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM: отключить сервис */}
      {disconnectApp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDisconnectApp(null)} />
          <div className="relative glass neon-border rounded-2xl p-8 w-full max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
              <Icon name={disconnectApp.icon} size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Отключить {disconnectApp.name}?</h3>
            <p className="text-muted-foreground text-sm mb-7">Интеграция перестанет работать. Настройки будут удалены.</p>
            <div className="flex gap-3">
              <Button onClick={() => setDisconnectApp(null)} variant="outline" className="flex-1 border-border bg-transparent hover:bg-secondary rounded-lg">
                Отмена
              </Button>
              <Button onClick={handleDisconnect} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                Отключить
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM: удалить ключ */}
      {deleteKeyId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteKeyId(null)} />
          <div className="relative glass neon-border rounded-2xl p-8 w-full max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-5">
              <Icon name="Trash2" size={28} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Удалить ключ?</h3>
            <p className="text-muted-foreground text-sm mb-7">Все запросы с этим ключом перестанут работать немедленно.</p>
            <div className="flex gap-3">
              <Button onClick={() => setDeleteKeyId(null)} variant="outline" className="flex-1 border-border bg-transparent hover:bg-secondary rounded-lg">
                Отмена
              </Button>
              <Button onClick={() => deleteKey(deleteKeyId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
