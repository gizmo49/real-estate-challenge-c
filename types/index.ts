import { User as FirebaseUserType } from 'firebase/auth';

export interface FirebaseUser extends FirebaseUserType { }

export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

// Property Types
export interface Agent {
    name: string;
    phone: string;
}

export interface Property {
    id: string;
    name: string;
    address: string;
    price: string;
    image: string;
    description: string;
    agent: Agent;
    reviews: Review[];
}

// Review Types
export interface Review {
    id: string;
    comment: string;
    user: ReviewUser;
}

export interface ReviewUser {
    name: string;
    image: string;
}


export interface UserProfile {
    uid: string;
    favoriteProperties: string[];
}

export interface ISearchFormParams {
    selectedLocation: string; priceRange: string; propertyType: string
}


// interfaces.ts

interface Coordinate {
    lat: number;
    lon: number;
}

interface Address {
    city: string;
    line: string;
    street_name: string;
    street_number: string;
    street_suffix: string;
    country: string;
    postal_code: string;
    state_code: string;
    state: string;
    coordinate: Coordinate;
}

interface Location {
    address: Address;
    street_view_url: string;
}

interface Description {
    sub_type: string;
    type: string;
    beds: number;
    baths: number;
    lot_sqft: number;
    sqft: number;
    beds_max: number | null;
    beds_min: number | null;
    sqft_max: number | null;
    sqft_min: number | null;
    baths_full: number;
    baths_half: number | null;
    baths_min: number | null;
    baths_max: number | null;
    baths_full_calc: number;
    baths_partial_calc: number | null;
}

export interface GetPropertyResponse {
    property_id: string;
    listing_id: string;
    status: string;
    photo_count: number;
    location: Location;
    description: Description;
    primary_photo: { href: string };
    list_price: number;
    href: string;
}

export interface GetPropertiesResponse {
    data: {
        home_search: {
            results: GetPropertyResponse[];
        };
    };
}
