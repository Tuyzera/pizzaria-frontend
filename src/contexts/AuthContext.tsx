import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@/services/apiClient";

import {destroyCookie, setCookie, parseCookies} from 'nookies'
import {toast } from 'react-toastify'

import Router from "next/router";

type AuthContextData ={
    user: UserProps;
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void,
    signUp: (credentials: SignUpProps) => Promise<void>
}

type SignUpProps={
    name: string,
    email: string,
    password: string
}

type SignInProps= {
    email: string,
    password: string
}

type UserProps= {
    id: string,
    name: string, 
    email: string
}

type AuthProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    try{
        destroyCookie(undefined, '@auth.token')
        Router.push('/')
    }catch{
        console.log("Erro ao deslogar")
    }
}

export function AuthProvider({children} : AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; //!! = converter a variavel para booleano; Se n tiver nada = false

    useEffect(() => {

        // tentar pegar algo no cookie
        const { '@auth.token': token } = parseCookies();
    
        if(token){
          api.get('/userDetails').then(response => {
            const { id, name, email } = response.data;
    
            setUser({
              id,
              name,
              email
            })
    
          })
          .catch(() => {
            //Se deu erro deslogamos o user.
            signOut();
          })
        }
    
    
      }, [])

    async function signIn({email, password}: SignInProps){
        try {
            
            const response = await api.post('/session', {
                email,
                password
            })

            //console.log(response.data)

            setCookie(undefined, '@auth.token', response.data.token, {
                maxAge: 60 * 60 * 24 * 30, //Expirar o token em 1 mes
                path: "/" //Quais caminhos esse cookie tera acesso; / = todos
            })

            setUser({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
            })

            //Passsar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

            //Redirecionar para  a / DASHBOARDS
            toast.success('Logado com sucesso!')
            Router.push('/dashboard')

        } catch (error) {
            toast.error("Erro ao acessar!")
            console.log("Erro: " + error)
            
        }
        
    }

    async function signUp({name, email, password}: SignUpProps){
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            
            toast.success('Cadastrado com sucesso!')
            Router.push('/')

        } catch (error) {
            toast.error('Erro ao cadastrar!')
            console.log(error)
        }
    }



    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}