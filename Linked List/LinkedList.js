const LinkedListNode = require('./LinkedListNode');
const Comparator = require('../utils/Comparator/Comparator');

class LinkedList {
constructor(comparatorFunction){
        this.head = null;
        this.tail = null

        this.compare = new Comparator(comparatorFunction)
    }

    prepend(value){
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;

        if(!this.tail){
            this.tail = newNode
        }

        return this
    }

    append(value){
        const newNode = new LinkedListNode(value);

        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            
            return this;
        }

        this.tail.next = newNode
        this.tail = newNode;

        return this;
    }

    delete(value){
        if(!this.head){
            return null;
        }

        let deletedNode = null;

        while(this.head && this.compare.equal(this.head.value , value)){
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if(currentNode !== null){
            while(currentNode.next){
                if(this.compare.equal(currentNode.next.value, value)){
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next
                }else{
                    currentNode = currentNode.next
                }
            }
        }

        if(this.compare.equal(this.tail.value, value)){
            this.tail = currentNode;
        }

    }

    find(value, callback = undefined){
        if(!this.head){
            return null;
        }

        let currentNode = this.head;

        while(currentNode){
            if(callback && callback(currentNode.value)){
                return currentNode
            }
console.log("currentNode.value",currentNode.value, this.compare.equal(currentNode.value, value))
            if(value != undefined && this.compare.equal(currentNode.value, value)){
                return currentNode
            }

            currentNode = currentNode.next;
        }

        return currentNode;
    }

    deleteTail(){
        let deletedNode = this.tail;

        if(this.head === this.tail){
            return deletedNode;
        }

        let currentNode = this.head;
        while(currentNode.next){
            if(!currentNode.next.next){
                currentNode.next = null
            }else{
                currentNode = currentNode.next
            }
        }

        this.tail = currentNode;

        return deletedNode
    }
    
    deleteHead(){
        if(!this.head){
            return null;
        }

        let currentNode = this.head;
        if(currentNode){
            currentNode = currentNode.next;
        }else{
            this.head = null
        }

        return this.head;
    }

    fromArrayToLinkedList(array){
        array.forEach(element => {
            this.append(element)    
        });

        return this;
    }

    toArrayFromLinkedList(){
        let array = [];

        let currentNode = this.head;
        while(currentNode){
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return array;
    }

    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    reverse(){
        let previousNode = null;
        let currentNode = this.head;

        while(currentNode){
            currentNode.next = previousNode;
            previousNode = currentNode;
            currentNode = currentNode.next
        }

        this.head = previousNode
    }
}

function main(){
    let ll = new LinkedList();
    ll.prepend(1);
    ll.append(2);
    console.log(ll.toArrayFromLinkedList())
    console.log(ll.find(2))
    return;
};

main();