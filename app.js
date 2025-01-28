// Função para adicionar amigo à lista
function adicionarAmigo() {
  const input = document.getElementById('amigo');
  const nome = input.value.trim();
  const listaAmigos = document.getElementById('listaAmigos');

  // Verifica se o nome não está vazio e não está na lista
  if (nome === '') {
    alert('Por favor, digite um nome.');
    return;
  }

  const nomesExistentes = Array.from(listaAmigos.getElementsByTagName('li')).map(li => li.textContent.replace('×', '').trim());
  if (nomesExistentes.includes(nome)) {
    alert('Esse nome já foi adicionado.');
    return;
  }

  // Cria um novo item de lista
  const li = document.createElement('li');
  li.textContent = nome;

  // Cria um botão para remover o amigo
  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = '×';
  buttonRemove.onclick = function() {
    listaAmigos.removeChild(li);
  };

  li.appendChild(buttonRemove);
  listaAmigos.appendChild(li);
  input.value = ''; // Limpa o campo de entrada
}

// Função para sortear amigo secreto
function sortearAmigo() {
  const amigos = Array.from(document.querySelectorAll('#listaAmigos li')).map(li => li.textContent.replace('×', '').trim());
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = ''; // Limpa resultados anteriores

  if (amigos.length < 2) {
    alert('Adicione pelo menos dois amigos!');
    return;
  }

  let shuffled = shuffleArray([...amigos]);
  while (hasSelfPairing(amigos, shuffled)) {
    shuffled = shuffleArray([...amigos]);
  }

  // Exibe os resultados
  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = `${amigo} -> ${shuffled[index]}`;
    resultado.appendChild(li);
  });
}

// Função para embaralhar um array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para verificar se há emparelhamento próprio
function hasSelfPairing(original, shuffled) {
  return original.some((item, index) => item === shuffled[index]);
}