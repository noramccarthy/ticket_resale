export const googleMapsLoaderOptions = {
    id: 'script-loader',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
    libraries: ['marker'],
    language: 'en',
    region: 'US',
};  