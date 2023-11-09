import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from 'next/head'
import Header from "@/components/ui/Header"
import {FiRefreshCcw} from 'react-icons/fi'
import styles from './styles.module.scss'
import Link from "next/link"
import { setupAPIClient } from "@/services/api"
import {useState} from 'react'

interface HomeProps{
    orders: OrderProps[]
}

type OrderProps = {
    id: string,
    table: string | number,
    status: boolean,
    draft: boolean,
    name: string | null
}

export default function Dashboard({orders}: HomeProps){

    const [orderList, setOrderList] = useState(orders || [])
    return(
        <>
            <Head> 
                <title>Pizzaria - Dashboard</title>
            </Head>
            <Header/>
            
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>Pedidos</h1>
                    <button>
                        <FiRefreshCcw size={24}/>
                    </button>
                </div>
                    
                    <article className={styles.listOrders}>
                    
                    {orderList.map((item)=> (
                        
                            <section key={item.id} className={styles.orderitem}>
                                <button>
                                    <div className={styles.tag}></div>
                                    <span>Mesa: {item.table}</span>
                                </button>
                            </section>
                    ))}
                        
                    </article>

                
                
            </div>
            
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/allOrders')

    return{
        props: {
            orders: response.data
        }
    }
})