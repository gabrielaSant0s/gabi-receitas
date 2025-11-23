$(function() {
    $(".navbar-toggler").on("click", function(e) {
        $(".tm-header").toggleClass("show");
        e.stopPropagation();
      });
    
      $("html").click(function(e) {
        var header = document.getElementById("tm-header");
    
        if (!header.contains(e.target)) {
          $(".tm-header").removeClass("show");
        }
      });
    
      $("#tm-nav .nav-link").click(function(e) {
        $(".tm-header").removeClass("show");
      });
});

async function carregarReceitas() {
  try {
      const resposta = await fetch("http://localhost:8080/receitas/listar"); 
      const receitas = await resposta.json();

      const lista = document.getElementById("lista-receitas");

      receitas.forEach(r => {
          const item = document.createElement("div");
          item.classList.add("receita-item");
          item.innerHTML = `
              <h3>${r.nome}</h3>
              <p>${r.ingredientes}</p>
          `;
          lista.appendChild(item);
      });

  } catch (erro) {
      console.error("Erro ao carregar receitas:", erro);
  }
}

carregarReceitas();
