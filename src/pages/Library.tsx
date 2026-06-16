import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';

const FILTERS = ['Всё', 'Текст', 'Изображения', 'Видео', 'Голос'];
const SORTS = ['Новые', 'Старые', 'По названию'];

type Item = {
  id: number;
  type: string;
  icon: string;
  title: string;
  meta: string;
  date: string;
  dateTs: number;
  color: string;
  preview: string;
  favorite: boolean;
};

const INITIAL: Item[] = [
  { id: 1, type: 'Текст', icon: 'Type', title: 'Лендинг для SaaS-стартапа', meta: '2 380 слов', date: '14 июн', dateTs: 20240614, color: '220 100% 62%', preview: 'Добро пожаловать в будущее продуктивности. Наш SaaS-сервис помогает командам работать быстрее, умнее и без лишней суеты. Попробуйте бесплатно — никаких кредиток.', favorite: false },
  { id: 2, type: 'Изображения', icon: 'Image', title: 'Серия концепт-артов «Неон»', meta: '12 файлов', date: '13 июн', dateTs: 20240613, color: '270 95% 65%', preview: '12 изображений в стиле киберпанк с неоновыми акцентами. Разрешение 2048×2048, форматы PNG и WebP.', favorite: true },
  { id: 3, type: 'Видео', icon: 'Clapperboard', title: 'Промо-ролик продукта', meta: '0:42 · 1080p', date: '12 июн', dateTs: 20240612, color: '185 100% 55%', preview: 'Промо-ролик длительностью 42 секунды. Разрешение 1920×1080, 60fps. Включает анимированный логотип и CTA.', favorite: false },
  { id: 4, type: 'Голос', icon: 'AudioLines', title: 'Озвучка подкаста, эп. 7', meta: '18:05 · RU', date: '11 июн', dateTs: 20240611, color: '320 90% 65%', preview: 'Эпизод 7: «Будущее AI в бизнесе». Голос: Алексей (нейронный). Язык: русский. Длительность: 18 минут 5 секунд.', favorite: true },
  { id: 5, type: 'Текст', icon: 'Type', title: 'Email-цепочка для воронки', meta: '5 писем', date: '10 июн', dateTs: 20240610, color: '220 100% 62%', preview: 'Письмо 1: Приветствие и оффер. Письмо 2: Польза и кейсы. Письмо 3: Социальное доказательство. Письмо 4: Дедлайн. Письмо 5: Последний шанс.', favorite: false },
  { id: 6, type: 'Изображения', icon: 'Image', title: 'Иконки для мобильного app', meta: '24 файла', date: '09 июн', dateTs: 20240609, color: '270 95% 65%', preview: '24 иконки в стиле flat design. Форматы SVG и PNG (32px, 64px, 128px). Цветовая палитра: фиолетово-синяя.', favorite: false },
  { id: 7, type: 'Видео', icon: 'Clapperboard', title: 'Анимация логотипа', meta: '0:08 · 4K', date: '08 июн', dateTs: 20240608, color: '185 100% 55%', preview: 'Анимация логотипа: появление с эффектом свечения. 8 секунд, 4K UHD, прозрачный фон (PNG-sequence + MP4).', favorite: false },
  { id: 8, type: 'Голос', icon: 'AudioLines', title: 'Голосовой ассистент бота', meta: '32 фразы', date: '07 июн', dateTs: 20240607, color: '320 90% 65%', preview: '32 фразы для голосового бота. Приветствие, уточняющие вопросы, ответы на FAQ и прощание. Голос: Мария (нейронный).', favorite: true },
];

const TYPE_COLOR: Record<string, string> = {
  Текст: '220 100% 62%',
  Изображения: '270 95% 65%',
  Видео: '185 100% 55%',
  Голос: '320 90% 65%',
};

