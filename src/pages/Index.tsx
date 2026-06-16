import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_BG = 'https://cdn.poehali.dev/projects/5d746308-3b2e-4992-8271-18adbadc1a91/files/9cf87042-343d-4d97-9b94-29ff395b2103.jpg';

const NAV = ['Генератор', 'Агенты', 'Библиотека', 'Интеграции', 'Настройки'];

const GENERATORS = [
  { icon: 'Type', title: 'Текст', desc: 'Статьи, посты, сценарии и код за секунды', color: '220 100% 62%' },
  { icon: 'Image', title: 'Изображения', desc: 'Арты, концепты и фото в любом стиле', color: '270 95% 65%' },
  { icon: 'Clapperboard', title: 'Видео', desc: 'Ролики и анимация из текстового описания', color: '185 100% 55%' },
  { icon: 'AudioLines', title: 'Голос', desc: 'Озвучка и синтез речи на 40+ языках', color: '320 90% 65%' },
];

const AGENTS = [
  { name: 'Аналитик', role: 'Бизнес-метрики и прогнозы', icon: 'TrendingUp', tasks: '12.4K' },
  { name: 'Копирайтер', role: 'Тексты и контент-маркетинг', icon: 'PenLine', tasks: '8.7K' },
  { name: 'Дизайнер', role: 'Визуалы и брендинг', icon: 'Palette', tasks: '6.1K' },
  { name: 'Стратег', role: 'Планы и автоматизация', icon: 'Target', tasks: '4.9K' },
];

const STATS = [
  { value: '40+', label: 'AI-моделей' },
  { value: '99.9%', label: 'аптайм API' },
  { value: '2.4M', label: 'генераций/день' },
  { value: '<200мс', label: 'отклик' },
];

const Index = () => {
  const [activeNav, setActiveNav] = useState('Генератор');
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-neon-purple/20 blur-[120px] animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-neon-blue/20 blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      </div>

      <header className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue flex items-center justify-center neon-border">
              <Icon name="BrainCircuit" size={20} className="text-white" />
            </div>
            <span className="font-display font-semibold text-xl tracking-wide">
              SUPER<span className="text-gradient">MIND</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeNav === item
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
            Войти
          </Button>
        </div>
      </header>

      <section className="relative z-10 container pt-20 pb-28 text-center">
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          style={{ maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)', WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)' }}
        />
        <div className="relative animate-fade-in max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-glow-pulse" />
            v1.0 — Мультиагентная AI-платформа
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
            Один интеллект для<br />
            <span className="text-gradient">всего вашего контента</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Генерируйте текст, изображения, видео и голос. Управляйте AI-агентами
            и подключайте всё к своим приложениям через публичный API.
          </p>

          <div className="glass neon-border rounded-2xl p-2 flex items-center gap-2 max-w-2xl mx-auto mb-6">
            <Icon name="Sparkles" size={20} className="text-neon-purple ml-3 shrink-0" />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Опишите, что нужно создать..."
              className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground py-3"
            />
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-xl px-6 shrink-0">
              Создать
            </Button>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            free tier · без карты · 100 генераций в подарок
          </p>
        </div>
      </section>

      <section className="relative z-10 container pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GENERATORS.map((g, i) => (
            <div
              key={g.title}
              className="group glass rounded-2xl p-6 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ background: `hsl(${g.color} / 0.15)`, boxShadow: `0 0 30px -10px hsl(${g.color} / 0.8)` }}
              >
                <Icon name={g.icon} size={24} style={{ color: `hsl(${g.color})` }} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 container pb-28">
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-neon-cyan">// АГЕНТЫ</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">
            Команда AI, работающая на вас
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {AGENTS.map((a) => (
            <div key={a.name} className="glass rounded-2xl p-6 hover:neon-border transition-all duration-300 group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <Icon name={a.icon} size={22} className="text-neon-purple" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{a.tasks} задач</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 container pb-28">
        <div className="glass rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center overflow-hidden">
          <div>
            <span className="font-mono text-sm text-neon-cyan">// ПУБЛИЧНЫЙ API</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl mt-3 mb-5">
              Подключите SuperMind к любому приложению
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Единый REST API для всех генераторов и агентов. Простая авторизация по ключу,
              понятная документация и SDK для популярных языков.
            </p>
            <div className="flex flex-wrap gap-3">
              {['REST', 'Webhooks', 'Python SDK', 'JS SDK', 'OAuth 2.0'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-secondary text-sm font-mono text-foreground/80">
                  {t}
                </span>
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
<span className="text-neon-purple">POST</span> https://api.supermind.ai/v1/generate

{'{'}
  <span className="text-neon-cyan">"agent"</span>: <span className="text-green-400">"copywriter"</span>,
  <span className="text-neon-cyan">"type"</span>: <span className="text-green-400">"text"</span>,
  <span className="text-neon-cyan">"prompt"</span>: <span className="text-green-400">"Запусти кампанию"</span>
{'}'}

<span className="text-muted-foreground">→ 200 OK · 184ms</span>
            </pre>
          </div>
        </div>
      </section>

      <section className="relative z-10 container pb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div key={s.label} className="text-center glass rounded-2xl py-8">
              <div className="font-display font-bold text-4xl md:text-5xl text-gradient">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/60">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue flex items-center justify-center">
              <Icon name="BrainCircuit" size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold tracking-wide">SUPERMIND AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SuperMind AI. Создано для будущего.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
