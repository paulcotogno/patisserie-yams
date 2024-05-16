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

    customer.launchs.forEach((gain) => {
      if (gain.gain.length > 0) {
        gain.gain.forEach((gain, index) => {
          listGain.push(<li key={index}>{gain}</li>);
        })
      }
    });

    return listGain;
  }, [customer?.launchs])

  return (
    <div className="launches_wrapper">
      <div className="launch_wrapper">
        <h1>Il vous reste {3 - (customer?.launchs.length || 0)} lance</h1>
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
      <div className="oldLaunches">
        <h2>Tous vos lance</h2>
        {
          customer && customer.launchs.map((launch, index) => (
            <Lance key={index} {...launch} />
          ))
        }
      </div>
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