export default function Library() {
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [filter, setFilter] = useState('Всё');
  const [sort, setSort] = useState('Новые');
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState<Item | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [favOnly, setFavOnly] = useState(false);

  const toggleFav = (id: number) =>
    setItems((list) => list.map((x) => x.id === id ? { ...x, favorite: !x.favorite } : x));

  const handleDelete = (id: number) => {
    setItems((list) => list.filter((x) => x.id !== id));
    setDeleteId(null);
    if (preview?.id === id) setPreview(null);
  };

  const shown = useMemo(() => {
    let list = [...items];
    if (filter !== 'Всё') list = list.filter((x) => x.type === filter);
    if (favOnly) list = list.filter((x) => x.favorite);
    if (search.trim()) list = list.filter((x) => x.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'Новые') list.sort((a, b) => b.dateTs - a.dateTs);
    if (sort === 'Старые') list.sort((a, b) => a.dateTs - b.dateTs);
    if (sort === 'По названию') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [items, filter, favOnly, search, sort]);

  return (
    <Layout>
      <PageHeader
        tag="БИБЛИОТЕКА"
        title="Всё созданное в одном месте"
        subtitle="История генераций по всем типам контента. Ищите, фильтруйте и переиспользуйте результаты."
      />

      <section className="relative z-10 container pb-28">

        {/* toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {SORTS.map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${sort === s ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => setFavOnly((v) => !v)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${favOnly ? 'bg-yellow-500/20 text-yellow-400' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Star" size={15} />
              Избранное
            </button>
            <div className="flex rounded-lg overflow-hidden border border-border">
              <button onClick={() => setView('grid')} className={`px-3 py-2 transition-colors ${view === 'grid' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}>
                <Icon name="LayoutGrid" size={16} />
              </button>
              <button onClick={() => setView('list')} className={`px-3 py-2 transition-colors ${view === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}>
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* type filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white' : 'glass text-muted-foreground hover:text-foreground'}`}
            >
              {f}
              <span className="ml-2 font-mono text-xs opacity-60">
                {f === 'Всё' ? items.length : items.filter((x) => x.type === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* empty */}
        {shown.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="FolderOpen" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Ничего не найдено</p>
            <p className="text-sm mt-1">Попробуйте изменить фильтр или поисковой запрос</p>
          </div>
        )}

        {/* grid */}
        {view === 'grid' && shown.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shown.map((item, i) => (
              <div
                key={item.id}
                className="group glass rounded-2xl p-5 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
              >
                <div
                  onClick={() => setPreview(item)}
                  className="w-full h-28 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-[1.03]"
                  style={{ background: `linear-gradient(135deg, hsl(${item.color} / 0.2), hsl(${item.color} / 0.05))` }}
                >
                  <Icon name={item.icon} size={32} style={{ color: `hsl(${item.color})` }} />
                </div>
                <div className="flex items-start justify-between mb-1">
                  <span className="font-mono text-xs" style={{ color: `hsl(${item.color})` }}>{item.type}</span>
                  <button
                    onClick={() => toggleFav(item.id)}
                    className={`transition-colors ${item.favorite ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`}
                  >
                    <Icon name={item.favorite ? 'Star' : 'Star'} size={14} />
                  </button>
                </div>
                <h3 className="font-medium mb-2 leading-snug line-clamp-2 cursor-pointer hover:text-neon-purple transition-colors" onClick={() => setPreview(item)}>{item.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.meta}</span>
                  <span>{item.date}</span>
                </div>
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setPreview(item)} className="flex-1 py-1.5 rounded-lg bg-secondary text-xs font-medium hover:bg-neon-purple/20 transition-colors text-center">
                    Открыть
                  </button>
                  <button onClick={() => setDeleteId(item.id)} className="px-2.5 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Icon name="Trash2" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* list */}
        {view === 'list' && shown.length > 0 && (
          <div className="space-y-3">
            {shown.map((item, i) => (
              <div
                key={item.id}
                className="glass rounded-xl px-5 py-4 flex items-center gap-4 hover:neon-border transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${i * 0.03}s`, opacity: 0 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `hsl(${item.color} / 0.15)` }}
                >
                  <Icon name={item.icon} size={20} style={{ color: `hsl(${item.color})` }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate cursor-pointer hover:text-neon-purple transition-colors" onClick={() => setPreview(item)}>{item.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                    <span style={{ color: `hsl(${item.color})` }} className="font-mono">{item.type}</span>
                    <span>{item.meta}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleFav(item.id)} className={`transition-colors ${item.favorite ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`}>
                    <Icon name="Star" size={16} />
                  </button>
                  <Button onClick={() => setPreview(item)} variant="outline" className="border-border bg-transparent hover:bg-secondary text-xs h-8 px-3 rounded-lg">
                    Открыть
                  </Button>
                  <button onClick={() => setDeleteId(item.id)} className="text-muted-foreground hover:text-red-400 transition-colors p-1">
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="relative glass neon-border rounded-3xl p-8 w-full max-w-lg animate-fade-in">
            <button onClick={() => setPreview(null)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="X" size={20} />
            </button>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: `hsl(${preview.color} / 0.15)`, boxShadow: `0 0 30px -8px hsl(${preview.color} / 0.6)` }}
            >
              <Icon name={preview.icon} size={28} style={{ color: `hsl(${preview.color})` }} />
            </div>
            <span className="font-mono text-xs" style={{ color: `hsl(${preview.color})` }}>{preview.type}</span>
            <h2 className="font-display font-bold text-2xl mt-1 mb-2">{preview.title}</h2>
            <div className="flex gap-3 text-xs text-muted-foreground mb-5 font-mono">
              <span>{preview.meta}</span>
              <span>·</span>
              <span>{preview.date}</span>
            </div>
            <div className="bg-secondary rounded-xl p-4 text-sm text-foreground/80 leading-relaxed mb-6">
              {preview.preview}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => toggleFav(preview.id)}
                variant="outline"
                className={`border-border bg-transparent rounded-lg gap-2 ${preview.favorite ? 'text-yellow-400 border-yellow-400/40' : 'hover:bg-secondary'}`}
              >
                <Icon name="Star" size={16} />
                {preview.favorite ? 'В избранном' : 'В избранное'}
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg gap-2">
                <Icon name="Download" size={16} />
                Скачать
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative glass neon-border rounded-2xl p-8 w-full max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-5">
              <Icon name="Trash2" size={28} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">Удалить файл?</h3>
            <p className="text-muted-foreground text-sm mb-7">Этот файл будет удалён из библиотеки. Действие нельзя отменить.</p>
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
