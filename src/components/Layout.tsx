import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = [
  { label: 'Генератор', path: '/' },
  { label: 'Агенты', path: '/agents' },
  { label: 'Библиотека', path: '/library' },
  { label: 'Интеграции', path: '/integrations' },
  { label: 'Настройки', path: '/settings' },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-neon-purple/20 blur-[120px] animate-glow-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-neon-blue/20 blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      </div>

      <header className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue flex items-center justify-center neon-border">
              <Icon name="BrainCircuit" size={20} className="text-white" />
            </div>
            <span className="font-display font-semibold text-xl tracking-wide">
              SUPER<span className="text-gradient">MIND</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.path
                    ? 'text-foreground bg-secondary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 text-white font-semibold rounded-lg">
            Войти
          </Button>
        </div>
      </header>

      {children}

      <footer className="relative z-10 border-t border-border/60">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-blue flex items-center justify-center">
              <Icon name="BrainCircuit" size={16} className="text-white" />
            </div>
            <span className="font-display font-semibold tracking-wide">SUPERMIND AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">© 2026 SuperMind AI. Создано для будущего.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
