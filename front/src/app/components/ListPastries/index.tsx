import { useEffect, useState } from "react";

import './styles.scss'

export const ListPastries = () => {
  const [pastries, setPastries] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:8080`;

    fetch(`${apiUrl}/api/pastries/list`).then((res) => res.json()).then((data) => {
      setPastries(data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div className="listPastries">
      <h1>Liste des pâtisseries</h1>
      <div className="listPastries_wrapper">
        {
          pastries.map((pastry: any) => (
            <div className="pastry_wrapper" key={pastry._id}>
              <img src={`/images/${pastry.image}`} alt="" />
              <div className="content">
                <h4>{pastry.name}</h4>
                <p>{pastry.quantityLeft} restants sur {pastry.stock}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}