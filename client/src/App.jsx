import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './redux/store';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { fetchContacts, fetchStatuses } from './redux/contactsSlice';

import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Header from './components/Header/Header';
import ContactsStatuses from './pages/ContactsStatuses/ContactsStatuses';
import AddContactStatus from './pages/AddContactStatus/AddContactStatus';
import EditContactStatus from './pages/EditContactStatus/EditContactStatus';

function AppContent() {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (auth.user) {
            dispatch(fetchContacts());
            dispatch(fetchStatuses());
        }
    }, [auth.user, dispatch]);

    const routes = auth.user ? (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/new-contact" element={<NewContact />} />
                <Route path="/update-contact/:id" element={<UpdateContact />} />
                <Route path="/contact-statuses" element={<ContactsStatuses />} />
                <Route path="/contact-statuses/add-contact-status" element={<AddContactStatus />} />
                <Route path="/contact-statuses/edit-contact-status/:statusName" element={<EditContactStatus />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    ) : (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Welcome />} />
        </Routes>
    );

    return <Router>{routes}</Router>;
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;
