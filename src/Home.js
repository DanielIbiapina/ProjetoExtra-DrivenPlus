import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Contexto from "./Contexto";
import { useContext } from "react";


export default function Home() {
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    const listaSerializadaAssinatura = localStorage.getItem("listaAssinatura");
    const listaAssinatura = JSON.parse(listaSerializadaAssinatura);
    const { token, setToken, setAndPersistToken, loginAutoHome, setLoginAutoHome } = useContext(Contexto);
    const navigate = useNavigate()
    console.log(lista)
    console.log(listaAssinatura)
    const tokenOnLocalStorage = localStorage.getItem("token");





    function deletarPlano() {
        const config = {
            headers: {
                Authorization: `Bearer ${tokenOnLocalStorage}`,
            },
        };
        const confirm = window.confirm('Deseja cancelar?')
        if (confirm == false) {
            return
        }
        if (confirm == true) {
            const promise = axios.delete(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, config)
            promise.then(resposta => {
                console.log(lista)
                console.log(listaAssinatura)
                navigate('/subscriptions')

            });
            
        }
    }



    return (
        <>
        <HeaderContainer>
            <img src= {listaAssinatura.membership.image} />
        </HeaderContainer>
        <BodyHome>
            <p>Olá, {lista.name}</p>
            <div>
                {listaAssinatura.membership.perks.map((beneficio, index) => {
                    return (
                        <a href= {beneficio.link}>
                        <Botao>
                            <p>{beneficio.title}</p>
                        </Botao>
                        </a>
                    )
                }
                )}
            </div>
            <div>
                <Link to={'/subscriptions'} >
                    <Botao><p>Mudar plano</p></Botao>
                </Link>
                <BotaoCancelar onClick={deletarPlano}><p>Cancelar plano</p></BotaoCancelar>
            </div>

        </BodyHome>
        </>
    );
}

const HeaderContainer =styled.div`
margin-left: 38px;
margin-top: 32px;
`
const BodyHome = styled.div`
height: 100vmax;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
margin-top: 12px;
p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;

color: #FFFFFF;
}
`
const Botao = styled.button`
width: 303px;
height: 52px;
background: #FF4791;
border-radius: 8px;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
margin-top: 8px;
p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
}
`

const BotaoCancelar = styled.button`
width: 303px;
height: 52px;
background: #FF4747;;
border-radius: 8px;
box-sizing: border-box;
display: flex;
justify-content: center;
align-items: center;
margin-top: 8px;
p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;

}
`
