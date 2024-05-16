import { useContext, useMemo, useState } from "react";
import { Customer } from "../Home";

import './styles.scss'

export const Launches = () => {
  const { customer, retrieveCustomer } = useContext(Customer);

  const [error, setError] = useState<string | undefined>(undefined);

  const launchDices = () => {
    const apiUrl = `http://localhost:8080`;

    fetch(`${apiUrl}/api/dices`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }).then((res) => res.json()).then((data) => {
      if (data.message) {
        setError(data.message);
      } else {
        retrieveCustomer();
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  const gains = useMemo<JSX.Element[]>(() => {
    if (!customer) return [];

    const listGain: JSX.Element[] = [];

    customer.launches.forEach((gain) => {
      if (gain.gain.length > 0) {
        gain.gain.forEach((gain, index) => {
          listGain.push(<li key={index}>{gain}</li>);
        })
      }
    });

    return listGain;
  }, [customer?.launches])

  const launches = useMemo<JSX.Element[]>(() => {
    if (!customer) return [];

    const launches: JSX.Element[] = [];

    customer.launches.forEach((launch, index) => {
      launches.push(<Lance {...launch} key={index} />)
    })

    return launches;
  }, [customer?.launches])

  const numberOfThrowLeft = useMemo(() => {
    if(!customer) return 0;

    if(customer.launches[customer.launches.length - 1].pastries > 0) {
      return 0;
    }

    return 3 - (customer.launches.length || 0);
  }, [])

  return (
    <div className="launches_wrapper">
      <div className="launch_wrapper">
        <h1>Il vous reste {numberOfThrowLeft} lancé{(3 - (customer?.launches.length || 0)) > 1 && 's'}</h1>
        <button onClick={launchDices}>Jouer</button>
        {
          error && <p>{error}</p>
        }
      </div>
      {
        gains.length > 0 && (
          <div className="gains">
            <h2>Vos gains</h2>
            <ul>
            {gains}
            </ul>
          </div>
        )
      }
      {
        launches.length > 0 && (
          <div className="oldLaunches">
            <h2>Tous vos lancés</h2>
            {launches}
          </div>
        )
      }
      
    </div>
  )
}

interface LanceProps {
  dices: number[];
  gain: string[];
  pastries: number;
}

const Lance = ({dices, gain, pastries}: LanceProps) => (
  <div className="lance_wrapper">
    <p className="numero">Vos numeros: {dices.join(' - ')}</p>
    {
      gain.length > 0 && (
        <p>Vos gains: {gain.join(' - ')}</p>
      )
    }
    <p>Vous avez gagné {pastries} patisseries</p>
  </div>
)