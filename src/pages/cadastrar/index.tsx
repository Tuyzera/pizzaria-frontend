import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'
import {useState, FormEvent, useContext} from 'react'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import logoImg from '../../../images/logo-pizza.svg'

import Link from 'next/link'

import { AuthContext } from '@/contexts/AuthContext'
import {toast} from 'react-toastify'


export default function Cadastrar() {
  const {signUp} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)


  async function handleSignUp(event: FormEvent){
    event.preventDefault()
    if(name === '' || email === '' || password === ''){
      toast.warning("Preencha todos os campos")
      return
    }

    let data ={
      name,
      email,
      password
    }
    setLoading(true)

    await signUp(data)

    setLoading(false)
  }

  return (
    //Em volta disso <><Head> </Head></>, e passando a proprieadade "title", a gente muda o titulo da nossa aba
   <>
    <Head>
      <title>Pizzaria - Faça seu cadastro</title> 
    </Head>
    <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo da pizzaria' width={300} height={300}/>

        <div className={styles.login}>
            <h1>Criando Sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input 
            placeholder='Digite seu nome'
            type='text'
            value={name}
            onChange={(name) => setName(name.target.value)}
            />

            <Input 
            placeholder='Digite seu email'
            type='text'
            value={email}
            onChange={(email) => setEmail(email.target.value)}
            />

            <Input 
            placeholder='Digite sua senha'
            type='password'
            value={password}
            onChange={(password) => setPassword(password.target.value)}
            />

            <Button
            type='submit'
            loading={loading}
            >
              Cadastrar
            </Button>

          </form>

          <Link href="/" className={styles.textLink}>
            Já possui uma conta? Faça login
          </Link>
          

        </div>
    </div>
   </>
  )
}
