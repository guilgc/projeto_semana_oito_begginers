const Key = 'AIzaSyBCxfSfoIPXB0MT7oopLzEPqHSDPbWhVfo'

const botaoenter = document.getElementById('input');


//função para o enter ativar a função pesquisar
botaoenter.addEventListener('keypress', (e)=> {
    if (e.keyCode ===13) {
        loadlivros();
        
    }
});


function loadlivros() {
    
    const xhr1 = new XMLHttpRequest();
    
    const busca = document.getElementById("input").value
    const tipo = document.getElementById("selec").value
    
    const key = 'AIzaSyBCxfSfoIPXB0MT7oopLzEPqHSDPbWhVfo'
    
    
    xhr1.open("GET",
    `https://www.googleapis.com/books/v1/volumes?q=+${tipo}:${busca}&key=${key}`
    );
    
    xhr1.onreadystatechange = function () {
        
        if (xhr1.status = 200 && xhr1.readyState == 4) {

            document.getElementById('section').innerHTML = ""
            
            let dadosJSONText = xhr1.responseText
            let info = JSON.parse(dadosJSONText)
            
            for (let i = 0; i <= info.items.length; i++) {
                const corpo = document.getElementById('section')
                corpo.innerHTML += `
               
                <div id='livro' class='box'>
                <div>
                <img src="${info.items[i].volumeInfo.imageLinks.thumbnail ?? 'Sem foto'}" style="width:200px;">
                </div>
                <div class='box'>
                <p  id="titulo">
                Titulo: ${info.items[i].volumeInfo.title}
                </p>
                <p>
                Subtitulo: ${info.items[i].volumeInfo.subtitle ?? 'Sem Subtítulo Definido'} 
                </p>
                <p>
                Categoria: ${info.items[i].volumeInfo.categories ?? 'Categoria Não Informada'} 
                </p>
                <p>
                Autor: ${info.items[i].volumeInfo.authors ?? 'Autor Não Informado'} 
                </p>
                <p>
                Data de Publicação: ${info.items[i].volumeInfo.publishedDate ?? 'Data Não Informada'}
                </p>
                <p>
                Descrição: ${info.items[i].volumeInfo.description ?? 'Descrição Não Informada'} 
                </p>
                <div id='link'>
                <a id="apilivro" target="_blank" class="link" href="${info.items[i].selfLink}">
                API do Livro
                </a>
                <a href="${info.items[i].volumeInfo.infoLink}" class="link" target="_blank">
                Mais Informações
                </a>
                <a href="${info.items[i].saleInfo.buyLink}" target="_blank">
                Link de Compra
                </a>
                </div>
                </div>        
                `
            }
        }
    }
    xhr1.send();
    esvazia();
    document.getElementById('section').innerHTML = "<img src='imagem/loading.gif'>"
}

function esvazia() {
    const corpo = document.getElementById('section')
    corpo.innerHTML = ""
}
