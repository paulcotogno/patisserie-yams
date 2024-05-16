import { useContext } from "react";
import { Customer } from "../Home";

import './styles.scss'

export const Connexion = () => {
  const { retrieveCustomer } = useContext(Customer);

  const submit = (e: any) => {
    const apiUrl = `http://localhost:8080`;

    e.preventDefault();

    const body = {
      email: e.target.email.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
    }

    fetch(`${apiUrl}/api/customers/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => res.json()).then((data) => {
      if (data.token) {
        window.localStorage.setItem('token', data.token);
        retrieveCustomer();
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="connexion_wrapper">
      <h1>Acceder a notre jeu pour tenter de gagner des patisseries</h1>

      <form onSubmit={submit}>
        <input name="email" type="text" placeholder="Email" />
        <input type="text" name="firstName" placeholder="Prenom" />
        <input type="text" name="lastName" placeholder="Nom" />
        <button>Se connecter</button>
      </form>
    </div>
  )
}