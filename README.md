# Hippo

Assignment for Hippo - Frontend Developer

- The website is responsive
- Due to some major issues in the Foursquare API, details such as stats are not available. Also, only a single photo and tip is received from the API which is why you will see one tip and one photo on the venue page
- The maximum search results are limited to 4 in this app. You can change this in the `foursquare.service.ts` file. This was done because of the limited number of requests that the Foursquare API allows. 

## Development server

Run `ng serve` for a dev server

## Browser issues
Gotham Font in  Internet explorer is not supported as I was provided with .otf fonts and .otf fonts are not supported in Internet Explorer.

Internet explorer < 11 and browsers such as Opera mini do not support CSS grids. Therefore, the layout will not be pleasent.
