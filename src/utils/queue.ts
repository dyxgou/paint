class QNode<T> {
  value: T;
  next: QNode<T> | null;
  prev: QNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue<T> {
  #head: QNode<T> | null;
  #tail: QNode<T> | null;
  #length: number;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  put(value: T) {
    const newNode = new QNode<T>(value);

    if (this.isEmpty()) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail!.next = newNode;
      newNode.prev = this.#tail;
      this.#tail = newNode;
    }

    this.#length++;
  }

  get(): T | null {
    if (this.isEmpty() || !this.#head?.value) {
      return null;
    }

    const value = this.#head.value;

    this.#head = this.#head!.next;

    if (this.#head) {
      this.#head.prev = null;
    } else {
      this.#tail = null;
    }

    this.#length--;
    return value;
  }

  isEmpty(): boolean {
    return this.#head === null;
  }

  size() {
    return this.#length;
  }
}

export default Queue;
