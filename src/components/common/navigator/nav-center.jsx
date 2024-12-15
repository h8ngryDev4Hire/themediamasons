import AppTitle from '@components/common/app-title/app-title.tsx';
import Link from 'next/link';
export default function NavCenter() {
    return (<main id="navigator-main" className=" flex h-full w-full items-center justify-center">
			<Link href={'/'}>
			<AppTitle />
			</Link>
		</main>);
}
