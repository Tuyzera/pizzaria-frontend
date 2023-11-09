import Head from "next/head"
import Header from "@/components/ui/Header"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

import styles from './styles.module.scss'

import { setupAPIClient } from "@/services/api"

import {useState} from 'react'
import {toast} from 'react-toastify'

import { canSSRAuth } from "@/utils/canSSRAuth"



export default function Categoria(){
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister() {
        setLoading(true)
        if(category === ''){
            toast.warning("Preencha o campo")
            return
        }

        const api = setupAPIClient()

        await api.post('category',{
            name: category
        })

        setLoading(false)
        toast.success("Cadastrado com sucesso!")

    }
    return(
     
        <>
            <Head>
                <title>Pizzaria - Nova Categoria</title>
            </Head>
            <Header/>
            <div className={styles.container}>
                <div className={styles.inner}>
                    <h1>Nova Categoria</h1>
                    <Input type="text" placeholder="Digite o nome da categoria" value={category} onChange={(c) => setCategory(c.target.value)}/>
                    <Button loading={loading} onClick={handleRegister}><a>Cadastrar</a></Button>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return{
        props:{}
    }
})