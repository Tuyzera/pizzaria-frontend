import styles from './styles.module.scss'

import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{} //<> = tipo generico
interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement>{}

//"...rest" = funão é pegar todas as propriedades que passar no componente e atribuir aqui, assim tornando dinamico

export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} {...rest}></input>
    )
}

export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}