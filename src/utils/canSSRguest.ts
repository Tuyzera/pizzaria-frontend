//Rota só para visitantes visitar

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

//Funçao para paginas que só pode ser acessados por visitantes
export function cannSRRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx : GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{ 

    
    const cookies = parseCookies(ctx)
    //Se o cara tentar acessar a pagina porem tendo ja um login salvo redirecionamos
    if(cookies['@auth.token']){
        return {
            redirect:{
                destination: '/dashboard',
                permanent: false // Só pra dizer que não é pra sempre
            }
        }
    }



    return await fn(ctx);


    }
}