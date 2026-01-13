module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            //Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            set(value){
                this.setDataValue('password', hash(value));
            }
        }
        /*Note: The above examples involving password handling, although much better than simply storing the password in plaintext, are far from perfect security. Handling passwords properly is hard, everything here is just for the sake of an example to show Sequelize functionality. We suggest involving a cybersecurity expert and/or reading OWASP documents and/or visiting the InfoSec StackExchange. - https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/*/
    });

    return User
    
}