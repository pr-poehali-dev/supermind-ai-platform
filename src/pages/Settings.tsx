import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

const TOGGLES = [
  { id: 'email', title: 'Email-уведомления', desc: 'Сводки по генерациям раз в день', on: true },
  { id: 'beta', title: 'Бета-функции', desc: 'Ранний доступ к новым моделям', on: false },
  { id: 'history', title: 'История генераций', desc: 'Сохранять результаты в библиотеке', on: true },
  { id: 'team', title: 'Командный доступ', desc: 'Разрешить участникам видеть проекты', on: false },
];

const Settings = () => {
  const [toggles, setToggles] = useState(TOGGLES);
  const flip = (id: string) =>
    setToggles((t) => t.map((x) => (x.id === id ? { ...x, on: !x.on } : x)));

  return (
    <Layout>
      <PageHeader
        tag="НАСТРОЙКИ"
        title="Управление аккаунтом"
        subtitle="Профиль, тарифы, уведомления и параметры безопасности вашего рабочего пространства."
      />

      <section className="relative z-10 container pb-28 max-w-3xl space-y-6">
        {/* профиль */}
        <div className="glass rounded-2xl p-7 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="User" size={20} className="text-neon-purple" />
            <h2 className="font-display font-semibold text-xl">Профиль</h2>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue flex items-center justify-center neon-border">
              <span className="font-display font-bold text-2xl text-white">SM</span>
            </div>
            <Button variant="outline" className="border-border bg-transparent hover:bg-secondary rounded-lg">
              Сменить аватар
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input defaultValue="Иван Космонавтов" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="captain@supermind.ai" className="bg-secondary border-border" />
            </div>
          </div>
        </div>

        {/* тариф */}
        <div className="glass rounded-2xl p-7 animate-fade-in" style={{ animationDelay: '0.06s', opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Crown" size={20} className="text-neon-cyan" />
            <h2 className="font-display font-semibold text-xl">Тариф</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-secondary">
            <div>
              <p className="font-semibold text-lg">Pro <span className="text-gradient">·</span> 10 000 генераций/мес</p>
              <p className="text-sm text-muted-foreground mt-1">Использовано 6 420 из 10 000</p>
              <div className="w-full sm:w-64 h-2 rounded-full bg-background mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg shrink-0">
              Улучшить план
            </Button>
          </div>
        </div>

        {/* предпочтения */}
        <div className="glass rounded-2xl p-7 animate-fade-in" style={{ animationDelay: '0.12s', opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <Icon name="SlidersHorizontal" size={20} className="text-neon-purple" />
            <h2 className="font-display font-semibold text-xl">Предпочтения</h2>
          </div>
          <div className="divide-y divide-border/60">
            {toggles.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
                <Switch checked={t.on} onCheckedChange={() => flip(t.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg px-8">
            Сохранить изменения
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Settings;
