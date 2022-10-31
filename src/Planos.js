import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Plano from "./Plano";
import { useContext } from "react";
import Contexto from "./Contexto";

export default function Subscriptions() {
    
    const { token, setToken, setAndPersistToken } = useContext(Contexto);
    const [planos, setPlanos] = useState(null)
    const tokenOnLocalStorage = localStorage.getItem("token");

    const config = {
        headers: {
          Authorization: `Bearer ${tokenOnLocalStorage}`,
        },
      };
      
      useEffect(() => {

      const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
      promise.then(respost => {
          console.log('planos resgatados')
          console.log(respost.data)
          setPlanos(respost.data)
      });
  }, []);

  if (planos === null) {
    return 'carregando...';
}

    return (
        
        <BodySubscriptions>
            <h1>Escolha seu Plano</h1>
            {planos.map((plano, index) => {
                    return (
                        <Plano plano={plano} key={index} />
                    )
                }
                )}
        </BodySubscriptions>
    );
}

const BodySubscriptions = styled.div`
display: flex;
flex-direction: column;
align-items: center;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
    margin-bottom: 24px;
    margin-top: 29px;
}
`
