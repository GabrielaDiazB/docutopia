import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@rhino-ui/ui";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

type StringCollapsibleProps = {
	id: number;
	onDelete: (id: number) => void;
	hasOptions?: boolean;
	options?: string[];
};

export const StringCollapsible = ({
	id,
	onDelete,
	hasOptions = false,
	options = [],
}: StringCollapsibleProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="border rounded-lg bg-white mb-4"
		>
			<div className="flex items-center justify-between space-x-4 pl-4 pr-2 py-2">
				<CollapsibleTrigger asChild>
					<div className="flex justify-between items-center w-full cursor-pointer">
						<h4 className="text-sm font-medium">STRING</h4>
						<div>
							<Button
								variant="ghost"
								size="sm"
								className="w-9 p-0"
								onClick={() => onDelete(id)}
							>
								<Trash className="h-4 w-4 text-destructive" />
								<span className="sr-only">Delete</span>
							</Button>
							<Button variant="ghost" size="sm" className="w-9 p-0">
								<Plus className="h-4 w-4 text-muted-foreground" />
								<span className="sr-only">Toggle</span>
							</Button>
						</div>
					</div>
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent>
				<div className="px-4 py-4 text-sm border-t">
					{hasOptions ? (
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{options.map((option, index) => (
										<SelectItem
											key={`option-${option.replace(" ", "-")}`}
											value={option}
										>
											{option}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					) : (
						<Input id="" className="border bg-white" type="text" />
					)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};
