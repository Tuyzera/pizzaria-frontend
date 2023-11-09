import styles from './styles.module.scss'
import { ReactNode } from 'react'
import {ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react'

import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,//Dentro da tag
    
}

interface AncoraProps extends AnchorHTMLAttributes<HTMLAnchorElement>{}


export function Button({loading, children, ...rest}: ButtonProps){
    return(
        <button 
        className={styles.button} 
        disabled={loading} 
        {...rest}
        >
            {loading ? (
                <FaSpinner color='#FFF' size={24}/>
            ) :(
                <a className={styles.buttonText}>{children}</a>
            )}
            
        </button>
    )
}