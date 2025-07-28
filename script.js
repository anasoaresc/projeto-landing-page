window.onload = function () {     // roda o js apenas quando todo conteúdo do site for carregado.
const mobilebtn = document.getElementById('mobilebtn');
const closemobilebtn = document.getElementById('closemobilebtn');
const mobileMenu = document.getElementById('mobile_menu');

mobilebtn.addEventListener('click', () => {  // é um  "escutador", um evento que quando o botão for clicado, a função será executada.
    mobileMenu.classList.add('active');     // exibe o menu da versão mobile (classList é pra alterar o CSS)
    mobilebtn.style.display = 'none';     // para tornar o botão do menu invisível quando ele estiver aberto.
})

    closemobilebtn.addEventListener('click', () => {    // quando o botão é clicado, executa a função
        mobileMenu.classList.remove('active');          // que remove a exibição do menu
        mobilebtn.style.display = 'block';              // e torna visível o botão do menu mobile de novo.
})

window.addEventListener('resize', () => {       // 'resize' é disparado sempre que o usuário redimensiona a janela/gira o celular.
  const mobileBtn = document.getElementById('mobilebtn');
  const mobileMenu = document.getElementById('mobile_menu');

  if (window.innerWidth > 1170) {            // window.innerWidth retorna a largura do navegador atual.
    mobileMenu.classList.remove('active');  // resize verifica se a janela foi redimensionada, e a função (if > window.innerWidth),
    mobileBtn.style.display = '';          // verifica se é maior que 1170px, para que se for, oculte o menu mobile (remove a classe CSS),
  }                                      // e remova o botão de abrir o menu mobile (resumindo: retira config mobile e retorna pro padrão desktop).
}); 

};

// declarando no array novamente as info das pizzas contidas no HTML para se tornar manipulável pelo js.
const pizzas = [{ nome: "Calabresa", preco: 29.99, imagem: "/images/69d92d7f-d8df-4041-96cd-709813fc4d05.png", descricao: "A pizza de calabresa traz o sabor da linguiça levemente picante, fatiada sobre uma camada de queijo mussarela, finalizada com cebolas frescas e orégano." },
  { nome: "Salaminho", preco: 34.99, imagem: "/images/pizza-feliciana-salame-e-chorizo-600.png", descricao: "A pizza de salaminho destaca fatias de salame defumado sobre o queijo derretido, proporcionando um toque levemente apimentado e aroma intenso." },
  { nome: "Peperonni", preco: 29.99, imagem: "/images/Pizza-Pepperoni-And-Cheese-PNG-Pic-Background.png", descricao: "Clássica da cozinha internacional, a pizza de peperonni possui fatias finas deste embutido temperado, acompanhadas pelo queijo mussarela derretido." },
  { nome: "Tomate", preco: 24.99, imagem: "/images/pizza-margherita.png", descricao: "Essa pizza valoriza os ingredientes frescos: tomates em rodelas, orégano e queijo mussarela dão leveza e um toque adocicado ao paladar." },
  { nome: "Azeitona", preco: 24.99, imagem: "/images/Expresso-Delivery_5924a8a9ca99b39e73f920d14683ef68.png", descricao: "Simples e deliciosa, a pizza de azeitona leva azeitonas pretas fatiadas sobre o queijo derretido, realçando o sabor com um toque de orégano." }];

// para o carrossel:
let start = 0; // cada pizza tem um índice, e aqui declara que iniciará na primeira '0'
const pizzasPorVez = 3; // e exibirá 3 no máx, por vez.

const desktop = 1171; // define variável de valor mín de largura para desktop.

