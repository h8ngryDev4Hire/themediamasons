interface Params {
	size: number
}

export default function Transitioner( { size } : Params ) {


	return (
		<>
			<div id="transition"  style={ {height: size / 2 + "rem"} } className="relative flex min-w-full bg-gradient-to-t from-black to-transparent"/>
			<div id="transition" style={ {height: size / 2 + "rem"} } className="relative flex min-w-full bg-gradient-to-b from-black to-transparent"/>

		</>
	)
}
