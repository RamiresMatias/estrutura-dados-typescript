import {describe, it} from 'mocha'
import {expect} from 'chai'
import { Deque } from '../queue-deques/deque'

const mockDeque = () => {
  return new Deque<string>()
}

describe('Deque', () => {
  it('Should be insert an element in the first and last place of the deque', () => {
    const deque = mockDeque()

    deque.addFront('John')

    const items = Object.entries(deque.getItems()).map(el => el[1])

    expect(items[0]).to.equal('John')
    expect(items.at(-1)).to.equal('John')
  })

  it('Should be remove front element and return the element in the deque', () => {
    const deque = mockDeque()

    deque.addBack('John')
    deque.addBack('Camilla')

    const element = deque.removeFront()

    expect(element).to.equal('John')
    expect(deque.size()).to.equal(1)
  })

  it('Should be remove back element and return the element in the deque', () => {
    const deque = mockDeque()

    deque.addBack('John')
    deque.addBack('Camilla')

    const element = deque.removeBack()

    expect(element).to.equal('Camilla')
    expect(deque.size()).to.equal(1)
  })

})