import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createContact } from '../../redux/contactsSlice';
import { contactValidationSchema } from '../../validation/validation';

export default function NewContact() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const contactStatuses = useAppSelector(state => state.contacts.contactStatuses);

    const initialValues = {
        id: uuidv4(),
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        avatar: Math.floor(Math.random() * 99) + 1,
        gender: 'men',
        status: '',
        favorite: false,
    };

    const handleSubmit = (value) => {
        dispatch(createContact(value));
        navigate('/');
    };

    return (
        <main className="relative w-full min-h-screen bg-gray-100 flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-16 bg-white border-r-2 border-gray-300 items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                    <span className="text-xs font-semibold tracking-widest text-gray-400">NEW CONTACT</span>
                </div>
            </div>

            <div className="flex-1 bg-white flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 p-6 sm:p-8 lg:p-12 flex flex-col justify-start border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6 lg:mb-8 leading-tight">
                       MY NEW CONTACT<br/>3 TIPS
                    </h1>

                    <div className="flex items-center gap-2 mb-4 sm:mb-8">
                        <img src="/addcontact.svg" alt="Logo" className="w-15 sm:w-30 lg:20" />
                    </div>

                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        <div className="border-l-4 border-lime-400 pl-3 sm:pl-4">
                            <h2 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 uppercase tracking-wide">Keep details simple
                            </h2>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                Write the name clearly and add only the info you really need.  </p>
                        </div>

                        <div className="border-l-4 border-lime-400 pl-3 sm:pl-4">
                            <h2 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 uppercase tracking-wide">Add a short note</h2>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                Mention what book they like or where you know them from. It helps you remember later. </p>
                        </div>

                        <div className="border-l-4 border-lime-400 pl-3 sm:pl-4">
                            <h2 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 uppercase tracking-wide">Update when needed</h2>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                If contact changes, edit it so your list stays fresh and organized.    </p>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-2/3 p-6 sm:p-8 lg:p-12 overflow-y-auto">

                    <Formik
                        initialValues={initialValues}
                        validationSchema={contactValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4 sm:space-y-6 max-w-2xl">
                                <div className="flex flex-col h-20">
                                    <label htmlFor="firstName" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex flex-col h-20">
                                    <label htmlFor="lastName" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex-col h-20">
                                    <label htmlFor="phone" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        Phone
                                    </label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex flex-col h-20">
                                    <label htmlFor="email" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        Email
                                    </label>
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex flex-col h-20">
                                    <label htmlFor="gender" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        Gender
                                    </label>
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="men">Male</option>
                                        <option value="women">Female</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex flex-col h-20">
                                    <label htmlFor="status" className="text-black font-semibold mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">
                                        Status
                                    </label>
                                    <Field
                                        as="select"
                                        name="status"
                                        id="status"
                                        className="border-b-2 border-gray-300 focus:border-lime-400 px-0 py-2 text-sm sm:text-base focus:outline-none transition-colors bg-white text-black"
                                    >
                                        <option value="">Select Status</option>
                                        {Object.keys(contactStatuses).map((status, index) => (
                                            <option 
                                                key={index} 
                                                value={status}
                                                style={{ backgroundColor: contactStatuses[status].bg }}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1 min-h-[16px]" />
                                </div>

                                <div className="flex items-center space-x-3 pt-4 h-12">
                                    <Field type="checkbox" name="favorite" id="favorite" className="accent-lime-400 w-4 h-4 sm:w-5 sm:h-5" />
                                    <label htmlFor="favorite" className="text-black font-semibold text-xs sm:text-sm uppercase tracking-wide">
                                        Mark as Favourite
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-6 sm:mt-8 w-full sm:w-auto bg-lime-400 text-black px-8 sm:px-12 py-2 sm:py-3 rounded-full font-bold uppercase tracking-wide hover:bg-lime-500 transition-colors text-xs sm:text-sm"
                                >
                                    Submit Contact
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
