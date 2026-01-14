import { useAppSelector } from "../../redux/hooks";

export default function Sidebar() {
    const contacts = useAppSelector(state => state.contacts.contacts);
    
    const statusCounts = {
        work: 0,
        family: 0,
        private: 0,
        friends: 0,
        others: 0,
    };
    
    contacts.forEach(contact => {
        const status = contact.status || 'others';
        if (statusCounts[status] !== undefined) {
            statusCounts[status] += 1;
        } else {
            statusCounts.others += 1;
        }
    });

    const totalContacts = contacts.length;

    return (
        <aside className="w-64 text-gray-900 rounded-lg p-4">
            <div className="mb-6">
                <div className="flex justify-between items-center text-lg font-bold uppercase tracking-wide">
                    <span>All contacts</span>
                    <span>{totalContacts}</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center border-l-4 border-lime-500 rounded-lg px-4 py-2">
                    <span>Work</span>
                    <span>{statusCounts.work}</span>
                </div>
                <div className="flex justify-between items-center border-l-4 border-lime-500  rounded-lg px-4 py-2">
                    <span>Family</span>
                    <span>{statusCounts.family}</span>
                </div>
                <div className="flex justify-between items-center border-l-4 border-lime-500  rounded-lg px-4 py-2">
                    <span>Private</span>
                    <span>{statusCounts.private}</span>
                </div>
                <div className="flex justify-between items-center border-l-4 border-lime-500 rounded-lg px-4 py-2">
                    <span>Friends</span>
                    <span>{statusCounts.friends}</span>
                </div>
                <div className="flex justify-between items-center border-l-4 border-lime-500 rounded-lg px-4 py-2">
                    <span>Others</span>
                    <span>{statusCounts.others}</span>
                </div>
            </div>
        </aside>
    );
}
