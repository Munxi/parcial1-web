"use client"
import {useAuthors} from "@/components/AuthorContext";
import {useEffect, useState} from "react";
import AuthorCard from "@/components/AuthorCard"
import Modal from "@/components/Modal";
import Form from "@/components/Form";
interface Author{
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
}


export default function Page(){
    const {favoriteAuthors, toggleFavorite, authors, selectedAuthor} = useAuthors()
    const [authorsFavorite, setAuthorsFavorite] = useState<Author[]>([])
    useEffect(() => {
        setAuthorsFavorite((authors.filter((a: Author) =>
            favoriteAuthors.some((id:number) => a.id === id))))
    }, [toggleFavorite]);
    return (
        <main className="min-h-screen bg-neutral-50 py-10">
            <div className="mx-auto max-w-7xl px-4">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Favorite Authors
                    </h1>
                </header>
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {authorsFavorite.map((a) => (
                        <AuthorCard key={a.id} {...a} />
                    ))}
                </section>
                <Modal open={!!selectedAuthor}>
                    {!!selectedAuthor && (
                        <Form
                            initAuthor={selectedAuthor}
                        />
                    )}
                </Modal>
            </div>
        </main>
    );
}