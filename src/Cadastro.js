import logo from "./Driven_white-1.png"
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCPF] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    function fazerCadastro(event) {
        event.preventDefault();
        setLoading(true)
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", {
            email: email,
            name: nome,
            cpf: cpf,
            password: senha
        })

        requisicao.then(resposta => {
            setLoading(false)
            alert('oi, deu certo')
            console.log(resposta.data)
            navigate("/")
        });

        requisicao.catch(erro => {
            alert('erro')
            setLoading(false)
            console.log(erro.response.data);
        });

    }

    return (
        <BodyCadastro>
            <Logo src={logo}>
            </Logo>
            <Form onSubmit={fazerCadastro}>
                <Input type="text" placeholder=" Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <Input type="text" placeholder=" CPF" value={cpf} onChange={e => setCPF(e.target.value)} />
                <Input type="email" placeholder="  E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="  Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                {loading
                    ?
                    <BotaoEntrar type="submit">
                        <Oval
                            height={40}
                            width={40}
                            color="#FFFFFF"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        />
                    </BotaoEntrar>
                    :
                    <BotaoEntrar type="submit">Cadastrar</BotaoEntrar>
                }
            </Form>

            <Link to={"/"}>

                <BotaoNaoTenhoConta>
                    J?? possui uma conta? Entre
                </BotaoNaoTenhoConta>


            </Link>
        </BodyCadastro>
    );
}

const BodyCadastro = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Logo = styled.img`
margin-top: 134px;
width: 299px;
`
const BotaoEntrar = styled.button`
width: 298px;
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
const BotaoNaoTenhoConta = styled.div`
width: 232px;
height: 17px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
display: flex;
justify-content: center;
align-items: center;
text-decoration-line: underline;
color: #52B6FF;
margin-top: 25px;
`
const Input = styled.input`
box-sizing: border-box;
width: 303px;
height: 45px;
margin-bottom: 16px;
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
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 100px;
`