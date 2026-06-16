import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

type Agent = {
  id: number;
  name: string;
  role: string;
  icon: string;
  tasks: string;
  status: 'Активен' | 'Пауза';
  skills: string[];
  model: string;
  temperature: number;
};

const ICONS = ['TrendingUp', 'PenLine', 'Palette', 'Target', 'Languages', 'Microscope', 'Bot', 'Zap', 'Globe', 'Code', 'BarChart', 'Megaphone'];
const MODELS = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Mistral Large', 'LLaMA 3.1'];

const DEFAULT_AGENTS: Agent[] = [
  { id: 1, name: 'Аналитик', role: 'Бизнес-метрики и прогнозы', icon: 'TrendingUp', tasks: '12.4K', status: 'Активен', skills: ['Прогнозы', 'Отчёты', 'KPI'], model: 'GPT-4o', temperature: 0.3 },
  { id: 2, name: 'Копирайтер', role: 'Тексты и контент-маркетинг', icon: 'PenLine', tasks: '8.7K', status: 'Активен', skills: ['SEO', 'Посты', 'Сценарии'], model: 'Claude 3.5', temperature: 0.8 },
  { id: 3, name: 'Дизайнер', role: 'Визуалы и брендинг', icon: 'Palette', tasks: '6.1K', status: 'Активен', skills: ['Логотипы', 'Баннеры', 'UI'], model: 'GPT-4o', temperature: 0.7 },
  { id: 4, name: 'Стратег', role: 'Планы и автоматизация', icon: 'Target', tasks: '4.9K', status: 'Пауза', skills: ['Воронки', 'Гипотезы'], model: 'Gemini 1.5', temperature: 0.5 },
  { id: 5, name: 'Переводчик', role: 'Локализация на 40+ языков', icon: 'Languages', tasks: '3.2K', status: 'Активен', skills: ['Перевод', 'Адаптация'], model: 'Mistral Large', temperature: 0.2 },
  { id: 6, name: 'Исследователь', role: 'Сбор и анализ данных', icon: 'Microscope', tasks: '2.8K', status: 'Активен', skills: ['Парсинг', 'Сводки'], model: 'Claude 3.5', temperature: 0.4 },
];

