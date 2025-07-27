import type {ReactNode} from "react";

export function AdminAuthFormLayout({
    title,
    children,
}: {
    title: string;
    children: ReactNode
}) {
    return (
        <div className="w-full max-w-sm mx-auto p-8 bg-white rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
            {children}
        </div>
    );
}