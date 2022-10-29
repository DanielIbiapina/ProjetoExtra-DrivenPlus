import styled from "styled-components";

export default function Beneficios({beneficio, index}) {
    return(
        <>
        <ContainerBeneficio>
            <p>{index + 1}. {beneficio.title}</p>
        </ContainerBeneficio>

        </>
    );
}

const ContainerBeneficio = styled.div`
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
} 
`