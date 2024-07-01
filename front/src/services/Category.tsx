import axios from "utils/axios";

export const fetchCategory = async () => {
    try {
        const response = await axios.get("/api/category");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchCategoryById = async (params: object) => {
    try {
        const response = await axios.get("/api/category/showSubcategories", {
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
};

export const createCategory = async (data: object) => {
    try {
        const response = await axios.post("/api/category", data);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const updateCategory = async (data: object) => {
    try {
        const response = await axios.put(`/api/category/${data.id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

export const deleteCategory = async (category_id: string) => {
    try {
        const response = await axios.delete(`/api/category/${category_id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};

// export const fetchCategory = async () => {
//     return await axios(`/api/category`);
// };

// export const fetchCategoryById = async (data: object) => {
//     return await axios("/api/category/showSubcategories", {
//         method: "GET",
//         params: data,
//     });
// };

// export const createCategory = async (data: object) => {
//     return await axios("/api/category/create", {
//         method: "PUT",
//         params: data,
//     }).catch((error) => {
//         return error;
//     });
// };

// export const updateCategory = async (data: object) => {
//     await axios("/api/category/update", {
//         method: "PUT",
//         params: data,
//     });
// };

// export const deleteCategory = async (category_id: string) => {
//     await axios("/api/category/" + category_id, {
//         method: "DELETE",
//     });
// };
