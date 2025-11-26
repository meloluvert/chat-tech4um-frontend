    "use client";

    import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogClose
    } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Textarea } from "@/components/ui/textarea";
    import { useState } from "react";

    type CreateForumModalProps = {
    children: React.ReactNode;
    };

    export default function CreateForumModal({ children }: CreateForumModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleCreate() {
        if (!title.trim()) return;

        console.log({
        title,
        description
        });

        setTitle("");
        setDescription("");
    }

    return (
        <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="max-w-sm">
            <DialogHeader>
            <DialogTitle className="text-[#1772B2]">Criar novo fórum</DialogTitle>
            <DialogDescription className="text-gray-600">
                Dê um título e uma breve descrição.
            </DialogDescription>
            </DialogHeader>

            {/* Form */}
            <div className="flex flex-col gap-4 mt-2">
            <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                placeholder="Nome do fórum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                placeholder="Descrição breve..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <DialogClose asChild>
                <Button
                onClick={handleCreate}
                style={{ backgroundColor: "#1772B2" }}
                className="text-white hover:opacity-90"
                >
                Criar Fórum
                </Button>
            </DialogClose>
            </div>
        </DialogContent>
        </Dialog>
    );
    }
