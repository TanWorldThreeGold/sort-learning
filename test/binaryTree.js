// 排序二叉树的实现

class Node {
  left = null
  right = null
  constructor(val) {
    this.val = val
  }
}

class BinaryTree {
  root = null
  insert(val) {
    let newNode = new Node(val)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  insertNode(node, newNode) {
    if (node.val > newNode.val) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }
  // 前序遍历
  preOrderTraverseNode(node, cb) {
    if (node !== null) {
      cb(node.val)
      this.preOrderTraverseNode(node.left, cb)
      this.preOrderTraverseNode(node.right, cb)
    }
  }
  preOrderTraverse(cb) {
    this.preOrderTraverseNode(this.root, cb)
  }
  // 中序遍历
  inOrdertraverseNode(node, cb) {
    if (node !== null) {
      this.inOrdertraverseNode(node.left, cb)
      cb(node.val)
      this.inOrdertraverseNode(node.right, cb)
    }
  }
  inOrderTraverse(cb) {
    this.inOrdertraverseNode(this.root, cb)
  }
  // 后续遍历
  postOrderTraverseNode(node, cb) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, cb)
      this.postOrderTraverseNode(node.right, cb)
      cb(node.val)
    }
  }
  postOrderTraverse(cb) {
    this.postOrderTraverseNode(this.root, cb)
  }
  // 查找最小值
  minNode(node) {
    if (node !== null) {
      if(node.left !== null) {
        return this.minNode(node.left)
      }
      return node.val
    }
    return null
  }
  min() {
    return this.minNode(this.root)
  }
  // 查找最大值
  maxNode(node) {
    if (node !== null) {
      if(node.right !== null) {
        return this.maxNode(node.right)
      }
      return node.val
    }
    return null
  }
  max() {
    return this.maxNode(this.root)
  }
  // 查找给定数值
  searchNode(node, target) {
    if (node === null) {
      return null
    }
    if (node.val === target) {
      return node
    } else if (node.val > target) {
      return this.searchNode(node.left, target)
    } else {
      return this.searchNode(node.right, target)
    }
  }
  search(target) {
    return this.searchNode(this.root, target)
  }
  // 删除节点
  removeNode(node, target) {
    if (node === null) {
      return null
    }
    if (node.val < target) {
      node.right = this.removeNode(node.right, target)
      return node
    } else if (node.val > target) {
      node.left = this.removeNode(node.left, target)
      return node
    } else {
      // 4种情况
      if (node.left === null && node.right === null) {

        
        node = null
        return node
      }
      if (node.left === null) {
        node = node.right
        return node
      }
      if (node.right === null) {
        node = node.left
        return node
      }
      let aux = this.findMinNode(node.right)
      node.val = aux.val
      node.right = this.removeNode(node.right, aux.val)
      return node
    }
  }
  remove(target) {
    this.root = this.removeNode(this.root, target)
  }
  findMinNode(node) {
    if (node !== null) {
      if(node.left !== null) {
        return this.findMinNode(node.left)
      }
      return node
    }
    return null
  }
}

var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13]
var binaryTree = new BinaryTree()
nodes.forEach((val) => {
  binaryTree.insert(val)
})
// console.log(binaryTree.root)

var cb = function(val) {
  console.log(val)
}

// binaryTree.inOrderTraverse(cb)
// binaryTree.preOrderTraverse(cb)
// binaryTree.postOrderTraverse(cb)
// console.log(binaryTree.min())
// console.log(binaryTree.max())
// console.log(binaryTree.search(7))
binaryTree.remove(10)
console.log(binaryTree.root)