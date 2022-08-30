class Queue{
  constructor() {
    this.queue = {}
    this.count = 0
    this.head = 0
  }

  enqueue(element){
    this.queue[this.count] = element
    this.count++
    return Object.values(this.queue)
  }

  dequeue(){
    const result = this.queue[this.head]
    delete this.queue[this.head]
    this.head++
    return result
  }

  peek(){
    return this.queue[this.head]
  }

  front(){
    return this.queue[this.head]
  }

  back(){
    return this.queue[this.count - 1]
  }

  size(){
    return this.count - this.head
  }

  print(){
    console.log(Object.values(this.queue))
  }

  isEmpty(){
    return this.count === this.head
  }

  clear(){
    this.queue = {}
    this.count = 0
    this.head = 0
  }
}

let queue = new Queue()

// console.log(queue.isEmpty());
// console.log(queue.enqueue('Azul'));
// console.log(queue.enqueue('Esmeralda'));
// console.log(queue.enqueue('Verde'));
// console.log(queue.enqueue('Amarillo'));
// console.log(queue.enqueue('Rojo'));
// queue.print();
// console.log(queue.size());
// console.log(queue.dequeue());
// console.log(queue.dequeue());
// queue.print();
// console.log(queue.peek());
// console.log(queue.size());
// console.log(queue.front());
// console.log(queue.back());
// console.log(queue.isEmpty());
// queue.clear();
// console.log(queue.isEmpty());