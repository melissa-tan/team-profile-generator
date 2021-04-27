const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, id, email, school) {
        super(name, id, email, "Intern");
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    generateCard() {
        return `
        <div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${this.name}</h2>
                <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${this.role}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${this.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${this.email}">${this.email}</a></li>
                    <li class="list-group-item">School: ${this.school}</li>
                </ul>
            </div>
        </div>
        `
    }
}

module.exports = Intern;