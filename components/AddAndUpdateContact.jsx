import React from "react";
import Modal from "./Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../src/config/firebase";
import { toast } from 'react-toastify';
import * as Yup from 'yup';


const contactSchemaValidation = Yup.object().shape({
  name : Yup.string().required("* Name field is required"),
  email : Yup.string().email("Invalid Email").required("* Email field is required")
})



const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

  const addContact = async (contact) =>{
    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, contact)
      onClose()
      toast.success('Contact Added Successfully') 
      
    }
    catch(error) {
      console.log(error)
    }
  }

    const updateContact = async (contact,id) => {
      try {
        const contactRef = doc(db, 'contacts', id);
        await updateDoc(contactRef, contact)
        onClose()
        toast.success('Contact updated Successfully')

      }

      catch (error) {
        console.log(error)
      }
    }



  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik 
        validationSchema={contactSchemaValidation}
        initialValues={ isUpdate ? {
          name : contact.name, 
          email : contact.email,
        } : {
          name : '',
          email : ''
        }}
          onSubmit={(values)=> {
            isUpdate ? updateContact(values, contact.id) :
             addContact(values)
          }}
        >
          <Form className="flex flex-col gap-2"> 
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <Field className="border h-10 p-2" name="name"></Field>
              <div className='text-xs text-red-600' >
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Field type = 'email' className="border h-10 p-2" name="email"></Field>
              <div className='text-xs text-red-600' >
                <ErrorMessage name="email"/>
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="cursor-pointer w-40 mt-4 h-10 px-3 mb-3 border bg-orange-600 rounded-md">{isUpdate ? "Update" : "Add"} Contact</button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
