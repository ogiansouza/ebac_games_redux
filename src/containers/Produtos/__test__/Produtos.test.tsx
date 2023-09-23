import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
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
  },
  {
    id: 3,
    categoria: 'Esporte',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox series S/X'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Fifa 24'
  },
  {
    id: 4,
    categoria: 'Esporte',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox series S/X'],
    preco: 250.9,
    precoAntigo: 325.9,
    titulo: 'Pes 2023'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container de Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    renderizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Black clover')).toBeInTheDocument()
    })
  })
})
