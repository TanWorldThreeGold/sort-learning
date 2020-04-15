// 稠密图 - 邻接矩阵
class DenseGraph {
    n; // 顶点
    m; // 边
    directed; // 是有相图还是无向图
    g;
    constructor(n, directed) {
        this.n = n;
        this.m = 0;
        this.directed = directed;
        for (let i = 0; i < n; i++) {
            this.g.push([n, false]);
        }
    }
    V() {
        return this.n;
    }
    E() {
        return this.m;
    }
    addEdge(v, w) {
        const vBool = (v >= 0 && v < n);
        const wBool = (w >= 0 && w < n);

        if (!vBool || !wBool) {
            return;
        }
        if (this.hasEdge(v, w)) {
            return;
        }
        this.g[v][w] = true;
        if (!this.directed) {
            this.g[w][v] = true;
        }
        this.m++;
    }
    hasEdge(v, w) {
        const vBool = (v >= 0 && v < n);
        const wBool = (w >= 0 && w < n);
        if (!vBool || !wBool) {
            return;
        }
        return this.g[v][w];
    }
}