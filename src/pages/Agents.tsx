import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

const AGENTS = [
  { name: 'Аналитик', role: 'Бизнес-метрики и прогнозы', icon: 'TrendingUp', tasks: '12.4K', status: 'Активен', skills: ['Прогнозы', 'Отчёты', 'KPI'] },
  { name: 'Копирайтер', role: 'Тексты и контент-маркетинг', icon: 'PenLine', tasks: '8.7K', status: 'Активен', skills: ['SEO', 'Посты', 'Сценарии'] },
  { name: 'Дизайнер', role: 'Визуалы и брендинг', icon: 'Palette', tasks: '6.1K', status: 'Активен', skills: ['Логотипы', 'Баннеры', 'UI'] },
  { name: 'Стратег', role: 'Планы и автоматизация', icon: 'Target', tasks: '4.9K', status: 'В отпуске', skills: ['Воронки', 'Гипотезы'] },
  { name: 'Переводчик', role: 'Локализация на 40+ языков', icon: 'Languages', tasks: '3.2K', status: 'Активен', skills: ['Перевод', 'Адаптация'] },
  { name: 'Исследователь', role: 'Сбор и анализ данных', icon: 'Microscope', tasks: '2.8K', status: 'Активен', skills: ['Парсинг', 'Сводки'] },
];

const Agents = () => (
  <Layout>
    <PageHeader
      tag="АГЕНТЫ"
      title="Команда AI, работающая на вас"
      subtitle="Автономные агенты выполняют задачи 24/7. Назначайте роли, отслеживайте загрузку и создавайте своих."
    />

    <section className="relative z-10 container pb-28">
      <div className="flex justify-end mb-6">
        <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
          <Icon name="Plus" size={18} className="mr-1" />
          Создать агента
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {AGENTS.map((a, i) => (
          <div
            key={a.name}
            className="glass rounded-2xl p-6 hover:neon-border transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                <Icon name={a.icon} size={24} className="text-neon-purple" />
              </div>
              <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${a.status === 'Активен' ? 'bg-neon-cyan/15 text-neon-cyan' : 'bg-muted text-muted-foreground'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'Активен' ? 'bg-neon-cyan animate-glow-pulse' : 'bg-muted-foreground'}`} />
                {a.status}
              </span>
            </div>
            <h3 className="font-display font-semibold text-xl mb-1">{a.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{a.role}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {a.skills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-foreground/80">{s}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <span className="font-mono text-sm text-muted-foreground">{a.tasks} задач</span>
              <button className="text-sm font-medium text-neon-purple hover:text-neon-blue transition-colors flex items-center gap-1">
                Настроить <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Agents;
