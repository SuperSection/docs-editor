"use client";

import { useState } from "react";
import {
	BoldIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useEditorStore } from "@/store/use-editor-store";
import { FontFamilyButton } from "@/components/toolbar/font-family-button";
import { HeadingLevelButton } from "@/components/toolbar/heading-level-button";

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton = ({
	onClick,
	isActive,
	icon: Icon,
}: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
				isActive && "bg-neutral-300/80 hover:bg-neutral-300"
			)}
		>
			<Icon className="size-4" />
		</button>
	);
};

export const Toolbar = () => {
	const { editor } = useEditorStore();

	const [isSpellcheckActive, setIsSpellcheckActive] = useState(true);

	const toggleSpellcheck = () => {
		const current = editor?.view.dom.getAttribute("spellcheck");
		const newSpellcheckValue = current === "false" ? "true" : "false";
		editor?.view.dom.setAttribute("spellcheck", newSpellcheckValue);
		setIsSpellcheckActive(newSpellcheckValue === "true");
	};

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: "Spell Check",
				icon: SpellCheckIcon,
				onClick: toggleSpellcheck,
				isActive: isSpellcheckActive,
			},
		],
		[
			{
				label: "Bold",
				icon: BoldIcon,
				onClick: () => editor?.chain().focus().toggleBold().run(),
				isActive: editor?.isActive("bold"),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				onClick: () => editor?.chain().focus().toggleItalic().run(),
				isActive: editor?.isActive("italic"),
			},
			{
				label: "Underline",
				icon: UnderlineIcon,
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
				isActive: editor?.isActive("underline"),
			},
		],
		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => console.log("TODO: Comment"),
				isActive: false, // TODO: Enable this functionality
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto print:hidden">
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<FontFamilyButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			<HeadingLevelButton />
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Font size */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
			{/* TODO: Text color */}
			{/* TODO: Highlight color */}
			<Separator orientation="vertical" className="h-6 bg-neutral-300" />
			{/* TODO: Link */}
			{/* TODO: Image */}
			{/* TODO: Align */}
			{/* TODO: Line height */}
			{/* TODO: List */}
			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};
