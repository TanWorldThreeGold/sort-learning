class UnionFind {
    constructor() {
        this.id = null;
        this.count = 0;
    }
    unionFind(n) {
        this.count = n;
        this.id = []
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
        }
    }
    find(p) {
        if (p >= 0 && p < this.count) {
            return this.id[p];
        }
    }
    isConnected(p, q) {
        return this.find(p) && this.find(p) == this.find(q);
    }
    unionElements(p, q) {
        let pID = this.find(p);
        let qID = this.find(q);
        if (pID && pID == qID) {
            return;
        }
        for (let i = 0; i < this.count; i++) {
            if (this.id[i] == pID) {
                this.id[i] = qID;
            }
        }
    }
}