class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    sortScore(otherStudent) {
        return this.score === otherStudent.score ? this.name > otherStudent.name : this.score < otherStudent.score
    }
}
// export default Student;
module.exports = Student;