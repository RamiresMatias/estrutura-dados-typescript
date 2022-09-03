import {describe, it} from 'mocha'
import {expect} from 'chai'
import { Queue } from '../queue-deques/queue'

const mockQueue = () => {
  return new Queue<string>()
}

describe('Queue', () => {

  it('Should be insert an element in the queue', () => {
    const queue = mockQueue()

    queue.enqueue('John')
    queue.enqueue('Camilla')

    expect(queue.peek()).to.equal('John')
    expect(queue.getItems()).to.contains({0: 'John', 1: 'Camilla'})
    expect(queue.size()).to.equal(2)
  })


  it('Should be remove and return the element in the queue', () => {
    const queue = mockQueue()

    queue.enqueue('John')
    queue.enqueue('Camilla')

    let firstElement = queue.dequeue()

    expect(firstElement).to.equal('John')
    expect(queue.size()).to.equal(1)

    firstElement = queue.dequeue()

    expect(firstElement).to.equal('Camilla')
    expect(queue.size()).to.equal(0)

    firstElement = queue.dequeue()

    expect(firstElement).to.equal(undefined)
  })

  it('Should check if the queue is empty', () => {
    const queue = mockQueue()

    expect(queue.isEmpty()).to.true

    queue.enqueue('John')
    queue.enqueue('Camilla')

    expect(queue.isEmpty()).to.false
  })

  it('Should remove all elements from the queue', () => {
    const queue = mockQueue()

    queue.enqueue('John')
    queue.enqueue('Camilla')

    queue.clear()

    expect(queue.size()).to.equal(0)
    expect(queue.dequeue()).to.equal(undefined)
    expect(queue.isEmpty()).to.true
  })
})