# Star Seeker
<img src="./github_assets/baner.png" alt="Showcase" />

**Star Seeker** is simple Discord bot, that uses [NASA](https://api.nasa.gov/) and [open-notify](https://open-notify.org/) APIs, to retrive data about space! 

## Available commands

* `apod <date?>`: Astronomy Picture of the Day! You can add a date parameter to get the APOD from a specific day. Without a date parameter, the current day's APOD will be shown.

* `image <query>`: Find an image from NASA's library.

* `iss`: Get the current location of the International Space Station.

* `neo <date?>`: Get Near Earth Objects! You can add a date parameter to get NEO information from a specific day. Without a date parameter, the current day's NEO information will be shown.

* `people`: Get the current people in space, sorted by spacecraft!

* `black_hole <number>`: Delete a specified number of messages from the current channel.

* `space`: Display all available commands.

All these commands are the latest `slash commands`!

## Installation and Configuration
To run the bot, follow these steps:

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/DontAskForAnything/star-seeker.git
cd star-seeker
```
2. Install dependencies using npm
```bask
npm install
```
3. Fill in the `.env.example` file with your Discord bot token and NASA API key. Rename this file to `.env`. To obtain an API key for NASA APIs, refer to their documentation.

4. Start the bot using the following command:

```bask
npm start
```


## Contributing

All contributions are welcome to this project! If you have any suggestions or find any issues, please feel free to create a new issue or pull request.

## Disclaimer

This bot uses APIs provided by NASA and open-notify.org, and the data provided by these APIs are the property of their respective owners. The bot is not affiliated with NASA or open-notify.org, and I do not claim ownership of the data provided by these APIs. All rights to the data belong to their respective owners. Please refer to the API documentation for terms of use and attribution requirements.
