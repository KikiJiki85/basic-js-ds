const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) this.rootNode = newNode;
    else {
      let current = this.rootNode;

      while (true) {
        if (data < current.data) {
          if (current.left === null) {
            current.left = newNode;
            break;
          } else current = current.left;

        } else if (data > current.data) {
          if (current.right === null) {
            current.right = newNode;
            break;
          } else current = current.right;

        } else break;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.rootNode;
    while (current !== null) {
      if (data === current.data) return current;
      else if (data < current.data) current = current.left;
      else current = current.right;
    }
    return null;
  }

  remove(data) {
    let current = this.rootNode;
    let parent = null;
    let isLeftChild = false;

    while (current !== null && current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        isLeftChild = true;
      } else {
        current = current.right;
        isLeftChild = false;
      }
    }

    if (current === null) {
      return;
    }

    if (current.left === null && current.right === null) {
      if (current === this.rootNode) this.rootNode = null;
      else if (isLeftChild) parent.left = null;
      else parent.right = null;

    } else if (current.right === null) {
      if (current === this.rootNode) this.rootNode = current.left;
      else if (isLeftChild) parent.left = current.left;
      else parent.right = current.left;

    } else if (current.left === null) {
      if (current === this.rootNode) this.rootNode = current.right;
      else if (isLeftChild) parent.left = current.right;
      else parent.right = current.right;

    } else {
      let successor = this.getSuccessor(current);
      if (current === this.rootNode) this.rootNode = successor;
      else if (isLeftChild) parent.left = successor;
      else parent.right = successor;
      successor.left = current.left;
    }
  }

  getSuccessor(node) {
    let successor = node;
    let successorParent = node;
    let current = node.right;

    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    if (successor !== node.right) {
      successorParent.left = successor.right;
      successor.right = node.right;
    }

    return successor;
  }

  min() {
    let current = this.rootNode;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current !== null ? current.data : null;
  }

  max() {
    let current = this.rootNode;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current !== null ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree
};