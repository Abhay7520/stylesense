const API_URL = 'http://localhost:8000';

export interface DatasetResponse {
    men_outfits: any[];
    women_outfits: any[];
    metadata: any;
}

export const fetchDataset = async (): Promise<DatasetResponse> => {
    const response = await fetch(`${API_URL}/dataset`);
    if (!response.ok) {
        throw new Error('Failed to fetch dataset');
    }
    return response.json();
};

export const generateDataset = async (menCount: number, womenCount: number): Promise<DatasetResponse> => {
    const response = await fetch(`${API_URL}/dataset/generate?men_count=${menCount}&women_count=${womenCount}`);
    if (!response.ok) {
        throw new Error('Failed to generate dataset');
    }
    return response.json();
};

export const uploadDataset = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/dataset/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload dataset');
    }
    return response.json();
};

export const getRecommendations = async (preferences: any): Promise<any[]> => {
    const response = await fetch(`${API_URL}/api/recommendations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
    }
    return response.json();
};
