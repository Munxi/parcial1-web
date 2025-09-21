import Form from "@/components/Form"

export default function Create() {
    return (
        <main className="min-h-screen bg-neutral-50 py-10">
            <div className="mx-auto max-w-7xl px-4">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Create an Author
                    </h1>
                </header>
             <Form></Form>
            </div>
        </main>
    );
}
