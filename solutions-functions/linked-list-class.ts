class ListItem {
  value: number
  next: ListItem | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  head: ListItem | null

  constructor() {
    this.head = null
  }

  addNode(value: number) {
    const newItem = new ListItem(value)
    if (this.head === null) {
      this.head = newItem
      return
    }

    let current = this.head
    while (current.next !== null) {
      current = current.next
    }
    current.next = newItem
  }

  removeNodes(x: number) {

    while (this.head !== null && this.head.value > x) {
      this.head = this.head.next
    }

    let current = this.head
    while (current !== null && current.next !== null) {
      if (current.next.value > x) {
        current.next = current.next.next
      } else {
        current = current.next
      }
    }
  }
}


// usage example

const list = new LinkedList();
// biome-ignore lint/suspicious/useIterableCallbackReturn: this is not an error its just cuz this is present in the expo project and not a standalone file
[10, 5, 12, 7, 3, 9, 10].forEach(v => list.addNode(v))

list.removeNodes(7)

const result: number[] = []

let current = list.head
while (current !== null) {
  result.push(current.value)
  current = current.next
}



console.log(result.join(' '))