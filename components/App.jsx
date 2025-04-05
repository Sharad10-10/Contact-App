import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { IoIosSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/config/firebase";
import Contacts from "./Contacts";
import Modal from "./Modal";
import AddAndUpdateContact from "./AddAndUpdateContact";
import hooks from "../src/config/hooks";
import { ToastContainer } from 'react-toastify';
import NoContactFound  from "./NoContactFound";


function App() {
  const [contacts, setContacts] = useState([]);

  const {isOpen, onOpen, onClose }= hooks();

  // const [isOpen, setIsOpen] = useState(false)
  
  // const onOpen = ()=> {
  //   setIsOpen(true)
  // }

  // const onClose = () => {
  //   setIsOpen(false)
  // }



  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");


        onSnapshot(contactsRef, (snapshot)=>{
         
          const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
  
          
        })

        
      } catch (error) {
        console.log(error)
      }
    };
    getContacts();
  }, []);


    const filterContacts = (e) => {
      const value = e.target.value;

      const contactsRef = collection(db, "contacts");


        onSnapshot(contactsRef, (snapshot)=>{
         
          const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const filteredContacts = contactLists.filter(contact => {
          return (contact.name.toLowerCase().includes(value.toLowerCase()))
        })


        setContacts(filteredContacts);
        return filteredContacts;

    });}



  return (
    <>
      <div className="mx-auto max-w-96 px-4">
      <Navbar />
      <div className="flex gap-2 max-w-96">
        <div className="flex relative items-center flex-grow">
          <IoIosSearch className="text-white text-3xl ml-5 absolute" />

          <input
            onChange={filterContacts}
            type="text"
            placeholder="Search Contact"
            className="ml-4 flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-9"
          />
        </div>
        <CiCirclePlus onClick={onOpen} className="text-5xl cursor-pointer text-white" />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {contacts.length === 0 ? <NoContactFound /> : contacts.map((contact) => {
          return (
            <Contacts contact = {contact} key = {contact.id} contactId = {contact.id}/>
          );
        })}
      </div>
    </div>
    
    <AddAndUpdateContact isOpen={isOpen} onClose = {onClose}/>
    <ToastContainer position= 'top-left' />
    
    
    </>
  );
}

export default App;
