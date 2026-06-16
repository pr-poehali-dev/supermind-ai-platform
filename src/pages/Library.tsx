import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

const FILTERS = ['Всё', 'Текст', 'Изображения', 'Видео', 'Голос'];

const ITEMS = [
  { type: 'Текст', icon: 'Type', title: 'Лендинг для SaaS-стартапа', meta: '2 380 слов', date: '14 июн', color: '220 100% 62%' },
  { type: 'Изображения', icon: 'Image', title: 'Серия концепт-артов «Неон»', meta: '12 файлов', date: '13 июн', color: '270 95% 65%' },
  { type: 'Видео', icon: 'Clapperboard', title: 'Промо-ролик продукта', meta: '0:42 · 1080p', date: '12 июн', color: '185 100% 55%' },
  { type: 'Голос', icon: 'AudioLines', title: 'Озвучка подкаста, эп. 7', meta: '18:05 · RU', date: '11 июн', color: '320 90% 65%' },
  { type: 'Текст', icon: 'Type', title: 'Email-цепочка для воронки', meta: '5 писем', date: '10 июн', color: '220 100% 62%' },
  { type: 'Изображения', icon: 'Image', title: 'Иконки для мобильного app', meta: '24 файла', date: '09 июн', color: '270 95% 65%' },
  { type: 'Видео', icon: 'Clapperboard', title: 'Анимация логотипа', meta: '0:08 · 4K', date: '08 июн', color: '185 100% 55%' },
  { type: 'Голос', icon: 'AudioLines', title: 'Голосовой ассистент бота', meta: '32 фразы', date: '07 июн', color: '320 90% 65%' },
];

const Library = () => {
  const [filter, setFilter] = useState('Всё');
  const shown = filter === 'Всё' ? ITEMS : ITEMS.filter((i) => i.type === filter);

  return (
    <Layout>
      <PageHeader
        tag="БИБЛИОТЕКА"
        title="Всё созданное в одном месте"
        subtitle="История генераций по всем типам контента. Ищите, фильтруйте и переиспользуйте результаты."
      />

      <section className="relative z-10 container pb-28">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white' : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {shown.map((item, i) => (
            <div
              key={item.title}
              className="group glass rounded-2xl p-5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
            >
              <div
                className="w-full h-28 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-[1.03]"
                style={{ background: `linear-gradient(135deg, hsl(${item.color} / 0.2), hsl(${item.color} / 0.05))` }}
              >
                <Icon name={item.icon} size={32} style={{ color: `hsl(${item.color})` }} />
              </div>
              <span className="font-mono text-xs" style={{ color: `hsl(${item.color})` }}>{item.type}</span>
              <h3 className="font-medium mt-1 mb-2 leading-snug">{item.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.meta}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Library;
