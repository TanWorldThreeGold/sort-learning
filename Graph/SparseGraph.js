// 稀疏图 - 邻接表
class SparseGraph {
    n; // 顶点
    m; // 边数
    directed; // 有向图还是无向图
    g;
    constructor(n, directed) {
        this.n = n;
        this.m = 0;
        this.directed = directed;
        for (let i = 0; i < n; i++) {
            this.g.push([]);
        }
    }
    V() {
        return this.n;
    }
    E() {
        return this.m;
    }
    addEdege(v, w) {
        const vBool = (v >= 0 && v < n);
        const wBool = (w >= 0 && w < n);
        if (!vBool || !wBool) {
            return;
        }
        if (this.hasEdge(v, w)) {
            return;
        }
        this.g[v].push(w);
        if ( v != w && !this.directed) {
            this.g[w].push(v);
        }
        this.m++;
    }
    hasEdge(v, w) {
        const vBool = (v >= 0 && v < n);
        const wBool = (w >= 0 && w < n);
        if (!vBool || !wBool) {
            return;
        }
        for (let i = 0; i < this.g[v].length; i++) {
            if (this.g[v][i] == w) {
                return true;
            }
        }
        return false;
    }
}