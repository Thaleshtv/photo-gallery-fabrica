const baseURL = 'https://api.pexels.com/v1/'
const divPaiImages = document.getElementById('lugar-imagens')

let index = 1
let numeroDeImagens = 10    


//Requisição do tipo GET para pegar as fotos
async function getAllPhotos() {
    //Função para limpar a div
    limparDivPai()
    const response = await fetch(`${baseURL}/curated?page=${index}&per_page=${numeroDeImagens}`, {
        headers : {
            //Autorização para poder ter acesso a API
            Authorization : '563492ad6f91700001000001d90fd8687e0b4081b11bd2d3bf59a041'
        }
    })
    const data = await response.json()

    //Loop para passar por todos os índices do array 
    for(const item of data.photos) {
        //Chama a função que monta a nossa imagem utilizando js
        //É passado um item como parametro, que no caso é a informação de cada imagem
        contruirImagem(item)
    }
}
//A função é chamada assim que a página é recarregada, e não necessita da ação de um usuário para rodar
getAllPhotos()

//Aqui é a nossa função de contruir nossa imagem, como o própio nome ja diz
//A função recebe um parâmetro chamado 'item'
function contruirImagem(item) {
    //Com o parâmetro que é passado armazeno ele em um constante a url da imagem
    const urlImg = item.src.tiny
        
    //Crio o elemento com o js utilizando o createElement
    const divImg = document.createElement('img')
    divImg.setAttribute('src', urlImg)
    divPaiImages.appendChild(divImg)
}


//Função para limpar a nossa página, para que quando houver uma nova requisição as fotos nao somem com as anteriores
function limparDivPai() {
    divPaiImages.innerHTML = ''
}

//Nessa função recebemos como parametro se o botão é de voltar ou próxima
function changePage(button) {
    //Caso o botão seja próximo
    if(button === 'proximo') {
        index = index + 1 //Atualizo o valor do index dizendo que o valor atual dele é o valor dele MAIS 1
        console.log(index)
        getAllPhotos()//Chamo a função para atualizar novamente a página com o novo index
    }

    //Mesma lógica
    if(button === 'voltar' && index > 1) {
       index = index - 1
       console.log(index)
       getAllPhotos()
    } 
    
}

//Essa função é chamada a partir de um onChange, que é encontrado no index.html, no select.
//A cada mudança de valor essa função é chamda
function mudaNumeroDeFotos() {
    //Pego o valor do select para saber quantas fotos o usuário quer na página
    const selectValue = document.getElementById('selectPage').value
    
    numeroDeImagens = selectValue
    getAllPhotos()
    console.log(numeroDeImagens)
}
