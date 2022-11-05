import Link from "next/link";
import {auth} from '../utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import ReactTooltip from 'react-tooltip';

export default function Nav() {
const [user, loading] = useAuthState(auth);
console.log(user);
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-lg">My Blog</button>
            </Link>
            <ul className="flex items-center gap-10">
            {!user && (
                <Link legacyBehavior href={"/auth/login"}>
                <a className="hover:bg-cyan-400 py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg ml-8">Join Now</a>
                </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href="/post">
                            <button className="hover:bg-cyan-400 bg-cyan-500 text-white py-2 px-4 rounded-lg text-sm">Post</button>
                        </Link>
                        <Link data-tip="Dashboard" href="/dashboard">
                        <img
                        className="w-12 rounded-full cursor-pointer hover:-translate-y-1 duration-300" 
                        src={user.photoURL} alt="User Photo" />
                        </Link>
                        <ReactTooltip effect="solid" />
                    </div>
                )}
            </ul>
        </nav>
    )
}