import axios from 'axios';
import { collection, addDoc, query, orderBy, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';


interface Review {
    rating: number;
    comment: string;
    timestamp: Date;
    userId: string;
}

interface GetPropertiesParams {
    state_code: string;
    city: string;
    offset?: number;
    limit?: number;
    sort?: string;
    price_min?: number;
    price_max?: number;
    property_type?: string;
    type: string[];
}

interface UserProfile {
    uid: string;
    favoriteProperties: string[];
}

interface LocationResponse {
    autocomplete: Array<{
        area_type: string;
        _id: string;
        _score: number;
        city?: string;
        state_code: string;
        country: string;
        centroid: {
            lon: number;
            lat: number;
        };
        slug_id: string;
        geo_id: string;
        counties?: Array<{
            name: string;
            fips: string;
            state_code: string;
        }>;
        school_id?: string;
        school?: string;
        line?: string;
        postal_code?: string;
        has_catchment?: boolean;
        city_slug_id?: string;
        county?: string;
    }>;
}



const BASE_URL = 'https://realty-in-us.p.rapidapi.com';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
});


export const getLocations = async (input: string): Promise<LocationResponse> => {
    try {
        const response = await apiClient.get<LocationResponse>('/locations/v2/auto-complete', {
            params: {
                input,
                limit: '10',
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error fetching locations');
    }
};
// Fetch properties for sale
export const getPropertiesList = async (params: GetPropertiesParams) => {
    try {
        const cleanedParams = {
            city: params.city,
            state_code: params.state_code,
            offset: params.offset,
            limit: params.limit,
            sort: params.sort,
            list_price: { min: params.price_min, max: params.price_max },
            type: params.type.length ? params.type : undefined,
        };

        const response = await apiClient.post('/properties/v3/list', { ...cleanedParams });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch properties');
    }
};

// Fetch property details
export const getPropertyDetails = async (propertyId: string) => {
    try {
        const response = await apiClient.get('/properties/v3/detail', {
            params: { property_id: propertyId },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch property details');
    }
};

// Get user profile
export const getUserProfile = async (uid: string) => {
    try {
        const response = await apiClient.get(`/users/profile`, {
            params: { uid },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
};

export const getLocationSuggestions = async (query: string) => {
    try {
        const response = await apiClient.get('/locations/v2/auto-complete', {
            params: { query },
        });
        return response.data; // Adjust based on the response structure
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
        throw new Error('Failed to fetch location suggestions');
    }
};

// Update user profile
export const updateUserProfile = async (uid: string, profileData: Partial<UserProfile>) => {
    try {
        const response = await apiClient.post(`/users/profile`, { uid, ...profileData });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to update user profile');
    }
};


export const addPropertyReview = async (propertyId: string, review: Omit<Review, 'timestamp'>) => {
    try {
        const reviewsCollection = collection(db, 'properties', propertyId, 'reviews');
        await addDoc(reviewsCollection, { ...review, timestamp: new Date() });
    } catch (error: any) {
        throw new Error(`Error adding review: ${error.message}`);
    }
};

export const getPropertyReviews = async (propertyId: string) => {
    const reviewsRef = collection(db, 'properties', propertyId, 'reviews');
    const q = query(reviewsRef, orderBy('timestamp', 'desc'));

    try {
        const snapshot = await getDocs(q);
        const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as DocumentData }));
        return reviews;
    } catch (error: any) {
        throw new Error(`Error fetching reviews: ${error.message}`);
    }
};