import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import { IoMdTrash } from "react-icons/io";
import { db } from "../src/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import hooks from "../src/config/hooks";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { toast } from "react-toastify";

const Contacts = ({ contact, contactId}) => {

  const {isOpen, onOpen, onClose} = hooks()

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, 'contacts', id)
      await deleteDoc(contactRef)
      toast.success("Contact Deleted Successfully")
    }

    catch(error) {
      console.log(error)
    }
  }



  return (
    <div>
      <div key={contactId}
        className="bg-yellow-400 flex justify-between items-center p-2 rounded-lg"
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className="text-black text-4xl" />

          <div className="text-black">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-2">
          <TbEditCircle onClick={onOpen} className="cursor-pointer"/>
          <IoMdTrash onClick={()=> {
            deleteContact(contactId)
          }} className="cursor-pointer"/>
        </div>
      </div>
      <AddAndUpdateContact isUpdate isOpen={isOpen} onClose={onClose} contact = {contact}/>
    </div>
  );
};

export default Contacts;
