class UnionFind4 {
    constructor() {
        this.parent = [];
        this.count = 0;
        this.rank = [] // rank[i]表示以i为根的集合所表示的树的层数
    }
    unionFind(count) {
        this.count = count;
        for (let i = 0; i < count; i++) {
            this.parent[i] = i;
            this.rank[i] = 1;
        }
    }
    find(p) {
        if (p >= 0 && p < this.count) {
            // while(p != this.parent[p]) {
            //     // 路径压缩
            //     this.parent[p] = this.parent[this.parent[p]];
            //     p = this.parent[p];
            // }
            // return p;
            if (p != this.parent[p]) {
                this.parent[p] = this.find(this.parent[p]);
            }
            return this.parent[p];
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
        if (this.rank[pRoot] < this.rank[qRoot]) {
            this.parent[pRoot] = qRoot;
        } else if (this.rank[pRoot] > this.rank[qRoot]) {
            this.parent[qRoot] = pRoot;
        } else { // this.rank[pRoot] == this.rank[qRoot]
            this.parent[pRoot] = qRoot;
            rank[qRoot] += 1;
        }
    }
}