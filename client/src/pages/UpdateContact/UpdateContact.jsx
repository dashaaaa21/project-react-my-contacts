import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateContact } from '../../redux/contactsSlice';
import { contactValidationSchema } from '../../validation/validation';

export default function UpdateContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(state => state.contacts.contacts);
    const contactStatuses = useAppSelector(state => state.contacts.contactStatuses);

    const contact = contacts.find(contact => contact.id === id);

    if (!contact) return <h2 className="p-6 text-xl font-bold">Contact not found</h2>;

    const initialValues = { ...contact };

    const handleSubmit = (values) => {
        if (id) {
            dispatch(updateContact({ id, contact: values }));
            navigate('/');
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-100 flex">
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Update Contact</h1>
                <Formik initialValues={initialValues} validationSchema={contactValidationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 max-w-xl">
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <Field type="text" name="firstName" id="firstName" className="border-b-2 border-gray-300 px-2 py-1 w-full" />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <Field type="text" name="lastName" id="lastName" className="border-b-2 border-gray-300 px-2 py-1 w-full" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <Field type="text" name="phone" id="phone" className="border-b-2 border-gray-300 px-2 py-1 w-full" />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <Field type="text" name="email" id="email" className="border-b-2 border-gray-300 px-2 py-1 w-full" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div>
                                <label htmlFor="gender">Gender</label>
                                <Field as="select" name="gender" id="gender" className="border-b-2 border-gray-300 px-2 py-1 w-full">
                                    <option value="">Select Gender</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div>
                                <label htmlFor="status">Status</label>
                                <Field as="select" name="status" id="status" className="border-b-2 border-gray-300 px-2 py-1 w-full">
                                    <option value="">Select Status</option>
                                    {Object.keys(contactStatuses).map((status, index) => (
                                        <option key={index} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-red-500 text-xs" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Field type="checkbox" name="favorite" id="favorite" className="w-4 h-4" />
                                <label htmlFor="favorite">Mark as Favourite</label>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="bg-lime-400 px-4 py-2 rounded text-black">
                                Save Contact
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
