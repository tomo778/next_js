"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createNews, updateNews } from "services/News";
import { ModalForm } from "components/ModalForm";
import { Category, NewsItem } from "types";

type CreateForm = {
    id: number;
    title: string;
    text: string;
    category: number;
};

type NewsFormProps = {
    mode: "create" | "edit";
    newsItem: NewsItem | null;
    categorys: Category[];
};

type categoryValue = {
    title: string | null;
};

export function Form({ mode, newsItem, categorys }: NewsFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm<CreateForm>({ mode: "onChange" }); // Change mode to 'onChange'
    const [categorysChild, setCategorysChild] = useState<Category[]>([]);
    const [categoryValue, setCategoryValue] = useState<categoryValue>({
        title: null,
    });

    const router = useRouter();

    const onSubmit = async (data: object) => {
        if (mode === "edit") {
            const response = await updateNews(data);
        } else {
            const response = await createNews(data);
        }
        router.push("/");
    };

    const handleClickSetCategory = (id: number) => {
        for (var i = 0; i < categorysChild.length; i++) {
            if (categorysChild[i].id == id) {
                setValue("category", categorysChild[i].id);
                setCategoryValue((prevState) => ({
                    ...prevState,
                    title:
                        "id: " +
                        categorysChild[i].id +
                        " : " +
                        categorysChild[i].title,
                }));
                break;
            }
        }
    };

    useEffect(() => {
        setCategorysChild(categorys);
        if (mode === "edit" && newsItem) {
            setValue("id", newsItem.id);
            setValue("title", newsItem.title);
            setValue("text", newsItem.text);
            setValue("category", newsItem.add_category[0].id);
            setCategoryValue((prevState) => ({
                ...prevState,
                title: `id: ${newsItem.add_category[0].id} : ${newsItem.add_category[0].title}`,
            }));
        }
    }, [mode]);

    return (
        <>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("id")}></input>
                <div>
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        タイトル
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", {
                            required: "タイトルは必須です。",
                            maxLength: {
                                value: 300,
                                message: "300文字以下で入力してください。",
                            },
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onKeyUp={() => {
                            trigger("title"); // Trigger validation on key up
                        }}
                    />
                    {errors.title && (
                        <span className="text-red-600">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        記事
                    </label>
                    <textarea
                        rows={15}
                        {...register("text", {
                            required: "記事は必須です。",
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    {errors.text && (
                        <span className="text-red-600">
                            {errors.text.message}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        カテゴリ
                    </label>
                    <ModalForm
                        buttonLabel="カテゴリ登録"
                        categorys={categorys}
                        handleClickSetCategory={handleClickSetCategory}
                    />
                    <input
                        type="hidden"
                        {...register("category", {
                            required: "カテゴリは必須です。",
                        })}
                    ></input>
                    <span className="ml-4">{categoryValue.title}</span>
                    {errors.category && (
                        <p className="text-red-600">
                            {errors.category.message}
                        </p>
                    )}
                </div>
                <hr />
                <div className="mt-10">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {mode === "create" ? "作成する" : "更新する"}
                    </button>
                </div>
            </form>
        </>
    );
}
