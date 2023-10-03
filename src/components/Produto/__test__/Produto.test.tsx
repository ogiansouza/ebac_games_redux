import { fireEvent, screen } from '@testing-library/react'

import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 2,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['Windows', 'PS5', 'Xbox series S/X'],
  preco: 250.9,
  precoAntigo: 325.9,
  titulo: 'Diablo'
}

describe('Testes para o componente', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)

    expect(screen.getByText('Diablo')).toBeInTheDocument()
  })

  test('Deve adicionar produto ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)

    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    //Acessando a Store do projeto. O 'toHaveLength' verifica quantos elementos temos em um array

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
