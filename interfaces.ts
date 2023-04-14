// PeopleData interface for storing information about people in space
interface PeopleData {
    number: number;
    people: {
        craft: string;
        name: string;
    }[];
}

// SortedPeople interface for storing people in space categorized by spaceship
interface SortedPeople {
    craft: string;
    people: string[];
}

// Asteroid interface for storing NEO asteroid objects information
interface Asteroid {
    links: {
        self: string;
    };
    name: string;
    estimated_diameter: {
        meters: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: {
        close_approach_date_full: string;
        relative_velocity: {
            kilometers_per_hour: string;
        };
    }[];
}

// ISSPosition for storing information about ISS position
interface ISSPosition {
    timestamp: number;
    iss_position: {
        longitude: string;
        latitude: string;
    }
}

// ImageData interface for storing information about image
interface ImageData {
    links: {
        href: string;
    }[];
    data: {
        title: string;
        date_created: string;
    }[];
}

// ApodData interface for storing information about APOD (Astronomy Picture of the Day)
interface ApodData {
    date: string;
    title: string;
    explanation: string;
    url: string;
    copyright?: string;
}

// Export all the interfaces for use in other files
export { PeopleData, SortedPeople, Asteroid, ISSPosition, ImageData, ApodData }
