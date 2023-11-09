import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logoImg from '../../../../images/logo-pizza.svg'
import {FiLogOut} from 'react-icons/fi'
import { AuthContext, signOut } from '@/contexts/AuthContext'
import {useContext} from 'react'

export default function Header(){

    const {signOut} = useContext(AuthContext)


    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerInner}>
                <Link href="/">
                    <Image src={logoImg} alt='Logo pizza' width={100} height={100} color='#FFF'></Image>
                </Link>
                <nav className={styles.headerInnerRight}>
                    <Link href={'/categoria'}>Nova Categoria</Link>
                    <Link href={'/produto'}>Cardapio</Link>
                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>                      
                </nav>
            </div>
        </header>
    )
}