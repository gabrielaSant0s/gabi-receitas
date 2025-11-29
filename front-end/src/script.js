
async function carregarDados() {
    const response = await fetch("http://localhost:8080/receitas/listar")

    const lista = await response.json();

    const receitasDiv = document.getElementById("lista-receitas")

    console.log(lista)

    lista.forEach(element => {
      
      const div = document.createElement("div")
      div.classList.add("receita")

      div.innerHTML = `
        <h3>${element.nome}</h3>
        <p>ingredientes: ${element.ingredientes}</p>
        <p>modo preparo: ${element.modoPreparo}</p>
      `;

      receitasDiv.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
});