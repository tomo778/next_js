import axios from "utils/axios";
import { NewsItem, PaginatedNews } from "types";

const API_BASE_URL = "/api/news";

export const fetchNews = async (
    page: string | null
): Promise<PaginatedNews> => {
    try {
        const response = await axios.get(`${API_BASE_URL}?page=${page}`);
        //console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
};

export const getNewsById = async (id: number): Promise<NewsItem> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch news by id: ${error.message}`);
    }
};

export const createNews = async (data: Partial<NewsItem>): Promise<void> => {
    try {
        await axios.put(`${API_BASE_URL}/create`, data);
    } catch (error) {
        throw new Error(`Failed to create news: ${error.message}`);
    }
};

export const updateNews = async (data: Partial<NewsItem>): Promise<void> => {
    try {
        await axios.put(`${API_BASE_URL}/update`, data);
    } catch (error) {
        throw new Error(`Failed to update news: ${error.message}`);
    }
};

export const deleteNews = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        throw new Error(`Failed to delete news: ${error.message}`);
    }
};

// export const fetchNews = async (page: string | null) => {
//     return await axios(`/api/news?page=${page}`);
// };

// export const getByIdNews = async (id: number) => {
//     return await axios(`/api/news/${id}`);
// };

// export const createNews = async (data: object) => {
//     return await axios("/api/news/create", {
//         method: "PUT",
//         params: data,
//     }).catch((error) => {
//         return error;
//     });
// };

// export const updateNews = async (data: object) => {
//     await axios("/api/news/update", {
//         method: "PUT",
//         params: data,
//     });
// };

// export const deleteNews = async (id: number) => {
//     await axios("/api/news/" + id, {
//         method: "DELETE",
//     });
// };
