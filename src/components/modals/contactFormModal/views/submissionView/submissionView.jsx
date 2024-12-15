import { bangers, gudeaBold } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { ContactFormModalContext, exitModalContext } from "../../contactFormModal";
export default function SubmissionView() {
    var content = useContext(ContactFormModalContext).content;
    var contentState = content[0], setContentState = content[1];
    var exitModal = useContext(exitModalContext);
    return (<div id="submission-view" className={"\n\t\t flex flex-col items-center justify-start\n\t\t w-full h-full p-[2rem]\n\t\t space-y-[2rem] trans-ease-all\n\t\t ".concat(contentState ? "" : "opacity-0", "\n\t\t")}>
			<h1 id="title" className={"\n\t\t\t w-full h-[3rem] \n\t\t\t text-3xl text-start\n\t\t\t ".concat(bangers.className, "\n\t\t\t")}>
			 {"Thank you!"}
			</h1>
			<section id="logo" className={"\n\t\t\t w-[30%] h-[30%]\n\t\t\t flex items-center justify-center\n\t\t\t"}>
				<Image width={50} height={50} src={"/svg/smiling-macintosh.svg"} alt={""} className={"\n\t\t\t\t opacity-80 w-full h-full\n\t\t\t\t"}/>
			</section>
			<span id="message" className={"\n\t\t\t ".concat(gudeaBold.className, " \n\t\t\t text-xl text-center w-[50%]\n\t\t\t")}>{"\n\t\t\t\tWe will be in contact with you shortly!\n\t\t\t\tIn the meantime, check out the services \n\t\t\t\twe offer!\n\t\t\t"}</span>
			<button id="finish-btn" onClick={exitModal} className={"\n\t\t\t h-[4rem] w-[8rem] \n\t\t\t rounded-xl p-1\n\t\t\t bg-zinc-600 text-2xl\n\t\t\t trans-ease-all\n\t\t\t ".concat(bangers.className, "\n\t\t\t hover:bg-orange-400\n\t\t\t hover:scale-75\n\t\t\t")}>
				Finish
			</button>
		</div>);
}
