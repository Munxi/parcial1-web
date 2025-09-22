"use client"
import React, { createContext, useContext, useState } from "react";

interface Author{
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
}

type AuthorsContextType = {
    authors: Author[];
    setAuthors: (authors: Author[]) => void;
    favoriteAuthors: number[];
    toggleFavorite: (author: number) => void;
    fetchAuthors: () => Promise<Author[]>;
    fetchedAuthors: boolean;
    selectedAuthor: Author | null;
    selectAuthor: (author: Author | null) => void;
};

const AuthorsContext = createContext<AuthorsContextType | null>(null);
export function AuthorsProvider({ children } : {children:React.ReactNode}){
    const [favoriteAuthors, setFavoriteAuthors] = useState<number[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [fetchedAuthors, setFetchedAuthors] = useState(false);
    const [selectedAuthor,selectAuthor] = useState<Author|null>(null);
    const toggleFavorite = (id: number) => {
         if(favoriteAuthors.some((a:number) => a === id)){
            setFavoriteAuthors(favoriteAuthors.filter((a: number) => a !== id));
         }
         else{
             setFavoriteAuthors(favoriteAuthors.concat(id))
         }
    }
    const fetchAuthors = async () => {
        const res = await fetch("http://localhost:8080/api/authors");
        if (!res.ok) throw new Error("Can't fetch authors");
        setFetchedAuthors(true);
        return (await res.json()) as Author[];
    };

    return (
        <AuthorsContext.Provider value={{ authors,fetchAuthors,setAuthors,fetchedAuthors,selectedAuthor,selectAuthor,favoriteAuthors,toggleFavorite}}>
            {children}
        </AuthorsContext.Provider>
    );
}

export const useAuthors = () => {
    const ctx = useContext(AuthorsContext);
    if (!ctx) throw new Error("useAuthors debe usarse dentro de <AuthorsProvider>");
    return ctx;
};
