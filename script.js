let seuVotoPara = document.querySelector(".d1-left-txtinit span");
let cargo = document.querySelector(".d1-left-cargo span");
let candidatura = document.querySelector(".d1-left-candidatura");
let instrucao = document.querySelector(".d2");
let imagens = document.querySelector(".d1-right");
let numeros = document.querySelector(".d1-left-num");

let etapaAtual = 0;
let numero = "";
let votobranco = false;

    function comecarEtapa(){
        let etapa = etapas[etapaAtual];
        let numeroHTML = "";
        numero = "";
        votobranco = false;

        for(i=0; i < etapa.numeros; i++){
            if (i===0){
                numeroHTML+=`<div class="quadrados pisca"></div>`;
                
            }else{
            numeroHTML+=`<div class="quadrados"></div>`;
            
            }
        }


        seuVotoPara.style.display = "none";
        cargo.innerHTML = etapa.titulo;
        candidatura.innerHTML = "";
        instrucao.style.display= "none";
        imagens.innerHTML = "";
        numeros.innerHTML= numeroHTML;

        
    }




function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numeroVoto === numero){
            return true;
        }else{
            return false;
        }

    })

    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        instrucao.style.display = "block"
        candidatura.innerHTML = `Nome: ${candidato.name}</br> Partido: ${candidato.partido}</br>`

        let fotosHTML = "";

        for (let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML += `<div class="d1-image small tamanhoimagem"><img src="/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHTML += `<div class="d1-image tamanhoimagem"><img src="/img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
            
        }
        
        imagens.innerHTML = fotosHTML; 
    
      
    }else{
        seuVotoPara.style.display = "block";
        instrucao.style.display="block";
       candidatura.innerHTML =`<div class="avisogrande pisca">VOTO NULO</div>`;
       
    }
        
}



function clicou(n){
    let quadrado = document.querySelector(".quadrados.pisca");
    if (quadrado !== null){
        quadrado.innerHTML = n;
        numero = `${numero}${n}`

        quadrado.classList.remove("pisca")
        if (quadrado.nextElementSibling !== null){
            quadrado.nextElementSibling.classList.add("pisca")
        } else{
            atualizaInterface();
        }
        
    } 
}


function branco(){
        if(numero === ""){
            votobranco = true;
            seuVotoPara.style.display = 'block';
            instrucao.style.display = "block";
            candidatura.innerHTML =`<div class="avisogrande pisca">VOTO EM BRANCO</div>`;
            numeros.innerHTML="";
        }
    
}

function corrigir(){
    comecarEtapa();
}

function confirmar(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votobranco == true)
    {
        votoConfirmado = true;
        

    }else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        
    }
    
    if (votoConfirmado){
        etapaAtual++;
    }if(etapas[etapaAtual] !== undefined){
        comecarEtapa();
    }else{
        document.querySelector(".tela").innerHTML = `<div class="fim">FIM</div>`;
    
        
    }

    

}  

comecarEtapa();