"use client";
import React from "react";

type ModalProps = {
    open: boolean;
    children: React.ReactNode;
};

export default function Modal({ open, children}: ModalProps) {
    if (!open) return null;
    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
        >
            <div
                className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg"
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-lg font-semibold text-neutral-800">Author Edit</h2>
                <div>{children}</div>
            </div>
        </div>
    );
}
