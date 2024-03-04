const importUsers = () => {
    bcrypt
    .hash("etml", 10) // temps pour hasher = du sel
    .then((hash) =>
    User.create({
    username: "etml",
    password: hash,
    })
    )
    .then((user) => console.log(user.toJSON()));
    };

export { importUsers }