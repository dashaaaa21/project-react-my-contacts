import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateStatus } from '../../redux/contactsSlice';
import { statusValidationSchema } from '../../validation/validation'

export default function EditContactStatus() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { statusName } = useParams();
    const contactStatuses = useAppSelector(state => state.contacts.contactStatuses);

    const status = statusName ? contactStatuses[statusName] : null;

    if (!status || !statusName) {
        return null;
    }

    const initialValues = {
        statusName: statusName,
        bg: status.bg,
    };

    const handleSubmit = async (values) => {
        const statusId = status.id;
        await dispatch(updateStatus({ 
            id: statusId,
            oldStatusName: statusName,
            statusName: values.statusName.toLowerCase(), 
            bg: values.bg 
        }));
        navigate('/contact-statuses');
    };

    return (
        <main className="relative w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-16 bg-white border-r-2 border-gray-300 items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">EDIT STATUS</span>
                </div>
            </div>

            <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">Edit Status</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={statusValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div className="my-4">
                                    <label htmlFor="statusName" className="text-black font-semibold mb-2 text-sm uppercase tracking-wide block">
                                        Status Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="statusName"
                                        id="statusName"
                                        className="w-full border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-lg focus:outline-none transition-colors bg-white text-black"
                                        placeholder="Enter status name"
                                    />
                                    <ErrorMessage name="statusName" component="p" className="text-red-500 text-xs mt-1 absolute" />
                                </div>

                                <div className="my-4">
                                    <label htmlFor="bg" className="text-black font-semibold mb-2 text-sm uppercase tracking-wide block">
                                        Color
                                    </label>
                                    <Field
                                        type="color"
                                        name="bg"
                                        id="bg"
                                        className="w-full h-12 border-2 border-gray-300 rounded cursor-pointer mx-1 text-lg"
                                    />
                                    <ErrorMessage name="bg" component="p" className="text-red-500 text-xs mt-1 absolute" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-block bg-lime-400 text-black px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-lime-500 transition-colors"
                                >
                                    SAVE
                                </button>

                            </Form>
                        )}
                    </Formik>
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
