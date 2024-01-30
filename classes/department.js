class Department {
    constructor() {}

    viewDepartments() {
        db.query('SELECT * FROM department', function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.table(results);
        });
    };
};

module.exports = Department;