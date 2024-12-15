import { bangers } from '@ui/fonts.ts';
var APP_TITLE = "The Media Masons";
export default function AppTitle(_a) {
    var _b = _a.animated, animated = _b === void 0 ? false : _b;
    return (<h1 id="app-title" className={"".concat(bangers.className, " text-white text-center text-3xl ").concat(animated ? 'flex' : '')}>
      {animated ? (APP_TITLE.split('').map(function (char, index) {
            if (char === ' ')
                return <div key={index} className="px-1"/>;
            return (<span key={index} className="inline-block animate-bounce ease-in-out" style={{ animationDelay: "".concat(index * 0.1, "s"), animationDuration: '1.2s' }}>
              {char}
            </span>);
        })) : (<span>{APP_TITLE}</span>)}
    </h1>);
}
