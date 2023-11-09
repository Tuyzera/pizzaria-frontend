import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import {useContext, FormEvent, useState} from 'react'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

import logoImg from '../../images/logo-pizza.svg'

import Link from 'next/link'
import { GetServerSideProps } from 'next'

import { cannSRRGuest } from '@/utils/canSSRguest'

import { AuthContext } from '@/contexts/AuthContext'


export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)


  async function handleLogin(event: FormEvent){
    event.preventDefault()
    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data);
    setLoading(false)
  }

  
  return (
    //Em volta disso <><Head> </Head></>, e passando a proprieadade "title", a gente muda o titulo da nossa aba
   <>
    <Head>
      <title>Pizzaria - Faça seu login</title> 
    </Head>
    <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo da pizzaria' width={300} height={300} />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>

          </form>

          <Link href="/cadastrar" className={styles.textLink}>
            Não possui uma conta? Cadastre-se
          </Link>
          

        </div>
    </div>
   </>
  )
}


export const getServerSideProps = cannSRRGuest(async (ctx) => {
  return {
        props:{}
  }
  
})