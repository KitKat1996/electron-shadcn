import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/utils/tailwind"


// Sample folder structure data
const folderStructure = [
  {
    name: "Project",
    type: "folder",
    children: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "components",
            type: "folder",
            children: [
              { name: "button.tsx", type: "file" },
              { name: "card.tsx", type: "file" },
              { name: "input.tsx", type: "file" },
            ],
          },
          {
            name: "pages",
            type: "folder",
            children: [
              { name: "index.tsx", type: "file" },
              { name: "about.tsx", type: "file" },
              { name: "contact.tsx", type: "file" },
            ],
          },
          {
            name: "utils",
            type: "folder",
            children: [
              { name: "helpers.ts", type: "file" },
              { name: "constants.ts", type: "file" },
            ],
          },
        ],
      },
      {
        name: "public",
        type: "folder",
        children: [
          { name: "favicon.ico", type: "file" },
          { name: "logo.svg", type: "file" },
        ],
      },
    ],
  },
]

export function FolderTree() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  return (

      <div className="space-y-1">
        {folderStructure.map((item, index) => (
          <TreeItem key={index} item={item} level={0} activeItem={activeItem} setActiveItem={setActiveItem} />
        ))}
      </div>
  )
}

type TreeItemProps = {
  item: {
    name: string
    type: "file" | "folder"
    children?: Array<{
      name: string
      type: "file" | "folder"
      children?: any[]
    }>
  }
  level: number
  activeItem: string | null
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>
}

function TreeItem({ item, level, activeItem, setActiveItem }: TreeItemProps) {
  const isActive = activeItem === item.name
  const paddingLeft = level * 12 // Increase indentation for each level

  if (item.type === "file") {
    return (
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md text-sm",
          "hover:bg-accent hover:text-accent-foreground cursor-pointer",
          isActive && "bg-accent text-accent-foreground font-medium",
        )}
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
        onClick={() => setActiveItem(item.name)}
      >
        <File className="h-4 w-4 mr-2 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
      </div>
    )
  }

  return (
    <Collapsible defaultOpen={level === 0} className="w-full">
      <CollapsibleTrigger className="w-full">
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md text-sm w-full",
            "hover:bg-accent hover:text-accent-foreground cursor-pointer",
          )}
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
        >
          <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          <Folder className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
          <span className="truncate">{item.name}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-1">
          {item.children?.map((child, index) => (
            <TreeItem
              key={index}
              item={child}
              level={level + 1}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

