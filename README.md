# Predict Diseases #

Please follow the following steps to run the project on your local machine.

If you have `homebrew` installed please use `homebrew` for installation of `node` and `npm`. This solves a known problem of having to work with `sudo` everytime you install a node package. 

## Install node and npm

`brew update`

`brew install node`

To test everything installed properly do 

`node -v`

`npm -v`

 (OR)

`sudo apt-get update`

`sudo apt-get install nodejs`

`sudo apt-get install npm`

This will install `nodejs` binary globally. You will have to create a sym-link to `node` using the path it was installed in. You can do `whereis nodejs` to determine the path. This is to be done so that you can use `node script.js` instead of `nodejs script.js` which is required for the react-app to work. 

## Upgrading node and npm

`brew update`

`brew upgrade node`

## Clone the Repo ##

`git clone https://github.com/jats22/Predict-diseases-.git`

`cd Predict-diseases-`

## Install node packages ##

`npm install`

## Run the project ##

`npm run start`


The project should run at `http://localhost: 3000`
The login page is available at `http://localhost:3000/login`

## Build the project ##

`npm run build`


The `build` folder should be created which you can host like any other static website.