const emptyForm = () => ({
  name: '',
  role: '',
  icon: 'Bot',
  model: 'GPT-4o',
  temperature: 0.7,
  skillInput: '',
  skills: [] as string[],
});

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [showCreate, setShowCreate] = useState(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openCreate = () => { setForm(emptyForm()); setShowCreate(true); };
  const openEdit = (a: Agent) => {
    setEditAgent(a);
    setForm({ name: a.name, role: a.role, icon: a.icon, model: a.model, temperature: a.temperature, skillInput: '', skills: [...a.skills] });
  };

  const addSkill = () => {
    const s = form.skillInput.trim();
    if (s && !form.skills.includes(s)) setForm((f) => ({ ...f, skills: [...f.skills, s], skillInput: '' }));
  };
  const removeSkill = (s: string) => setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));

  const handleCreate = () => {
    if (!form.name.trim()) return;
    const newAgent: Agent = {
      id: Date.now(),
      name: form.name,
      role: form.role || 'Пользовательский агент',
      icon: form.icon,
      tasks: '0',
      status: 'Активен',
      skills: form.skills,
      model: form.model,
      temperature: form.temperature,
    };
    setAgents((a) => [...a, newAgent]);
    setShowCreate(false);
  };

  const handleSave = () => {
    if (!editAgent) return;
    setAgents((list) => list.map((a) => a.id === editAgent.id
      ? { ...a, name: form.name, role: form.role, icon: form.icon, model: form.model, temperature: form.temperature, skills: form.skills }
      : a
    ));
    setEditAgent(null);
  };

  const toggleStatus = (id: number) => setAgents((list) =>
    list.map((a) => a.id === id ? { ...a, status: a.status === 'Активен' ? 'Пауза' : 'Активен' } : a)
  );

  const handleDelete = (id: number) => {
    setAgents((list) => list.filter((a) => a.id !== id));
    setDeleteId(null);
    if (editAgent?.id === id) setEditAgent(null);
  };

  const modal = showCreate || !!editAgent;
  const isEdit = !!editAgent;

  return (
    <Layout>
      <PageHeader
        tag="АГЕНТЫ"
        title="Команда AI, работающая на вас"
        subtitle="Создавайте и настраивайте AI-агентов под любые задачи. Управляйте ролями и моделями."
      />

      <section className="relative z-10 container pb-28">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground font-mono">{agents.length} агентов · {agents.filter((a) => a.status === 'Активен').length} активных</p>
          <Button onClick={openCreate} className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
            <Icon name="Plus" size={18} className="mr-1" />
            Создать агента
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <div
              key={a.id}
              className="glass rounded-2xl p-6 hover:neon-border transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <Icon name={a.icon} size={24} className="text-neon-purple" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${a.status === 'Активен' ? 'bg-neon-cyan/15 text-neon-cyan' : 'bg-muted text-muted-foreground'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${a.status === 'Активен' ? 'bg-neon-cyan animate-glow-pulse' : 'bg-muted-foreground'}`} />
                    {a.status}
                  </span>
                  <Switch
                    checked={a.status === 'Активен'}
                    onCheckedChange={() => toggleStatus(a.id)}
                    className="scale-75 origin-right"
                  />
                </div>
              </div>

              <h3 className="font-display font-semibold text-xl mb-0.5">{a.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{a.role}</p>
              <p className="text-xs font-mono text-neon-purple/70 mb-3">{a.model} · t={a.temperature}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {a.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-foreground/80">{s}</span>
                ))}
                {a.skills.length === 0 && <span className="text-xs text-muted-foreground italic">Навыки не заданы</span>}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="font-mono text-sm text-muted-foreground">{a.tasks} задач</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDeleteId(a.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors p-1 rounded"
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                  <button
                    onClick={() => openEdit(a)}
                    className="text-sm font-medium text-neon-purple hover:text-neon-blue transition-colors flex items-center gap-1"
                  >
                    Настроить <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Плитка «добавить» */}
          <button
            onClick={openCreate}
            className="glass rounded-2xl p-6 border-2 border-dashed border-border/60 hover:border-neon-purple/50 hover:bg-neon-purple/5 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[220px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
              <Icon name="Plus" size={24} className="text-muted-foreground group-hover:text-neon-purple transition-colors" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Добавить агента</span>
          </button>
        </div>
      </section>

      {/* MODAL: создать / настроить */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => { setShowCreate(false); setEditAgent(null); }} />
          <div className="relative glass neon-border rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => { setShowCreate(false); setEditAgent(null); }}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <span className="font-mono text-xs text-neon-cyan">// {isEdit ? 'НАСТРОЙКА' : 'СОЗДАНИЕ'}</span>
            <h2 className="font-display font-bold text-2xl mt-2 mb-7">
              {isEdit ? `Настройка: ${editAgent!.name}` : 'Новый агент'}
            </h2>

            <div className="space-y-5">
              {/* имя */}
              <div className="space-y-2">
                <Label>Имя агента</Label>
                <Input
                  placeholder="Например: SEO-специалист"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>

              {/* роль */}
              <div className="space-y-2">
                <Label>Роль / описание</Label>
                <Input
                  placeholder="Что делает этот агент?"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="bg-secondary border-border"
                />
              </div>

              {/* иконка */}
              <div className="space-y-2">
                <Label>Иконка</Label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map((ic) => (
                    <button
                      key={ic}
                      onClick={() => setForm((f) => ({ ...f, icon: ic }))}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.icon === ic ? 'bg-neon-purple/30 neon-border' : 'bg-secondary hover:bg-neon-purple/15'}`}
                    >
                      <Icon name={ic} size={18} className={form.icon === ic ? 'text-neon-purple' : 'text-muted-foreground'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* модель */}
              <div className="space-y-2">
                <Label>AI-модель</Label>
                <div className="flex flex-wrap gap-2">
                  {MODELS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setForm((f) => ({ ...f, model: m }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${form.model === m ? 'bg-neon-purple/30 text-neon-purple neon-border' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* температура */}
              <div className="space-y-3">
                <Label className="flex justify-between">
                  <span>Температура (креативность)</span>
                  <span className="font-mono text-neon-cyan">{form.temperature}</span>
                </Label>
                <input
                  type="range" min={0} max={1} step={0.1}
                  value={form.temperature}
                  onChange={(e) => setForm((f) => ({ ...f, temperature: parseFloat(e.target.value) }))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>0 — точно</span>
                  <span>1 — творчески</span>
                </div>
              </div>

              {/* навыки */}
              <div className="space-y-2">
                <Label>Навыки</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Добавить навык..."
                    value={form.skillInput}
                    onChange={(e) => setForm((f) => ({ ...f, skillInput: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-secondary border-border"
                  />
                  <Button onClick={addSkill} variant="outline" className="border-border bg-transparent hover:bg-secondary shrink-0">
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.skills.map((s) => (
                    <span key={s} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-sm">
                      {s}
                      <button onClick={() => removeSkill(s)} className="text-muted-foreground hover:text-red-400 transition-colors">
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              {isEdit && (
                <Button
                  onClick={() => setDeleteId(editAgent!.id)}
                  variant="outline"
                  className="border-red-500/40 text-red-400 hover:bg-red-500/10 bg-transparent rounded-lg"
                >
                  <Icon name="Trash2" size={16} className="mr-1" />
                  Удалить
                </Button>
              )}
              <Button
                onClick={isEdit ? handleSave : handleCreate}
                className="flex-1 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg"
              >
                {isEdit ? 'Сохранить' : 'Создать агента'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative glass neon-border rounded-2xl p-8 w-full max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-5">
              <Icon name="Trash2" size={28} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Удалить агента?</h3>
            <p className="text-muted-foreground text-sm mb-7">Это действие нельзя отменить. Агент и все его данные будут удалены.</p>
            <div className="flex gap-3">
              <Button onClick={() => setDeleteId(null)} variant="outline" className="flex-1 border-border bg-transparent hover:bg-secondary rounded-lg">
                Отмена
              </Button>
              <Button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                Удалить
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
