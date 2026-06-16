import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

const APPS = [
  { name: 'Telegram', icon: 'Send', desc: 'Боты и рассылки', connected: true },
  { name: 'Slack', icon: 'Hash', desc: 'Уведомления в каналы', connected: true },
  { name: 'Notion', icon: 'FileText', desc: 'Синхронизация контента', connected: false },
  { name: 'Zapier', icon: 'Zap', desc: '5000+ автоматизаций', connected: false },
  { name: 'Google Sheets', icon: 'Table', desc: 'Экспорт данных', connected: true },
  { name: 'Webhook', icon: 'Webhook', desc: 'Свои эндпоинты', connected: false },
];

const SDK = ['REST API', 'Webhooks', 'Python SDK', 'JS / TS SDK', 'OAuth 2.0', 'GraphQL'];

const Integrations = () => (
  <Layout>
    <PageHeader
      tag="ИНТЕГРАЦИИ"
      title="Подключите SuperMind ко всему"
      subtitle="Публичный API, готовые SDK и интеграции с популярными сервисами. Управляйте ключами доступа в одном месте."
    />

    <section className="relative z-10 container pb-16">
      <div className="glass neon-border rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center overflow-hidden">
        <div>
          <span className="font-mono text-sm text-neon-cyan">// ПУБЛИЧНЫЙ API</span>
          <h2 className="font-display font-bold text-3xl mt-3 mb-5">Единый REST API для всех функций</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Авторизация по ключу, понятная документация, стабильный отклик &lt;200мс и SDK для популярных языков.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {SDK.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-mono text-foreground/80">{t}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
              <Icon name="Key" size={18} className="mr-1" />
              Создать API-ключ
            </Button>
            <Button variant="outline" className="border-border bg-transparent hover:bg-secondary rounded-lg">
              <Icon name="BookOpen" size={18} className="mr-1" />
              Документация
            </Button>
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
  -d <span className="text-green-400">'{'{'}"type":"text"{'}'}'</span>

<span className="text-muted-foreground">→ 200 OK · 184ms</span>
          </pre>
        </div>
      </div>
    </section>

    <section className="relative z-10 container pb-28">
      <h2 className="font-display font-bold text-2xl mb-6">Сервисы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {APPS.map((app, i) => (
          <div
            key={app.name}
            className="glass rounded-2xl p-6 flex items-center gap-4 hover:neon-border transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
              <Icon name={app.icon} size={24} className="text-neon-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{app.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{app.desc}</p>
            </div>
            <Button
              variant={app.connected ? 'outline' : 'default'}
              className={app.connected
                ? 'border-neon-cyan/40 bg-transparent text-neon-cyan hover:bg-neon-cyan/10 rounded-lg shrink-0'
                : 'bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:opacity-90 rounded-lg shrink-0'}
            >
              {app.connected ? 'Подключено' : 'Подключить'}
            </Button>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Integrations;
