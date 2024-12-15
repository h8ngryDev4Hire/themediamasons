export default function Transitioner(_a) {
    var size = _a.size;
    return (<>
			<div id="transition" style={{ height: size / 2 + "rem" }} className="relative flex min-w-full bg-gradient-to-t from-black to-transparent w-screen pointer-events-none"/>
			<div id="transition" style={{ height: size / 2 + "rem" }} className="relative flex min-w-full bg-gradient-to-b from-black to-transparent w-screen pointer-events-none"/>

		</>);
}
