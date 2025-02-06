import Block from '../framework/Block';

export default function (query: string, block: Block) {
  const root = document.getElementById(query);

  if (root) {
    root.innerHTML = '';
    root.appendChild(block.getContent());
  }

  return root;
}
