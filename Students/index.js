import chalk from "chalk";

const students = ['Quentin', 'Steve', 'Sofiane', 'Elisa'];

function displayStudents() {
    const colors = [chalk.blue, chalk.green, chalk.red, chalk.yellow];

    students.forEach((student, i) => {
        const color = colors[i % colors.length];
        console.log(color(student));
    });
}

displayStudents();