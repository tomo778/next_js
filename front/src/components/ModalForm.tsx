"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Button } from "components/Button";
import { Category, CategoryState } from "types";

type Props = {
    buttonLabel: string;
    categorys: Category[];
    handleClickSetCategory: (id: number) => void;
};

export function ModalForm(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = useState(false);
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

    const toggleModal = (e: any) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        reset();
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

    const handleClick = (id: number) => {
        props.handleClickSetCategory(id);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setClass1();
        setCategorys(props.categorys);
    }, [isOpen]);

    return (
        <>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={toggleModal}
            >
                {props.buttonLabel}
            </button>
            {isOpen && (
                <div
                    className="relative z-10 text-gray-900"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3
                                                className="text-base font-semibold leading-6 text-gray-900"
                                                id="modal-title"
                                            >
                                                カテゴリ登録
                                            </h3>
                                            <div className="mt-4 break-words grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        1階層
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {categorysClass1.datas.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                                                                    onClick={() =>
                                                                        setClass2(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    {item.title}
                                                                    <Button
                                                                        title="追加"
                                                                        color="blue"
                                                                        action={() => {
                                                                            handleClick(
                                                                                item.id
                                                                            );
                                                                        }}
                                                                    />
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        2階層
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {categorysClass2.datas.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                                                                    onClick={() =>
                                                                        setClass3(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    {item.title}
                                                                    <Button
                                                                        title="追加"
                                                                        color="blue"
                                                                        action={() => {
                                                                            handleClick(
                                                                                item.id
                                                                            );
                                                                        }}
                                                                    />
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        3階層
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {categorysClass3.datas.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                                                                >
                                                                    {item.title}
                                                                    <Button
                                                                        title="追加"
                                                                        color="blue"
                                                                        action={() => {
                                                                            handleClick(
                                                                                item.id
                                                                            );
                                                                        }}
                                                                    />
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {/* <Button
                                        title="登録"
                                        color="blue"
                                        action={() => {
                                            props.parentMethod(
                                                props.category_id
                                            );
                                        }}
                                    /> */}
                                    {/* <Button
                                        title="閉じる"
                                        color="white"
                                        action={toggleModal}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
