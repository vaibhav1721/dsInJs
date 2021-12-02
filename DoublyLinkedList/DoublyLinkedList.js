const Comparator = require("../utils/Comparator/Comparator");
const DoublyLinkedListNode = require('./DoublyLinkedListNode');

class DoublyLinkedList {
    constructor(comparatorFunction){
        this.head = null;
        this.tail = null;

        this.compare = new Comparator(comparatorFunction)
    }

    prepend(value){
        let newNode = new DoublyLinkedListNode(value, this.head);

        if(this.head){
            this.head.previous = newNode
        }

        this.head = newNode;

        if(!this.tail){
            this.tail = newNode;
        }

        return this;
    }

    append(value){
        let newNode = new DoublyLinkedListNode(value);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        newNode.previous =  this.tail;
        this.tail = newNode;

        return this;
    }

    delete(value){
        let deletedNode = null;
        
        if(!this.head){
            return null;
        }

        let currentNode = this.head;

        while(currentNode){
            if(this.compare.equal(currentNode.value, value)){
                deletedNode = currentNode;

                if(deletedNode === this.head){
                    this.head = this.head.next
                    if (this.head) {
                        this.head.previous = null;
                      }
                      if (deletedNode === this.tail) {
                        this.tail = null;
                      }
                } else if(deletedNode === this.tail){
                    this.tail = deletedNode.previous;
                    this.tail.next = null;
                }else{
                    let previousNode = currentNode.previous;
                    let nextNode     = currentNode.next;

                    previousNode.next =  nextNode;
                    nextNode.previous = previousNode;
                }
            }
            currentNode = currentNode.next
        }
        return deletedNode;
    }

    find(value= undefined, callback= undefined){
        let currentNode = this.head;
        while(currentNode){

            if (callback && callback(currentNode.value)) {
                return currentNode;
              }
            if(value && this.compare.equal(currentNode.value,value)){
                return currentNode
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    deleteTail(){
        if(this.head){
            this.tail = this.head.previous;
            this.tail.next = null
        }else{
            this.head = null;
            this.tail = null;
        }
        return this.tail;
    }

    deleteHead(){
        if(this.head){
            this.head.next = this.head;
            this.head.previous = null
        }else{
            this.head = null;
            this.tail = null;
        }
        return this;  
    }

    toArrayFromLinkedList(){
        let array = []

        let currentNode = this.head;
        while(currentNode){
            array.push(currentNode.value)
            currentNode = currentNode.next
        }

        return array;
    }

    reverse(){
        let currentNode = this.head;
        let previousNode = null;
        let nextNode     = null;

        while(currentNode){
            previousNode = currentNode.previous;
            nextNode     = currentNode.next;

            currentNode.next = previousNode;
            currentNode.previous = nextNode;

            previousNode =  currentNode;
            currentNode =  nextNode;
        }

        this.tail = this.head;
        this.head = previousNode
        
        return this;
    }
}


function main(){
    let ll = new DoublyLinkedList();
    ll.prepend(1);
    ll.append(2);
    console.log(ll.toArrayFromLinkedList())
    console.log(ll.find(2));
    console.log(ll.toArrayFromLinkedList())
    ll.reverse();
    ll.append(3);
    console.log(ll.toArrayFromLinkedList())
    ll.delete(3)
    console.log(ll.toArrayFromLinkedList())
    return;
};

main();