function rolarPizzas() {  // função "carrossel"
  const pizzaList = document.querySelector('#itens_pizza'); // a variável armazena o container '#itens_pizza' que contém os cards de cada pizza.
  pizzaList.innerHTML = '';   // limpa o conteúdo atual do container pra evitar duplicidade quando inserir novos cards.

  // Verifica se estamos em desktop
  if (window.innerWidth >= desktop) {
  // pega uma 'fatia' do array pizzas, começando de start e pegando pizzasPorVez a partir daí (começa no 0 e vai até 3).  
    pizzas.slice(start, start + pizzasPorVez).forEach(pizza => {  // para cada (forEach) fatia da pizza (pizzas.slice), chama:
    // createPizzaCard(pizza) que cria o 'card' representando cada pizza, com todos os detalhes definidos acima (const pizzas).  
      const pizzaCard = createPizzaCard(pizza); 
      pizzaList.appendChild(pizzaCard); // adiciona esse card ao container pizzaList.
    });
  } else {
    // Se não for desktop (mobile/tablet), mostra todas as pizzas de uma vez
    pizzas.forEach(pizza => {
      const pizzaCard = createPizzaCard(pizza);
      pizzaList.appendChild(pizzaCard);
    });
    // esconde os botões "setas".
    const leftArrow = document.querySelector('.seta.esquerda');
    const rightArrow = document.querySelector('.seta.direita');
    if (leftArrow) leftArrow.style.display = 'none';
    if (rightArrow) rightArrow.style.display = 'none';
  }
}

// Nessa função 'createPizzaCard' é montado o HTML de exibição de cada pizza individual, usando cada dado do objeto pizza.
function createPizzaCard(pizza) {
  const pizzaCard = document.createElement('div');
  pizzaCard.className = 'pizza-card';

  const img = document.createElement('img');
  img.src = pizza.imagem;
  img.alt = pizza.nome;
  img.className = 'pizza-img';

  const h3 = document.createElement('h3');
  h3.textContent = pizza.nome;

  const pDesc = document.createElement('p');
  pDesc.textContent = pizza.descricao;

  const pPreco = document.createElement('p');
  pPreco.innerHTML = `<br>A partir de: <strong>R$ ${pizza.preco.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;

  // Junta tudo no container pizzaCard.
  pizzaCard.appendChild(img);
  pizzaCard.appendChild(h3);
  pizzaCard.appendChild(pDesc);
  pizzaCard.appendChild(pPreco);

  return pizzaCard;
}

// Funções de clique das setas
function carrosselControls() {
  const leftArrow = document.querySelector('.seta.esquerda');
  const rightArrow = document.querySelector('.seta.direita');

  if (window.innerWidth >= desktop) {
    // Se for desktop, habilita as setas e seus eventos
    if (leftArrow) {
      leftArrow.style.display = ''; // faz com que ele volte a usar o estilo definido no CSS.
      leftArrow.onclick = function() {     
        if (start > 0) {       // Se o start for maior que 0 (ou seja, não é o primeiro grupo de pizzas = segunda pág), ele diminui start...        
          start -= pizzasPorVez;  // ...pelo número de pizzas por vez, ou seja, volta uma "página" no carrossel.
          rolarPizzas();          // chama a função rolarPizzas() para atualizar a exibição com a nova fatia de pizzas.
        }
      };
    }

    if (rightArrow) {
      rightArrow.style.display = ''; 
      rightArrow.onclick = function() {
        if (start + pizzasPorVez < pizzas.length) { // só avança se o próximo grupo não for o último (pizzas.length = total de pizzas).
          start += pizzasPorVez;
          rolarPizzas();
        }
      };
    }
  } else {
    // Se não for desktop, desabilita/esconde as setas e seus eventos
    if (leftArrow) {
      leftArrow.style.display = 'none';
      leftArrow.onclick = null; 
    }
    if (rightArrow) {
      rightArrow.style.display = 'none';
      rightArrow.onclick = null; 
    }
  }
}

rolarPizzas();
carrosselControls();

// adicionando um listener para que a funcionalidade se adapte se o usuário redimensionar o navegador (responsividade)
window.addEventListener('resize', () => {
  rolarPizzas(); // Reorganiza os itens de acordo com o tamanho
  carrosselControls(); // e reconfigura as setas
});
