class UnionFind2 {
    constructor() {
        this.parent = [];
        this.count = 0;
    }
    unionFind(count) {
        this.count = count;
        for (let i = 0; i < count; i++) {
            this.parent[i] = i;
        }
    }
    find(p) {
        if (p >= 0 && p < this.count) {
            while(p != this.parent[p]) {
                p = this.parent[p];
            }
            return p;
        }
    }
    isConnected(p, q) {
        return this.find(p) == this.find(q);
    }
    unionElements(p, q) {
        let pRoot = this.find(p);
        let qRoot = this.find(q);
        if (pRoot == qRoot) {
            return;
        }
        this.parent[pRoot] = qRoot;
    }
}