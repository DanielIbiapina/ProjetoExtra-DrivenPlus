import styled from "styled-components";
import { Link } from "react-router-dom";


export default function Plano({plano}) {
    return (
        <Link to={`/subscriptions/${plano.id}`}>
        <ContainerPlano>
            <LogoPlano src={plano.image}>
            </LogoPlano>
            <p>R$ {plano.price}</p>
        </ContainerPlano>
        </Link>
    );
}


const ContainerPlano = styled.div`
box-sizing: border-box;
width: 290px;
height: 180px;
display: flex;
justify-content: center;
align-items: center;
background: #0E0E13;
border: 3px solid #7E7E7E;
border-radius: 12px;
margin-bottom: 10px;
p{
    margin-left: 21px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
}
`
const LogoPlano = styled.img `
width: 140px;
`