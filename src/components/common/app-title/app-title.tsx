import { bangers } from '@ui/fonts.ts'

interface Params {
  animated?: boolean	
}

const APP_TITLE = "The Media Masons"

export default function AppTitle({ animated = false }: Params): JSX.Element {
  return (
    <h1 id="app-title" className={`${bangers.className} text-white text-center text-3xl ${animated ? 'flex' : ''}`}>
      {animated ? (
        APP_TITLE.split('').map((char, index) => {
          if (char === ' ') return <div key={index} className="px-1" />;

          return (
            <span 
              key={index}
              className="inline-block animate-bounce ease-in-out"
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: '1.2s' }}
            >
              {char}
            </span>
          );
        })
      ) : (
        <span>{APP_TITLE}</span>
      )}
    </h1>
  );
}
