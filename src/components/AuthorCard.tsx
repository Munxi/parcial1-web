"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useAuthors} from "@/components/AuthorContext";

const PLACEHOLDER = "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png";

interface Author{
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
}
function formatDateEn(dateIso: string) {
    const d = new Date(dateIso);
    return Number.isNaN(d.getTime())
        ? dateIso
        : d.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" });
}

export default function AuthorCard({   id,
                                       name,
                                       birthDate,
                                       description,
                                       image,
                                   }: Author) {
    const {authors, setAuthors, selectAuthor, favoriteAuthors, toggleFavorite} = useAuthors()
    const [isFav, setIsFav] = useState(false);
    const [imgSrc, setImgSrc] = useState(image);
    const checkFavorite = () => {
        return favoriteAuthors.some((a:number) => a === id)
    }
    function deleteAuthor(){
        const authorsDelete =  authors.filter(item => item.id !== id)
        setAuthors(authorsDelete);
    }

    useEffect(() => {
        setImgSrc(image);
    }, [image]);

    useEffect(() => {
        setIsFav(checkFavorite());
    }, [toggleFavorite]);

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <button
                className={`${isFav ? 'bg-yellow-400' : 'bg-gray-600'} text-2xl text-right px-5 py-1  ${isFav ? 'hover:bg-gray-600' : 'hover:bg-yellow-400'}`}
                onClick={() => toggleFavorite(id)}
            >
                ★
            </button>
            <div className="relative overflow-hidden bg-neutral-100">
                <div className="pt-[100%]" />
                <Image
                    src={imgSrc}
                    alt={name}
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    onError={() => {
                        if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER);
                    }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold text-neutral-900">{name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{formatDateEn(birthDate)}</p>
                <p className="mt-3 text-sm text-neutral-700">{description}</p>
                <button
                    type="button"
                    onClick={()=>(
                        selectAuthor({
                            id,
                            name,
                            birthDate,
                            description,
                            image,
                        })
                    )}
                    className={`flex w-fit mx-auto my-3 items-center rounded-xl px-10 py-2 
        bg-blue-400 hover:bg-blue-700`}
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={deleteAuthor}
                    className={`flex w-fit mx-auto my-3 items-center rounded-xl px-10 py-2 
        bg-red-600 hover:bg-red-700`}
                >
                    Delete
                </button>
            </div>


        </article>
    );
}
