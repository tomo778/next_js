"use client";

import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Title } from "components/Title";
import React, { useState, useEffect } from "react";
import { Form } from "components/Form";
import { Loading } from "components/Loading";
import { fetchCategory } from "services/Category";
import { Category } from "types";

export default function NewsCreatePage() {
    const [categorys, setCategorys] = useState<Category[]>([]);

    const loadCategorys = async () => {
        const response = await fetchCategory();
        setCategorys(response.data);
    };

    useEffect(() => {
        loadCategorys();
    }, []);

    if (Object.keys(categorys).length === 0) {
        return <Loading></Loading>;
    }
    return (
        <>
            <Header></Header>
            <main className="container px-4 mx-auto">
                <Title title="登録" />
                <Form mode="create" newsItem={null} categorys={categorys} />
            </main>
            <Footer></Footer>
        </>
    );
}
