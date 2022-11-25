# Blockchain-Prototype

### Description

This project serves multiple purposes. For one it was used primarly as a lab for my talks regarding blockchain and their use in cryptocurrencies (old 2020 talks). Secondly the more recent commits in this repository take a methodical and pedagogical approach to the subject to go from a crude mvp to a decently engineered blockchain. 

### Roadmap

This is early development version. I am currently considering:

-   [x] Create a simple blockchain structure.
-   [x] Implement a simple Proof of work mechanism.
-   [x] Create Transactions .
-   [x] Sign Transactions with .
-   [ ] Add express to our project to create a full fleged api.
-   [ ] Make a front-end interface for our app.
-   [ ] Add proof of concept.
-   [ ] Add a user space and basic routes.
-   [ ] Add tests.
-   [ ] Better examples.
-   [ ] (Optional) Go further.

### Dependencies

run npm install to install all the dependencies. (for a complete list of all the dependencies check package.json)

-   npm
    ```sh
    npm install
    ```

### Installing

-   git
    ```sh
    git clone git@github.com:HipMaze/BlockchainPrototype.git
    ```

### Executing program

-   before running the code be sure to create a dotenv file with the required environement variables

    ```
      #Mining Difficulty
      miningDifficulty=

      #Mining Reward
      miningReward=
    ```

-   node
    ```sh
    node src/main.js
    ```

## Help

if you find any problem using this project, if you find any bugs, or if you need help adapting it to your needs be sure to create a new issue i will answer it asap.

## Authors

-   Ayman El Azm : [@HipMaze](https://github.com/HipMaze)

## License

This project is licensed under the [MIT](LICENSE) License - see the LICENSE.md file for details

## Acknowledgments

This project started as me following [@Savjee](https://github.com/Savjee)'s tutorial (listed below) but it slowly evolved as i followed the roadmap (above).

-   [SavjeeCoin](https://github.com/Savjee/savjeecoin)
