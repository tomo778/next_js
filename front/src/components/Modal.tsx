"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Button } from "components/Button";

type CreateForm = {
    id: number;
    title: string;
};

type Props = {
    buttonLabel: string;
    id: number;
    title: string;
    parentMethod: (data: object) => Promise<void>;
};

export function Modal(props: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        trigger,
    } = useForm<CreateForm>({ mode: "onChange" }); // Change mode to 'onChange'
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const onSubmit = (data: object) => {
        props.parentMethod(data);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={toggleModal}
            >
                {props.buttonLabel}
            </button>
            {isOpen && (
                <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3
                                                className="text-base font-semibold leading-6 text-gray-900"
                                                id="modal-title"
                                            >
                                                カテゴリ名変更
                                            </h3>
                                            <div className="mt-2">
                                                <form
                                                    className="space-y-4"
                                                    onSubmit={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    <input
                                                        type="hidden"
                                                        defaultValue={props.id}
                                                        {...register("id")}
                                                    ></input>
                                                    <div>
                                                        <label
                                                            htmlFor="name"
                                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                        >
                                                            カテゴリ名
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            defaultValue={
                                                                props.title
                                                            }
                                                            {...register(
                                                                "title",
                                                                {
                                                                    required:
                                                                        "タイトルは必須です。",
                                                                    maxLength: {
                                                                        value: 300,
                                                                        message:
                                                                            "300文字以下で入力してください。",
                                                                    },
                                                                }
                                                            )}
                                                            onKeyUp={() => {
                                                                trigger(
                                                                    "title"
                                                                ); // Trigger validation on key up
                                                            }}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            required
                                                        />
                                                        {errors.title && (
                                                            <span className="text-red-600">
                                                                {
                                                                    errors.title
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Button
                                        title="編集する"
                                        color="blue"
                                        action={handleSubmit(onSubmit)}
                                    />
                                    <Button
                                        title="閉じる"
                                        color="white"
                                        action={toggleModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
