import Modal from 'react-modal'
import styles from './style.module.scss'

import {FiX} from 'react-icons/fi'
import { Button } from '../ui/Button'

import { OrderItemProps } from '@/pages/dashboard'
import { setupAPIClient } from '@/services/api'

import {toast} from 'react-toastify'

interface ModalOrderProps{
    isOpen: boolean,
    onRequestClose: () => void,
    order: OrderItemProps[]
}

export default function ModalOrder({isOpen, onRequestClose, order}: ModalOrderProps){

    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            backgroundColor: '#1d1d2e',
            transform: 'translate(-50%, -50%)',
            //Deixar centralizado o Modal
        }
    }

    async function handleSendOrder() {
        
        const apiClient = setupAPIClient()

        await apiClient.patch('/finishOrder', {
            order_id: order[0].order.id
        })

        toast.success("Pedido enviado com sucesso!")
        onRequestClose();

    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button type='button' onClick={onRequestClose} className='react-modal-close' style={{background: 'transparent', border: 0}}>
                <FiX size={45} color='#F34748'/>
            </button>

            <div className={styles.container}>
                <h2>Detalhes do Pedido</h2>
                <h2 className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </h2>

                {order.map( item => (
                    <section key={item.id} className={styles.items}>
                        <span className={styles.amountTitle}>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <Button type='button' className={styles.button} onClick={handleSendOrder}>
                    <a>Concluir Pedido</a>
                </Button>

            </div>

        </Modal>
    )
}