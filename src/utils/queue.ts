class QNode<T> {
  value: T;
  next: QNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class Queue<T> {
  #front: QNode<T> | null;
  #back: QNode<T> | null;
  #length: number;

  constructor() {
    this.#front = null;
    this.#back = null;
    this.#length = 0;
  }

  put(value: T) {
    const newNode = new QNode(value);
    console.log({ newNode });

    this.#length++;

    if (this.isEmpty()) {
      this.#front = newNode;
      this.#back = newNode;
      return;
    }

    this.#back!.next = newNode;
    this.#back = newNode;
  }

  get(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.#front!.value;
    this.#front = this.#front!.next;
    this.#length--;

    if (this.isEmpty()) {
      this.#back = null;
    }

    return value;
  }

  size(): number {
    return this.#length;
  }

  isEmpty(): boolean {
    return this.#front === null;
  }
}

export default Queue;
