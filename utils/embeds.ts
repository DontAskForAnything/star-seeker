import { ApodData, Asteroid, ISSPosition, ImageData, PeopleData, SortedPeople } from "../interfaces";
import { timeFormatter } from "./date";

/**
 * Creates a Discord embed object for the Astronomy Picture of the Day command
 * @param {ApodData} data - The APOD data returned from the NASA API
 * @returns {Object} - A Discord embed object
 */
function createApodEmbed(data: ApodData) {
    // Set up the footer of the embed with copyright info (if available)
    const footer = {
        text: data?.copyright
            ? `copyright: ${data?.copyright}`
            : ""
    };

    return {
        color: 0x0099ff,
        author: {
            name: `⭐ Astronomy Picture of the Day ⭐ (${data.date})`
        },
        title: data.title,
        image: {
            url: data.url,
        },
        footer: footer
    };
}

/**
 * Create an embed for a NASA image search result.
 * @param query - The search query.
 * @param image - The image data returned from the API.
 * @returns {Object} - A Discord embed object
 */
function createImageEmbed(query: string, image: ImageData) {
    return {
        color: 0x0099ff,
        description: `Image that match \`${query}'\ query:`,
        image: {
            url: encodeURI(image.links[0].href) // Set the image URL, encoded to handle special characters
        },
        footer: {
            text: `${image.data[0].title} • ${image.data[0].date_created.substring(0, 10)}`
        },
        author: {
            name: "⭐ NASA image result ⭐"
        }
    };
}

/**
 * Creates an embed message displaying the current position of the ISS.
 * @param {ISSPosition} data - The data containing the current position of the ISS.
 * @returns {Object} - A Discord embed object
 */
function createISSPositionEmbed(data: ISSPosition) {
    return {
        color: 0x0099ff,
        author: {
            name: `⭐ Current ISS location ⭐`
        },
        description: `  Longitude: \`${data.iss_position.longitude}\`
                        Latitude:   \`${data.iss_position.latitude}\``,
        // fields:[
        //     {
        //         name: "Longitude",
        //         value: `\`${data.iss_position.longitude}\``,
        //         inline: true
        //     },
        //     {
        //         name: "Latitude",
        //         value: `\`${data.iss_position.latitude}\``,
        //         inline: true
        //     }
        // ],
        footer: {
            text: `Data from: open-notify.org • ${timeFormatter(new Date(data.timestamp * 1000))}`
        }
    };
}

/**
 * Creates an embed message displaying the current position of the ISS.
 * @param {ISSPosition} data - The data containing the current position of the ISS.
 * @returns {Object} - A Discord embed object
 */
function createNeoEmbed(date: string, asteroidsArray: Array<Asteroid>) {
    // Map the asteroids data array to a new array of objects with formatted fields
    // Each object represents an asteroid and has name, hazard status, diameter, and velocity fields
    // The inline field is set to true to display the asteroid information in a table format
    const fields = asteroidsArray.map((asteroid) => ({
        name: asteroid.name.replace(/[()]/g, ''),
        value: `${asteroid.is_potentially_hazardous_asteroid ? '⚠️ Hazard: true' : 'Hazard: false'}
                Diameter: ${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m
                Velocity: ${parseInt(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour)} km/h
                `,
        inline: true,
    }));

    return {
        color: 0x0099ff,
        author: {
            name: `⭐ Asteroids - NeoWs ⭐ (${date})`
        },
        fields,
        footer: {
            text: `All the data is from the NASA JPL Asteroid team`
        }
    };
}

/**
 * Creates an embed with information about people currently in space
 * @param data - Object containing data about people in space
 * @returns {Object} - A Discord embed object
 */
function createPeopleEmbed(data: PeopleData) {
    // Create a SortedPeople array from the people data and group them by craft
    const sortedPeople: SortedPeople[] = data.people.reduce<SortedPeople[]>((acc, person) => {
        const craft = person.craft;
        const name = person.name;

        // Check if the craft already exists in the acc array, if yes, add the name to its people array, else create a new object and push it into the acc array.
        const craftObject = acc.find(obj => obj.craft === craft);
        if (craftObject) {
            craftObject.people.push(name);
        } else {
            acc.push({ craft, people: [name] });
        }

        return acc;
    }, []);

    // Create an array of fields from the sortedPeople data, with each field containing the craft name and the list of people on the craft.
    const fields = sortedPeople.map((data) => ({
        name: `Craft: ${data.craft}`,
        value: data.people.join(",\n"),
        inline: true,
    }));

    return {
        color: 0x0099ff,
        author: {
            name: `⭐ Current People in Space ⭐`
        },
        description: `There are currently **${data.number}** humans in space.`,
        fields,
        footer: {
            text: `Data from: open-notify.org • ${timeFormatter(new Date())}`
        }
    };
}

export { createApodEmbed, createImageEmbed, createISSPositionEmbed, createNeoEmbed, createPeopleEmbed } 
