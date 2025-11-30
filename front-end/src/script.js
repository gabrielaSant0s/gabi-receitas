
async function carregarDados() {
    const response = await fetch("http://localhost:8080/receitas/listar")

    const lista = await response.json();

    const receitasDiv = document.getElementById("card-receita")

    lista.forEach(element => {
      const div = document.createElement("div")
      div.classList.add("receita")

      div.onclick = () => pegarReceita(element.id);

      div.innerHTML = `
        <h3>${element.nome}</h3>
        <p>ingredientes: ${element.ingredientes}</p>
        <p>modo preparo: ${element.modoPreparo}</p>
      `;

      receitasDiv.appendChild(div);
    });
}

function criarReceita(){
  window.location.href = "criar-receita.html";
}

async function postarReceita(event){
  event.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    ingredientes: document.getElementById("ingredientes").value,
    modoPreparo: document.getElementById("modoPreparo").value
  }

  const response = await fetch("http://localhost:8080/receitas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if(response.ok){
    window.location.href = "index.html";
    alert("Receita criada com sucesso!")
  } else {
    alert("Não foi possível criar receita")
  }
}

function pegarReceita(id) {
  window.location.href = "receita.html?id=" + id;
}

async function carregarReceita(id) {
  const response = await fetch("http://localhost:8080/receitas/listar/"+id)
  
  const receita = await response.json()

  const postagem = document.getElementById("postagem")

  const div = document.createElement("div")
  div.classList.add("postagemReceita")

  div.innerHTML = `
    <h3>${receita.nome}</h3>
    <p>ingredientes: ${receita.ingredientes}</p>
    <p>modo preparo: ${receita.modoPreparo}</p>
    <p>id: ${receita.id}</p>
  `
  postagem.appendChild(div)
}

async function editarReceita() {
  const id = pegarIdReceita();

  const postagem = document.getElementById("postagem");

  postagem.innerHTML = "";

  const response = await fetch("http://localhost:8080/receitas/listar/" + id);
  const receita = await response.json();

  const form = document.createElement("form");
  form.id = "form-editar";

  form.innerHTML = `
    <label for="nome">Nome Receita</label><br>
    <input type="text" id="nome" value="${receita.nome}"><br>

    <label for="ingredientes">Ingredientes</label><br>
    <input type="text" id="ingredientes" value="${receita.ingredientes}"><br>

    <label for="modoPreparo">Modo de Preparo</label><br>
    <input type="text" id="modoPreparo" value="${receita.modoPreparo}"><br>

    <button type="submit">Salvar alterações</button>
  `;

  postagem.appendChild(form);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    atualizarReceita(id);
  });
}

async function atualizarReceita(id) {
  const data = {
    nome: document.getElementById("nome").value,
    ingredientes: document.getElementById("ingredientes").value,
    modoPreparo: document.getElementById("modoPreparo").value
  };

  const response = await fetch("http://localhost:8080/receitas?id="+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert("Receita atualizada com sucesso!");
    window.location.href = "receita.html?id=" + id;
  } else {
    alert("Erro ao atualizar receita");
  }
}


async function excluirReceita() {
  const id = pegarIdReceita();

  const response = await fetch("http://localhost:8080/receitas?id="+id, {
      method: "DELETE"
    });

  if (response.ok){
    window.location.href = "index.html"
    alert("Receita excluída com sucesso!")
  } else {
    alert("Erro ao excluir receita")
  }
  
}

function pegarIdReceita(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("card-receita")) {
    carregarDados();
  }
  if (document.getElementById("postagem")){
      const id = pegarIdReceita();
      if (id) carregarReceita(id);
  }
});
