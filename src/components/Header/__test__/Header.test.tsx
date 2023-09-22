import { screen } from '@testing-library/react'

import Header from '..'

import { renderizaComProvider } from '../../../utils/tests'

describe('Testando o componente do Header', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Header />)

    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Deve renderizar com 2 itens', () => {
    renderizaComProvider(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
            {
              id: 1,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows'],
              preco: 150.9,
              precoAntigo: 199.9,
              titulo: 'Black clover'
            },
            {
              id: 2,
              categoria: 'RPG',
              imagem: '',
              plataformas: ['Windows', 'PS5', 'Xbox series S/X'],
              preco: 250.9,
              precoAntigo: 325.9,
              titulo: 'Diablo'
            }
          ]
        }
      }
    })

    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
