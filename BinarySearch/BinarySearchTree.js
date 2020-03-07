class BST {
    key = null;
    value = null;
    left = null;
    right = null;
    constructor() {
        this.rootNode = null;
        this.count = 0;
    }
    createNode(key, value) {
        return {
            key,
            value,
            left: null,
            right: null
        }
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.count === 0;
    }
    insert(key, value) {
        this.rootNode = this.insertNode(this.rootNode, key, value);
    }
    // 向以node为根的二叉搜索树中，插入节点(key, value)
    // 返回插入新节点后的二叉搜索树的根
    insertNode(node, key, value) {
        if (node == null) {
            this.count++;
            return this.createNode(key, value);
        }
        if (key == node.key) {
            node.value = value;
        } else if (key < node.key) {
            node.left = this.insertNode(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key, value);
        }
        return node;
    }
    contain(key) {
        return this.containNode(this.rootNode, key);
    }
    // 查看以node为根的二叉搜索树中是否包含键值为key的节点
    containNode(node, key) {
        if (node == null) {
            return false;
        }
        if (key == node.key) {
            return true;
        } else if (key < node.key) {
            return this.containNode(node.left, key);
        } else if (key > node.key) {
            return this.containNode(node.right, key);
        }
    }
    // 在以node为根的二叉搜索树中查找key所对应的value
    search(node, key) {
        if (node == null) {
            return null;
        }
        if (key == node.key) {
            return node.value
        } else if (key < node.key) {
            return this.search(node.left, key);
        } else if (key > node.key) {
            return this.search(node.right, key);
        }
    }
    // 前序遍历
    preOrder() {
        this.preOrderNode(this.rootNode);
    }
    preOrderNode(node) {
        if (node != null) {
            console.log(node.key);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    // 中序遍历
    inOrder() {
        this.inOrderNode(this.rootNode);
    }
    inOrderNode(node) {
        if (node !== null) {
            this.inOrderNode(node.left);
            console.log(node.key);
            this.inOrderNode(node.right);
        }
    }
    // 后序遍历
    postOrder() {
        this.postOrderNode(this.rootNode);
    }
    postOrderNode(node) {
        if (node !== null) {
            this.preOrder(node.left);
            this.preOrder(node.right);
            console.log(node.key);
        }
    }
    // 前中后序遍历都是深度遍历 层序遍历是广度遍历
    // 层序遍历
    levelOrder() {
        let q = [];
        q.push(this.rootNode);
        while (q.length !== 0) {
            let node = q.shift();
            console.log(node.key);
            if (node.left) {
                q.push(node.left);
            }
            if (node.right) {
                q.push(node.right);
            }
        }
    }
    // 寻找最小的键值
    minimunKey() {
        let minNode = this.minimumNode(this.rootNode);
        return minNode.key;
    }
    minimumNode(node) {
        if (node.left == null) {
            return node;
        }
        return this.minimumNode(node.left);
    }
    // 寻找最大的键值
    maximunKey() {
        let maxNode = this.maximumNode(this.rootNode);
        return maxNode.key;
    }
    maximumNode(node) {
        if (node.right == null) {
            return node;
        }
        return this.maximumNode(node.right);
    }
    // 从二叉树中删除最小值所在节点
    removeMin() {
        if (this.rootNode) {
            this.rootNode = removeMinNode(this.rootNode);
        }
    }
    // 删除掉以node为根的二分搜索树中的最小节点
    // 返回删除节点后新的二分搜索树的根
    removeMinNode(node) {
        if (node.left == null) {
            let rightNode = node.right;
            this.count--;
            return rightNode;
        }
        node.left = this.removeMinNode(node.left);
        return node;
    }
    // 从二叉树中删除最大值所在节点
    removeMax() {
        if (this.rootNode) {
            this.rootNode = removeMaxNode(this.rootNode);
        }
    }
    // 删除掉以node为根的二分搜索树中的最大节点
    // 返回删除节点后新的二分搜索树的根
    removeMaxNode(node) {
        if (node.right == null) {
            let leftNode = node.left;
            this.count--;
            return leftNode;
        }
        node.right = this.removeMaxNode(node.right);
        return node;
    }
    // 从二叉树中删除键值为key的节点
    remove(key) {
        return removeNode(this.rootNode, key);
    }
    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else { // key == node.key
            if (node.left = null) {
                let rightNode = node.right;
                this.count--;
                return rightNode;
            }
            if (node.right = null) {
                let leftNode = node.left;
                this.count--;
                return leftNode;
            }
            // node.left != null && node.right != null
            // 选this.maximumNode(node.left)也可以
            let successor = this.copyNode(this.minimumNode(node.right));
            this.count++;
            successor.right = this.removeMin(node.right);
            successor.left = node.left;
            this.count--;
            return successor;
        }
    }
    copyNode(node) {
        return {
            key: node.key,
            value: node.value,
            left: node.left,
            right: node.right
        }
    }
}

function main() {
    let treeNode = new BST();
    treeNode.insert(10, 5);
    treeNode.insert(6, 8);
    treeNode.insert(1, 4);
    treeNode.insert(2, 6);
    treeNode.insert(3, 82);
    treeNode.insert(4, 81);
    console.log(treeNode.rootNode);
}
main();