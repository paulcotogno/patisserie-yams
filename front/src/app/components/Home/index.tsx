'use client';

import { useContext, useEffect, useState, createContext, Dispatch, SetStateAction } from "react";
import { auth } from "@/app/services/auth";
import { CustomerType } from "@/app/types/Customer";

import { Waiting } from "../Waiting";
import { Connexion } from "../Connexion";
import { Launches } from "../Launches";
import { ListPastries } from "../ListPastries";

export const Customer = createContext<{ customer?: CustomerType, retrieveCustomer: () => void }>({ customer: undefined, retrieveCustomer: () => { } });

const isError = (data: any): data is { message: string } => {
  return (data as { message: string }).message !== undefined;
}

export const Layout = () => {
  const [customer, setCustomer] = useState<CustomerType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const retrieveCustomer = async () => {
    const token = window.localStorage.getItem('token');

    if (token) {
      auth().then((data) => {
        if (!isError(data)) {
          setCustomer(data);
          setLoading(false);
        }
      }).catch((err) => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => { retrieveCustomer() }, []);

  return (
    <Customer.Provider value={{ customer, retrieveCustomer }}>
      {
        loading ? <Waiting /> : (customer ? <Home /> : <Connexion />)
      }
    </Customer.Provider>
  );
}

const Home = () => {
  const { customer } = useContext(Customer);

  return (
    <div>
      <h1>La Superbe Patisserie</h1>
      {
        customer && (
          <>
            <p>Bonjour {customer.firstName} {customer.lastName}</p>
            <Launches />
            <ListPastries />
          </>
        )
      }
    </div>
  )
}