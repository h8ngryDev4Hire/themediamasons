import { bangers, gudeaBold } from "@ui/fonts";
import Image from "next/image";
import { useContext } from "react";
import { AddonsContext } from "./addons";
export default function AddonBlock(_a) {
    var name = _a.name, description = _a.description, svg = _a.svg;
    var transitionContext = useContext(AddonsContext).transitionContext;
    var transitionState = transitionContext.transitionState;
    return (<div id="addon-block" className={"\n\t\t h-[14rem] w-[14rem] p-[1rem]\n\t\t rounded-xl \n\t\t bg-white bg-opacity-10\n\t\t flex flex-col \n\t\t items-center justify-between\n\t\t text-white text-center\n\t\t trans-ease-all\n\t\t ".concat(transitionState ? "blur scale-50" : "scale-100 blur-none", "\n\t\t")}>	
			<h2 className={"".concat(bangers.className, " text-lg")}>{name}</h2>
			<Image src={svg} height={50} width={50} alt={""} className=""/>
			<span className={"".concat(gudeaBold.className, " text-base")}>{description}</span>
		</div>);
}
