const PageHeader = ({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) => (
  <div className="relative z-10 container pt-16 pb-10 text-center max-w-3xl mx-auto animate-fade-in">
    <span className="font-mono text-sm text-neon-cyan">// {tag}</span>
    <h1 className="font-display font-bold text-4xl md:text-6xl mt-3 mb-5 leading-tight">
      {title}
    </h1>
    <p className="text-lg text-muted-foreground">{subtitle}</p>
  </div>
);

export default PageHeader;
