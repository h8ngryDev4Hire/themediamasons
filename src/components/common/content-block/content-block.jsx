import { gudeaThin } from '@ui/fonts.ts';
export default function ContentBlock(_a) {
    var title = _a.title, description = _a.description, media = _a.media, _b = _a.reverse, reverse = _b === void 0 ? false : _b;
    return (<div id="content-block" className={"\n\t\t\tflex  flex-col md:space-x-5 space-y-5\n\t\t\t".concat(reverse ? "md:flex-row-reverse" : "md:flex-row ", " w-full   p-3\n\t\t")}>
			<section id="text-content" className="trans-ease-all bg-white bg-opacity-10 rounded-lg p-10 space-y-5">
				<h2 id="content-title" className={"".concat(gudeaThin.className, " text-white text-2xl")}>
				{title}
				</h2>
				<p id="content-description" className="text-white text-[1rem] leading-[2rem]">
				{description}
				</p>
			</section>	
			<section id="media-content" className="flex items-center justify-center">
				{media}
			</section>
		</div>);
}
