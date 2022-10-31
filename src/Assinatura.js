import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Beneficios from "./Beneficios";
import ReactModal from "react-modal";
import { useContext } from "react";
import Contexto from "./Contexto";
import prancheta from "./prancheta.png"
import dinheiro from "./dinheiro.png"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#FFFFFF',
        height: '210px',
        width: '248px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'

    },
};

export default function Assinatura() {
    const { idPlano } = useParams();
    const listaSerializada = localStorage.getItem("lista");
    const lista = JSON.parse(listaSerializada);
    const [assinatura, setAssinatura] = useState(null)
    const [nomecartao, setNomecartao] = useState('')
    const [digitos, setDigitos] = useState('')
    const [codigo, setCodigo] = useState('')
    const [validade, setValidade] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const { token, setToken, setAndPersistToken } = useContext(Contexto);
    const tokenOnLocalStorage = localStorage.getItem("token");
    const navigate = useNavigate()
    let subtitle;
    let botoes;
    let botaoNao;
    let botaoSim;

    const config = {
        headers: {
            Authorization: `Bearer ${tokenOnLocalStorage}`,
        },
    };

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`, config)
        promise.then(respost => {
            console.log('assinatura resgatados')
            console.log(respost.data)
            setAssinatura(respost.data)
        });
    }, []);

    if (assinatura === null) {
        return 'carregando...';
    }




    function openModal(event) {
        event.preventDefault();
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000000';
        subtitle.style.fontFamily = 'Roboto';
        subtitle.style.fontStyle = 'normal';
        subtitle.style.fontWeight = '700';
        subtitle.style.fontSize = '18px';
        subtitle.style.lineHeight = '21px';
        subtitle.style.textAlign = 'center';

        botoes.style.display = 'flex'
        botoes.style.justifyContent = 'space-around'

        botaoNao.style.width = '95px'
        botaoNao.style.height = '52px'
        botaoNao.style.backgroundColor = '#CECECE'
        botaoNao.style.borderRadius = '8px';
        botaoNao.style.color = '#FFFFFF'
        botaoNao.style.fontFamily= 'Roboto';
        botaoNao.style.fontStyle= 'normal';
        botaoNao.style.fontWeight= '700';
        botaoNao.style.fontSize= '14px';
        botaoNao.style.lineHeight= '16px';

        botaoSim.style.width = '95px'
        botaoSim.style.height = '52px'
        botaoSim.style.backgroundColor = '#FF4791'
        botaoSim.style.borderRadius = '8px';
        botaoSim.style.color = '#FFFFFF'
        botaoSim.style.fontFamily= 'Roboto';
        botaoSim.style.fontStyle= 'normal';
        botaoSim.style.fontWeight= '700';
        botaoSim.style.fontSize= '14px';
        botaoSim.style.lineHeight= '16px';

    }

    function closeModal() {
        setIsOpen(false);
    }

    function fazerAssinatura(event) {
        event.preventDefault();
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", {
            membershipId: idPlano,
            cardName: nomecartao,
            cardNumber: digitos,
            securityNumber: codigo,
            expirationDate: validade
        }, config)

        requisicao.then(resposta => {
            console.log(resposta.data)
            console.log(`Parabéns, plano ${resposta.data.membership.name} assinado`)
            const dados = resposta.data
            const dadosSerializados = JSON.stringify(dados)
            localStorage.setItem("listaAssinatura", dadosSerializados);
            navigate('/home')
        });

        requisicao.catch(erro => {
            alert('erro')
            console.log(erro.response.data);
            setIsOpen(false);
        });
    }

    return (
        <>
            <LogoContainer>
                <div>
                    <LogoPlano src={assinatura.image}>
                    </LogoPlano>
                    <LogoNome>
                        {assinatura.name}
                    </LogoNome>
                </div>
            </LogoContainer>
            <BodyAssinatura>
                <div>
                    <BeneficiosContainer>
                        <div>
                        <img src= {prancheta} />
                        <p>  Benefícios: </p>
                        </div>
                        {assinatura.perks.map((beneficio, index) => {
                            return (
                                <Beneficios beneficio={beneficio} key={index} index={index} />
                            )
                        }
                        )}
                    </BeneficiosContainer>
                    <Preço>
                        <div>
                        <img src= {dinheiro} />
                        <p>Preços:</p>
                        </div>
                        <h1>R$ {assinatura.price} cobrados mensalmente</h1>
                    </Preço>
                    <Form onSubmit={openModal}>
                        <Input1 type="text" placeholder="  Nome impresso no cartão" value={nomecartao} onChange={e => setNomecartao(e.target.value)} />
                        <Input1 type="text" placeholder="  Digitos do cartão" value={digitos} onChange={e => setDigitos(e.target.value)} />
                        <div>
                            <Input2 type="text" placeholder="  Código de segurança" value={codigo} onChange={e => setCodigo(e.target.value)} />
                            <Input2 type="text" placeholder="  Validade" value={validade} onChange={e => setValidade(e.target.value)} />
                        </div>
                        <BotaoAssinar type="submit">Assinar</BotaoAssinar>
                    </Form>
                </div>
            </BodyAssinatura>

            <div>
                <ReactModal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Tem certeza que deseja assinar o plano {assinatura.name} (R$ {assinatura.price})?</h2>
                    <div ref={(_botoes) => (botoes = _botoes)}>
                        <button ref={(_botaoNao) => (botaoNao = _botaoNao)} onClick={closeModal}>Não</button>
                        <button ref={(_botaoSim) => (botaoSim = _botaoSim)} onClick={fazerAssinatura}>SIM</button>
                    </div>

                </ReactModal>
            </div>
        </>
    );
}



const LogoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top:  87px;
`
const LogoPlano = styled.img`
`
const LogoNome = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
color: #FFFFFF;
margin-top: 12px;
`
const Preço = styled.div`
margin-top: 12px;
p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #FFFFFF;
margin-left: 4px;
}
h1{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
}
div{
    display: flex;
}
`
const BeneficiosContainer = styled.div`
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF; 
    
}
div{
    display: flex;
}
img{
    margin-right: 4px;
}
`
const BodyAssinatura = styled.div`
margin-left: 40px;
margin-top: 22px;
`
const BotaoAssinar = styled.button`
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
margin-bottom: 40px;
`

const Input1 = styled.input`
box-sizing: border-box;
width: 303px;
height: 45px;
margin-bottom: 8px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
::placeholder{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #7E7E7E;
}
`
const Input2 = styled.input`
box-sizing: border-box;
width: 147px;
height: 45px;
margin-bottom: 8px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 5px;
margin-right: 9px;
::placeholder{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #7E7E7E;
}
`
const Form = styled.form`
display: flex;
flex-direction: column;
margin-top: 100px;
`
