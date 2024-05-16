'use client';
import { FormEvent, useMemo, useState } from "react";
import { CustomerType } from "../types/Customer";

import './styles.scss';

export default function GetReward() {
  const [error, setError] = useState<string | null>(null)
  const [customer, setCustomer] = useState<CustomerType | undefined>(undefined)
    
    const submit = (e: FormEvent<HTMLFormElement>) => {
      const apiUrl = `http://localhost:8080`;

      e.preventDefault();

      const body = {
        // @ts-ignore
        email: e.target.email.value
      }

      fetch(`${apiUrl}/api/customers/getRewardCustomer?email=${body.email}`).then((res) => res.json()).then((data) => {
        console.log(data);
        setCustomer(data);
      }).catch((err) => {
        console.error(err);
        setError(err.message);
      });
    }

    const customerGain = useMemo(() => {
      if(!customer) return <></>;

      const listGain: string[] = [];

      customer.launches.forEach((launch) => {
        if(launch.pastries > 0) {
          listGain.push(...launch.gain)
        }
      })

      return <>
      {
        listGain.length > 0 ? (
          <>
          <h3>Liste des gains :</h3>
          <ul>
            {
              listGain.map((gain) => (
                <li>{gain}</li>
              ))
            }
          </ul>
            </>
        ) : (
          <h3>Pas de gain</h3>
        )
      }
      </>
    }, [customer])

    return (
        <div className="getReward_wrapper">
        <form onSubmit={submit}>
          <input type="text" name="email" placeholder="email" />
          <button>Rechercher</button>
          {
            error && (
              <p>{error}</p>
            )
          }
        </form>
        {
          customer && (
            <>
            <h3 style={{ marginTop: '32px' }}>Résultat de la recherche: </h3>
            <div className="customer_wrapper">
              <h4>{customer.firstName} {customer.lastName}</h4>
              <p>{customer.email}</p>
              {customerGain}
            </div>
            </>
        )
      }
        </div>
    )
}