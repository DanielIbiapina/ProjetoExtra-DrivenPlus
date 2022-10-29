import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Contexto from "./Contexto";
import { useContext } from "react";


export default function Home() {
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    const { token, setToken, setAndPersistToken } = useContext(Contexto);
    const navigate = useNavigate()
    console.log(lista)
    console.log(token)

    //'fazer funçao mudar plano'



    function deletarPlano() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const confirm = window.confirm('Deseja cancelar?')
        if (confirm == false) {
            return
        }
        if (confirm == true) {
            const promise = axios.delete(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, config)
            promise.then (resposta => {
            console.log(resposta.data)
            navigate('/subscriptions')
            });
        }
    }


    return (
        <BodyHome>
            <p>Olá, {lista.name}</p>
            <div>
                {lista.membership.perks.map((beneficio, index) => {
                    return (
                        <Botao>
                            <p>{beneficio.title}</p>
                        </Botao>
                    )
                }
                )}
            </div>
            <div>
                <Link to={'/subscriptions'} >
                    <Botao>Mudar plano</Botao>
                </Link>
                <Botao onClick={deletarPlano}>Cancelar plano</Botao>
            </div>

        </BodyHome>
    );
}

const BodyHome = styled.div`
height: 100vmax;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
p{

}
`
const Botao = styled.button`
width: 303px;
height: 52px;
background: #FF4791;
border-radius: 8px;
box-sizing: border-box;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 20.976px;
line-height: 26px;
display: flex;
justify-content: center;
align-items: center;
color: #FFFFFF;
margin-top: 8px;
`