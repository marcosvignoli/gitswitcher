# How to:

- to use this script first run

```
npm install
```

- create the .env file with this two envs:

```
personal="your personal github access token"
work="your work github access token"
```

- then run the main.js file with the correspondent arg.

```
node main.js personal
```

or

```
node main.js work
```

# trouble shooting

The script at the first time doesn't know which username has your windows credential

- Search for "windows credential manager"
- Delete all "github" related keys
- Run the script again an monitor if the keys are being created
