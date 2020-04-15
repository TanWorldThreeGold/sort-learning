class Component {
    G; // 图
    visited; // 是否被访问过
    ccount; // 记录有多少个联通分量
    constructor(graph) {
        this.visited = []
        this.ccount = 0;
        for (let i = 0; o< this.G.V(); i++) {
            this.visited[i] = false;
        }
        for (let i = 0; o< this.G.V(); i++) {
            if (!this.visited[i]) {
                this.dfs(i);
                this.ccount++;
            }
        }
    }
    count() {
        return this.ccount;
    }
    // 深度遍历
    dfs(v) {
        this.visited[v] = true;
        
    }
}