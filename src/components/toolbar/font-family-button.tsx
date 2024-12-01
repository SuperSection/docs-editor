import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FontFamilyButton = () => {
	const { editor } = useEditorStore();

	const fonts = [
		{ label: "Arial", value: "Arial" },
		{ label: "Helvetica", value: "Helvetica" },
		{ label: "Times New Roman", value: "Times New Roman" },
		{ label: "Courier New", value: "Courier New" },
		{ label: "Verdana", value: "Verdana" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Palatino", value: "Palatino" },
		{ label: "Garamond", value: "Garamond" },
		{ label: "Bookman", value: "Bookman" },
		{ label: "Comic Sans MS", value: "Comic Sans MS" },
		{ label: "Trebuchet MS", value: "Trebuchet MS" },
		{ label: "Arial Black", value: "Arial Black" },
		{ label: "Impact", value: "Impact" },
		{ label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
		{ label: "Tahoma", value: "Tahoma" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="text-sm h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
					<span className="truncate">
						{editor?.getAttributes("textStyle").fontFamily || "Arial"}
					</span>
					<ChevronDownIcon className="ml-2 size-4 shrink-0" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-1 flex flex-col gap-y-1">
				{fonts.map(({ label, value }) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn(
							"flex items-center px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							editor?.getAttributes("textStyle").fontFamilt === value &&
								"bg-neutral-200/80"
						)}
						style={{ fontFamily: value }}
					>
						<span className="text-sm">{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
