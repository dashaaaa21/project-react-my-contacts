import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/authSlice';
import { getUserFirstLetterForAvatar, getUserNameForGreeting } from '../../utils/userUtils';

export default function Header() {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const user = auth.user;
    
    return (
        <header className="w-full bg-black text-white">
            <div className="py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                <div className="flex items-center gap-3">
                    <img src="/logo.svg" alt="Logo" className="w-12" />
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-sm">
                                    {getUserFirstLetterForAvatar(user)}
                                </span>
                            </div>
                            <div className="text-sm text-lime-200">
                                <div className="font-semibold">Hello, {getUserNameForGreeting(user)}!</div>
                            </div>
                        </div>
                    )}
                </div>

                <nav className="flex flex-wrap items-center gap-4 md:gap-10 text-gray-300 justify-center">
                    <Link to="/" className="text-white hover:text-white transition">Contact List</Link>
                    <Link to="/new-contact" className="hover:text-white transition">New Contact</Link>
                    <Link to="/contact-statuses" className="hover:text-white transition">Statuses</Link>
                </nav>

                <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                    {user ? (
                        <button
                            onClick={() => dispatch(logoutUser())}
                            className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-red-400 transition">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="bg-lime-300 text-black px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-200 transition">
                                Sign in
                            </Link>
                            <Link to="/register" className="bg-lime-900 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-600 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </div>

            <div className="w-full h-px bg-white/20"></div>
        </header>
    );
}
