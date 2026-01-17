import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { removeStatus } from '../../redux/contactsSlice';

export default function ContactsStatuses() {
    const contactStatuses = useAppSelector(state => state.contacts.contactStatuses);
    const loading = useAppSelector(state => state.contacts.loading);
    const dispatch = useAppDispatch();

    if (loading) {
        return <div className="p-6 text-xl">Loading statuses...</div>;
    }

    const statusKeys = Object.keys(contactStatuses);
    
    if (statusKeys.length === 0) {
        return <div className="p-6 text-xl">No statuses found. Please refresh the page.</div>;
    }

    return (
        <main className="relative w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-16 bg-white border-r-2 border-gray-300 items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">CONTACT STATUSES</span>
                </div>
            </div>

            <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-black">Contact Statuses</h1>
                        <Link 
                            to="/contact-statuses/add-contact-status" 
                            className="bg-lime-400 text-black px-6 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-lime-500 transition-colors"
                        >
                            ADD STATUS
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                    <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">Color</th>
                                    <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">Count</th>
                                    <th className="px-6 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Object.keys(contactStatuses).map((status, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-center text-gray-900 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 text-center text-gray-900 capitalize font-semibold">{status}</td>
                                        <td 
                                            className="px-6 py-4 text-center text-white font-semibold"
                                            style={{ backgroundColor: contactStatuses[status].bg }}
                                        >
                                            {contactStatuses[status].bg}
                                        </td>
                                        <td className="px-6 py-4 text-center text-gray-900">{contactStatuses[status].count}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <Link to={`/contact-statuses/edit-contact-status/${status}`}>
                                                    <button className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors">
                                                        Edit
                                                    </button>
                                                </Link>
                                                {status !== 'others' && (
                                                    <button 
                                                        onClick={() => {
                                                            if(window.confirm(`Delete status "${status}"?`)) {
                                                                const statusId = contactStatuses[status].id;
                                                                dispatch(removeStatus({ id: statusId, statusName: status }));
                                                            }
                                                        }}
                                                        className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8">
                        <Link 
                            to="/" 
                            className="inline-block bg-lime-400 text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-lime-500 transition-colors"
                        >
                            BACK
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex w-16 bg-white border-l-2 border-gray-300 items-center justify-center">
                <div className="transform rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">BY DARIA TKACHENKO</span>
                </div>
            </div>
        </main>
    );
}
