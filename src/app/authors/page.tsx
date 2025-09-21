"use client"
import {useAuthors} from "@/components/AuthorContext";
import {useEffect} from "react";
import AuthorCard from "@/components/AuthorCard"
import Modal from "@/components/Modal";
import Form from "@/components/Form"


export default function Page(){
    const {authors, setAuthors,fetchAuthors, fetchedAuthors, selectedAuthor} = useAuthors()

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAuthors();
                if (!fetchedAuthors) setAuthors(data);
            } catch (err) {
                console.error("Error while loading authors:", err);
            }
        })();

        return () => {
        };
    }, [fetchAuthors, fetchedAuthors, setAuthors]);
    return (
        <main className="min-h-screen bg-neutral-50 py-10">
            <div className="mx-auto max-w-7xl px-4">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Authors
                    </h1>
                </header>
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {authors.map((a) => (
                        <AuthorCard key={a.id} {...a} />
                    ))}
                </section>
            </div>

            <Modal open={!!selectedAuthor}>
                {!!selectedAuthor && (
                    <Form
                        initAuthor={selectedAuthor}
                    />
                )}
            </Modal>
        </main>
    );
}