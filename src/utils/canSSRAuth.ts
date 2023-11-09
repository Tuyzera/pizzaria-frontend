//Rota só para logados visitar
import { AuthTokenError } from "@/services/errors/AuthTokenError"
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies, destroyCookie } from "nookies"

//função para paginas que só users logados podem acessar
export function canSSRAuth<P>(fn: GetServerSideProps<P>){

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        //Pegar o cookie
        const cookies = parseCookies(ctx)

        const token = cookies['@auth.token']

        if(!token){
            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
        }


        try{
            return await fn(ctx);
        } catch(error){
            if(error instanceof AuthTokenError){
                destroyCookie(ctx, '@auth.token')
                return{
                    redirect:{
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}

