import AppLayout from "@/layout/AppLayout";

export default function LegalPageShell({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-tight">
                    {title}
                </h1>
                <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:first:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
                    {children}
                </div>
            </div>
        </AppLayout>
    );
}
