import {
  PhpIcon, LaravelIcon, PythonIcon, FastapiIcon, JavascriptIcon,
  MysqlIcon, PostgresqlIcon, SqliteIcon, ExcelIcon, PowerBiIcon,
  CssIcon, TailwindIcon, ReactIcon, GitIcon,
} from '../icons/TechIcons'

const icons = {
  PHP: PhpIcon,
  Laravel: LaravelIcon,
  Python: PythonIcon,
  FastAPI: FastapiIcon,
  JavaScript: JavascriptIcon,
  MySQL: MysqlIcon,
  PostgreSQL: PostgresqlIcon,
  SQLite: SqliteIcon,
  Excel: ExcelIcon,
  'Power BI': PowerBiIcon,
  CSS: CssIcon,
  'Tailwind CSS': TailwindIcon,
  React: ReactIcon,
  Git: GitIcon,
}

const techs = [
  { name: 'PHP', color: '#8892BF' },
  { name: 'Laravel', color: '#FF2D20' },
  { name: 'Python', color: '#3776AB' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'SQLite', color: '#003B57' },
  { name: 'Excel', color: '#217346' },
  { name: 'Power BI', color: '#F2C811' },
  { name: 'CSS', color: '#1572B6' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Git', color: '#F05032' },
]

const duplicated = [...techs, ...techs]

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden select-none">
      <div className="relative flex items-center">
        <div className="flex gap-10 sm:gap-14 animate-marquee py-2">
          {duplicated.map((tech, i) => {
            const Icon = icons[tech.name]
            return (
              <span
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2.5 text-[11px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap flex-shrink-0"
                style={{ color: 'var(--color-outline)', fontFamily: 'Inter, sans-serif' }}
              >
                {Icon && <Icon size={15} />}
                {tech.name}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
