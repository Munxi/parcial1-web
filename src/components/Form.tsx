"use client";
import {useState} from "react";
import {useAuthors} from "@/components/AuthorContext";

type Author = {
    id: number;
    name: string; 
    birthDate: string; 
    description: string; 
    image: string;      
};

type FormErrors = Partial<Record<keyof Author, string>>;
type Touched = Partial<Record<keyof Author, boolean>>;

const initialData: Author = {
    id: -1,
    name: "",
    birthDate: "",
    description: "",
    image: "",
};
type FormProps = {
    initAuthor?: Author | null;
}

export default function Form({initAuthor}: FormProps) {
    const {authors, setAuthors,selectAuthor} = useAuthors()
    const [data, setData] = useState<Author>(initAuthor ? initAuthor : initialData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Touched>({});

    const validateField = (field: keyof Author, value: string|number): string => {
        if(typeof value === "string") {
            if (!value || value.trim() === "") return "This field is required.";
        }
        return "";
    };

    const handleBlur = (field: keyof Author) => {
        setTouched((t) => ({ ...t, [field]: true }));
        const msg = validateField(field, data[field]);
        setErrors((e) => ({ ...e, [field]: msg }));
    };

    const handleChange = (field: keyof Author, value: string) => {
        setData((d) => {
            return {...d, [field]: value};
        });
    };
    const addAuthor = (authors: Author[], newAuthor: Author) => {
        if(newAuthor.id === -1) {
            const maxId = authors.reduce((max, a) => (a.id > max ? a.id : max), -1)
            const newAuthorFinal: Author = {...newAuthor,id:maxId+1};
            setAuthors([...authors, newAuthorFinal]);
        }
        else{
            setAuthors(authors.map(a=>(a.id==newAuthor.id? newAuthor : a)));
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addAuthor(authors,data);
        selectAuthor(null);
        setData(initialData); 
        setErrors({}); 
        setTouched({});
    };

    const isFormValid =
        data.name.trim() &&
        data.birthDate.trim() &&
        data.description.trim() &&
        data.image.trim() &&
        !Object.values(errors).some(Boolean);

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-neutral-900"            aria-describedby="form-help"
        >
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
                    Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="e.g., Gabriel García Márquez"
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                />
                {touched.name && errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-neutral-800">
                    Birth date
                </label>
                <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    required
                    autoComplete="bday"
                    value={data.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                    onBlur={() => handleBlur("birthDate")}
                    aria-required="true"
                    aria-invalid={Boolean(errors.birthDate)}
                    aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                />
                {touched.birthDate && errors.birthDate && (
                    <p id="birthDate-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors.birthDate}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-800">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={data.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    onBlur={() => handleBlur("description")}
                    aria-required="true"
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? "description-error" : undefined}
                    rows={4}
                    placeholder="Short bio or summary…"
                    className="mt-1 w-full resize-y rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                />
                {touched.description && errors.description && (
                    <p id="description-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors.description}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="image" className="block text-sm font-medium text-neutral-800">
                    Image (URL)
                </label>
                <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    autoComplete="url"
                    value={data.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    onBlur={() => handleBlur("image")}
                    aria-required="true"
                    aria-invalid={Boolean(errors.image)}
                    aria-describedby={errors.image ? "image-error" : "image-hint"}
                    placeholder="https://…/author.jpg"
                    className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                />
                {touched.image && errors.image && (
                    <p id="image-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors.image}
                    </p>
                )}
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
