import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from 'next/head'
import Header from "@/components/ui/Header"
import {FiRefreshCcw} from 'react-icons/fi'
import styles from './styles.module.scss'
import Link from "next/link"
import { setupAPIClient } from "@/services/api"
import {useState} from 'react'
import Modal from 'react-modal'
import ModalOrder from "@/components/ModalOrder"
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

export type OrderItemProps = {
    id: string,
    amount: number,
    order_id: string,
    product_id: string
    product:{
        id: string,
        name: string,
        price: string,
        description: string,
        banner: string
    },
    order:{
        id: string,
        table: number,
        status: boolean,
        draft: boolean,
        name: string | null
    }
}

export default function Dashboard({orders}: HomeProps){
    const [orderList, setOrderList] = useState(orders || [])

    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)


    function handleCloseModal(){
        setModalVisible(false)
    }

    async function handleRefreshPage() {
  
        const api = setupAPIClient()

        const response = await api.get("/allOrders")

        setOrderList(response.data)
    }


    async function handleOpenModalView(id: string){
        
        const apiClient = setupAPIClient()

        const response = await apiClient.get("/orderDetail", {
            params:{
                order_id: id
            }
        })

        console.log(response)

        setModalItem(response.data)
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')

    
    return(
        <>
            <Head> 
                <title>Pizzaria - Dashboard</title>
            </Head>
            <Header/>
            
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>Pedidos</h1>
                    <button onClick={handleRefreshPage}>
                        <FiRefreshCcw size={24} />
                    </button>
                </div>
                    
                    <article className={styles.listOrders}>
                    
                    {orderList.map((item)=> (
                        
                            <section key={item.id} className={styles.orderitem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa: {item.table}</span>
                                </button>
                            </section>
                    ))}
                        
                    </article>

                
                
            </div>
            {modalVisible && (
                <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} order={modalItem}/>
            )}
            
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