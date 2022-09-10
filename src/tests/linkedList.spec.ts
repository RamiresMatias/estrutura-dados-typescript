import {describe, it} from 'mocha'
import {expect} from 'chai'
import LinkedList from '../linkedList/linkedList'
import { Node } from '../linkedList/node'

const mockLinkedList = () => {
  return new LinkedList<string>()
}

describe('LinkedList', () => {

  it('Should be insert an element in list', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    const head = linkedList.getHead()

    expect(linkedList.size()).to.equal(1)
    expect(head?.element).to.equal('Maria')
    expect(head?.next).to.equal(undefined)
  })

  it('Should be insert an element in list and point to the next', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')

    const head = linkedList.getHead()
    const current = head?.next

    expect(linkedList.size()).to.equal(2)
    expect(head?.element).to.equal('Maria')
    expect(head?.next).to.instanceOf(Node)
    expect(current?.element).to.equal('João')
    expect(current?.next).to.equal(undefined)
  })

  it('Should return the position of an element', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')

    const position = linkedList.indexOf('João')

    expect(position).to.equal(1)
  })

  it('Should return the element of the position', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')

    const node = linkedList.getElementAt(1)

    expect(node?.element).to.equal('João')
  })

  it('Should return undefined in invalid positions', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')

    const node = linkedList.getElementAt(4)
    const position = linkedList.indexOf('Luffy')

    expect(node).to.be.undefined
    expect(position).to.equal(-1)
  })

  it('Should be insert an element in the chosen position', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')
    linkedList.insert('Luffy', 1)

    const positionLuffy = linkedList.indexOf('Luffy')

    expect(positionLuffy).to.equal(1)
  })

  it('Should remove an element from the chosen position', () => {
    const linkedList = mockLinkedList()

    linkedList.push('Maria')
    linkedList.push('João')

    const elementRemoved = linkedList.removeAt(1)
    const position = linkedList.indexOf('João')

    expect(elementRemoved).to.equal('João')
    expect(linkedList.size()).to.equal(1)
    expect(position).to.equal(-1)
  })

  it('Should throw an error when trying to remove or insert an element in an invalid position', () => {
    const linkedList = mockLinkedList()

    const error = 'A posição é inválida'

    expect(() => linkedList.removeAt(1)).to.throw(error)
    expect(() => linkedList.insert('João', 1)).to.throw(error)
  })

})