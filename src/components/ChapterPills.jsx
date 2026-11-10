export default function ChapterPills({ chapters, activeIndex, onSelect, className = '' }) {
  return (
    <nav aria-label="Capítulos de la trayectoria" className={`chapter-pills ${className}`}>
      <div className="chapter-pills__track">
        <span
          className="chapter-pills__highlight"
          aria-hidden="true"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {chapters.map((chapter, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={chapter.index}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={active ? 'step' : undefined}
              aria-controls={`chapter-${chapter.index}`}
              className="chapter-pills__button"
              data-active={active ? 'true' : 'false'}
            >
              <span className="chapter-pills__index">{chapter.index}</span>
              <span className="chapter-pills__label">{chapter.short}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
