// Home.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Title } from "components/Title";
import { Category, CategoryState } from "types";
import CategoryList from "components/CategoryList";
import {
    createCategory,
    fetchCategory,
    deleteCategory,
    updateCategory,
} from "services/Category";

export default function Home() {
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [categorysClass1, setCategorysClass1] = useState<CategoryState>({
        datas: [],
        state: "",
        category_title: "",
    });
    const [categorysClass2, setCategorysClass2] = useState<CategoryState>({
        datas: [],
        state: "",
        category_title: "",
    });
    const [categorysClass3, setCategorysClass3] = useState<CategoryState>({
        datas: [],
        state: "",
        category_title: "",
    });

    const dbSeparator = ",";

    const loadCategorys = async () => {
        const response = await fetchCategory();
        setCategorys(response.data);
    };

    const handleClickRegistCategory = async (data: object) => {
        await createCategory(data);
        loadCategorys();
    };

    const setClass1 = () => {
        //setCategorysClass1([]);
        let request_data: Category[] = [];
        for (var i = 0; i < categorys.length; i++) {
            if (categorys[i].class_id == 1) {
                request_data.push(categorys[i]);
            }
        }
        setCategorysClass1((prevState) => ({
            ...prevState,
            datas: request_data,
        }));
    };

    const setClass2 = (data: Category) => {
        setCategorysClass3((prevState) => ({
            ...prevState,
            datas: [],
            state: "",
            category_title: "",
        }));
        const request_data = makeListDatas(data.class_id, data.category_id);
        setCategorysClass2((prevState) => ({
            ...prevState,
            datas: request_data,
            state: data.category_id,
            category_title: data.title,
        }));
    };

    const setClass3 = (data: Category) => {
        const request_data = makeListDatas(data.class_id, data.category_id);
        setCategorysClass3((prevState) => ({
            ...prevState,
            datas: request_data,
            state: data.category_id,
            category_title: data.title,
        }));
    };

    const resetClass2 = () => {
        const request_data = makeListDatas(1, categorysClass2.state);
        setCategorysClass2((prevState) => ({
            ...prevState,
            datas: request_data,
        }));
    };

    const resetClass3 = () => {
        const request_data = makeListDatas(2, categorysClass3.state);
        setCategorysClass3((prevState) => ({
            ...prevState,
            datas: request_data,
        }));
    };

    const makeListDatas = (class_id: number, category_id: string) => {
        let request_data: Category[] = [];
        for (var i = 0; i < categorys.length; i++) {
            if (
                categorys[i].class_id == class_id + 1 &&
                categorys[i].category_id.startsWith(category_id + dbSeparator)
            ) {
                request_data.push(categorys[i]);
            }
        }
        return request_data;
    };

    const handleClickDeleteUser = async (category_id: string) => {
        await deleteCategory(category_id);
        loadCategorys();
    };

    const handleClickUpdateUser = async (data: object) => {
        await updateCategory(data);
        loadCategorys();
    };

    useEffect(() => {
        loadCategorys();
    }, []);

    useEffect(() => {
        setClass1();
        resetClass2();
        resetClass3();
    }, [categorys]);

    return (
        <>
            <Header />
            <main className="container px-4 mx-auto">
                <Title title="カテゴリ登録" />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CategoryList
                        class_id={1}
                        title="カテゴリ1階層"
                        data={categorysClass1}
                        handleClickRegistCategory={handleClickRegistCategory}
                        setClass2={setClass2}
                        setClass3={setClass3}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    />
                    <CategoryList
                        class_id={2}
                        title="カテゴリ2階層"
                        data={categorysClass2}
                        handleClickRegistCategory={handleClickRegistCategory}
                        setClass2={setClass2}
                        setClass3={setClass3}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    />
                    <CategoryList
                        class_id={3}
                        title="カテゴリ3階層"
                        data={categorysClass3}
                        handleClickRegistCategory={handleClickRegistCategory}
                        setClass2={setClass2}
                        setClass3={setClass3}
                        handleClickUpdateUser={handleClickUpdateUser}
                        handleClickDeleteUser={handleClickDeleteUser}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}
