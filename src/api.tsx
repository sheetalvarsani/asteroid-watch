const API_KEY = import.meta.env.REACT_NASA_API_KEY;

// Fetch asteroids within a date range that are also only Earth orbiting ones::
const fetchAsteroids = (startDate: string, endDate: string) => {
    const asteroids: any[] = []; // Empty array for filtered asteroids

    // Convert the start and end dates from string format to Date objects
    const dateRange = new Date(startDate);
    const dateEnd = new Date(endDate);

    // Helper function to fetch asteroids within date intervals as API only returns data within a 7-day window:

    const fetchNextDateRange = (): Promise<any[]> => {
        // If the current date range is within the end date, continue fetching
        if (dateRange <= dateEnd) {
            // Create a date 7 days ahead of the current date range
            const nextDate = new Date(dateRange);
            nextDate.setDate(dateRange.getDate() + 7);

            // If the next date exceeds the end date, adjust the range end to the actual end date
            const rangeEnd = nextDate > dateEnd ? dateEnd : nextDate;

            // Fetch asteroid data for date range:
            return fetch(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${
                    dateRange.toISOString().split("T")[0]
                }&end_date=${
                    rangeEnd.toISOString().split("T")[0]
                }&api_key=${API_KEY}`
            )
                .then((response) => {
                    if (!response.ok)
                        throw new Error("Network response was not ok"); // Throw an error if API request unsuccessful
                    return response.json();
                })
                .then((data) => {
                    // Make sure only asteroids near Earth are fetched:
                    const earthOrbitingAsteroids = Object.values(
                        data.near_earth_objects
                    )
                        .flat() // merge arrays into one array as data is nested
                        .filter((asteroid: any) =>
                            asteroid.close_approach_data.some(
                                (approach: any) =>
                                    approach.orbiting_body === "Earth"
                            )
                        );

                    // Add filtered asteroids to existing array
                    asteroids.push(...earthOrbitingAsteroids);

                    // Move the date range forward by 7 days for the next API call
                    dateRange.setDate(dateRange.getDate() + 7);

                    return fetchNextDateRange(); // Continue fetching the next batch of data as required by date range
                });
        } else {
            return Promise.resolve(asteroids); // If the date range exceeds the end date, resolve the Promise and return the asteroids array
        }
    };

    // Start fetching the asteroids for the given date range
    return fetchNextDateRange();
};


export default fetchAsteroids;


// Start with empty array to store asteroids and convert the start and end dates from strings to Date objects.
// Fetch Data:
// - The fetchNextDateRange function handles fetching asteroid data in chunks of 7 days because the NASA API only provides data for 7-day range.
// - It checks if the current date range is within the overall end date.
// - If so, it calculates the next date range and fetches data for that range from the NASA API.
// - After fetching, it checks if the fetched asteroids are orbiting Earth, merges nested arrays into a single array, and adds these asteroids to the main array.
// - It then moves the date range forward by 7 days and calls itself recursively to fetch the next batch of data.
// If the entire date range has been processed, it returns the accumulated asteroids.
// The function starts the fetching process by calling fetchNextDateRange.
// This function uses promises to handle asynchronous data fetching and continues fetching until the entire date range is processed.







