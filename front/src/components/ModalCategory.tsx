"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { Button } from "components/Button";

type Props = {
    buttonLabel: string;
    classID: number;
    categoryID: string;
    parentMethod: (data: object) => void;
};

export function ModalCategory(props: Props) {
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        reset();
    };

    const onSubmit = (data: object) => {
        props.parentMethod(data);
        setIsOpen(!isOpen);
    };

    return (
        <>
            <h3 className="font-semibold" onClick={toggleModal}>
                {props.buttonLabel}
            </h3>
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
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3
                                                className="text-base font-semibold leading-6 text-gray-900"
                                                id="modal-title"
                                            >
                                                カテゴリ登録
                                            </h3>
                                            <div className="mt-2">
                                                <form className="space-y-4">
                                                    <input
                                                        type="hidden"
                                                        value={props.classID}
                                                        {...register(
                                                            "class_id"
                                                        )}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        value={props.categoryID}
                                                        {...register(
                                                            "category_id"
                                                        )}
                                                    />
                                                    <div>
                                                        <div className="max-w-sm space-y-3">
                                                            <textarea
                                                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                                rows={5}
                                                                {...register(
                                                                    "categorys"
                                                                )}
                                                                placeholder="改行して複数登録"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Button
                                        title="登録する"
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
