import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { removeContact } from "../../redux/contactsSlice";

export default function ContactItem() {
    const contacts = useAppSelector(state => state.contacts.contacts);
    const search = useAppSelector(state => state.contacts.search);
    const dispatch = useAppDispatch();
    
    const searchText = search ? search.toLowerCase() : '';
    
    const filteredContacts = contacts.filter(contact =>
        (contact.firstName && contact.firstName.toLowerCase().includes(searchText)) ||
        (contact.lastName && contact.lastName.toLowerCase().includes(searchText)) ||
        (contact.email && contact.email.toLowerCase().includes(searchText)) ||
        (contact.phone && contact.phone.toLowerCase().includes(searchText)) ||
        (contact.status && contact.status.toLowerCase().includes(searchText))
    );

    const handleDelete = (contactId) => {
        if (window.confirm('You sure?')) {
            dispatch(removeContact(contactId));
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-xs sm:text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">#</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Avatar</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">First Name</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Last Name</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {filteredContacts.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="px-2 sm:px-6 py-4 text-center text-gray-500">
                            No contacts found
                        </td>
                    </tr>
                ) : (
                    filteredContacts.map((contact, index) => (
                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                            <th scope="row" className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900 font-medium">{index + 1}</th>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                <img
                                    src={`https://randomuser.me/api/portraits/${contact.gender === 'women' ? 'women' : 'men'}/${contact.avatar}.jpg`}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900">{contact.firstName}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-900">{contact.lastName}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.email}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.phone}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-600">{contact.status}</td>
                            <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                <div className="flex gap-1 sm:gap-2">
                                    <Link to={`/update-contact/${contact.id}`}>
                                        <button className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(contact.id)}
                                        className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
