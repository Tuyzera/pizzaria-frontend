import Head from "next/head";
import styles from './styles.module.scss'
import { canSSRAuth } from "@/utils/canSSRAuth";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import {FiUpload} from 'react-icons/fi'
import {useState, ChangeEvent, FormEvent} from 'react'
import {toast} from 'react-toastify'


import { setupAPIClient } from "@/services/api";

interface CategoryRequest{
    category: CategoryList[];
}

type CategoryList = {
    id: string,
    name: string
}


export default function Produto({category}: CategoryRequest){
    const [avatarUrl, setAvatarUrl]= useState('')
    const [imageAvatar, setImageAvatar] = useState(null)
    

    const [categorylist, setCategoryList] = useState(category || [])
    const [categorySelected, setCategorySelected] = useState(0)

    const [nomeProduto, setNomeProduto] = useState('')
    const [precoProduto, setPrecoProduto] = useState('')
    const [descricaoProduto, setDescricaoProduto] = useState('')
    

    

    function handleFile(event : ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return
        }
        const image = event.target.files[0]

        if(!image){
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))

        }
    }

    function handleChange(event){
        console.log(event.target.value)
        setCategorySelected(event.target.value)
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault()
        const data = new FormData()
        if(nomeProduto === '' || precoProduto === '' || descricaoProduto === '' || categorySelected === null || avatarUrl === ''){
            toast.warning("Preencha todos os campos")
            return
        }

        let categoriaID = categorylist[categorySelected].id;
        console.log(categoriaID)

        const api = setupAPIClient()

        data.append("name", nomeProduto)
        data.append("price", precoProduto)
        data.append("description", descricaoProduto)
        data.append("file", imageAvatar)
        data.append("category_id", categoriaID)


        await api.post("/product", data)

        toast.success("Cadastrado com sucesso!")
    }

    return(
        <>
            <Head>
                <title>Pizzaria - Novo produto</title>
            </Head>
            <div>
            <Header/>

            <main className={styles.container}>
                <h1>Novo Produto</h1>


                <form className={styles.form} onSubmit={handleRegister}>

                    <label className={styles.labelAvatar}>
                        <span><FiUpload size={30} color={'#fff'}/></span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                        {avatarUrl && ( //Se tiver algo dentro desse avatarUrl mostre
                            <img
                            src={avatarUrl}
                            alt="Foto do produto"
                            width={250}
                            height={250}
                            className={styles.preview}
                            >
                            
                            </img>
                        )}

                    </label>
                    
                    
                    <select value={categorySelected} onChange={handleChange}>
                        {categorylist.map((item, index)=> {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        }
                            
                        )}
                    </select>

                    <Input
                    type="text"
                    placeholder="Digite o nome do produto"
                    className={styles.input}
                    value={nomeProduto}
                    onChange={(e) => setNomeProduto(e.target.value)}
                    />
                    <Input
                    type="text"
                    placeholder="Digite o preço do produto"
                    className={styles.input}
                    value={precoProduto}
                    onChange={(e)=> setPrecoProduto(e.target.value)}
                    />
                    <textarea
                        placeholder="Descreva seu produto..."
                        className={styles.input}
                        value={descricaoProduto}
                        onChange={(e) => setDescricaoProduto(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type="submit">Cadastrar</button>

                </form>
            </main>


            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const api = setupAPIClient(ctx);

    const response = await api.get('/allCategories')

    return{
        props:{
            category: response.data
        }
    }
})