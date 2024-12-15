import { bangers } from "@ui/fonts";
import { useState } from "react";
export default function NewsletterInvite() {
    var _a = useState(''), email = _a[0], setEmail = _a[1];
    var handleInputChange = function (event) {
        setEmail(event.target.value);
    };
    return (<div id="newsletter-invite" className={"\n\t\t\tflex flex-col \n\t\t\tspace-y-[1rem]\n\t\t\tw-full md:h-[50%] h-[75%]\n\t\t"}>
			<input id="email-input" type="email" name="email" placeholder="your@email.com" onChange={handleInputChange} value={email} required className={"\n\t\t\t\ttrans-ease-all\n\t\t\t\trounded-xl py-1 px-3 bg-opacity-30 bg-white\t\n\t\t\t\ttext-white border-transparent border-2 \n\t\t\t\tfocus:border-purple-400 focus:outline-none\n\t\t\t\tmd:scale-100 scale-[.85] md:ml-0 ml-auto\n\t\t\t"}/>
			
			<button id="submit-btn" className={"\n\t\t\t\ttext-white text-opacity-85\n\t\t\t\trounded-xl bg-zinc-400 flex-grow\n\t\t\t\tp-2 w-[50%] ml-auto\n\t\t\t\tmd:scale-100 scale-[.85]\n\t\t\t\t".concat(bangers.className, "\n\t\t\t")}>Sign Me Up!</button>
		</div>);
}
