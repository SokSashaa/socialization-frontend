import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Bars3Icon} from '@heroicons/react/16/solid';
import {FC, ReactNode} from "react";

type DraggableListItemProps = {
    index: number,
    withDragHandle: boolean,
    children: ReactNode
}
const DraggableListItem: FC<DraggableListItemProps> = ({index, withDragHandle, children}) => {
    const {attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging} =
        useSortable({resizeObserverConfig:{} , id: index});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.6 : 1,
    };

    return withDragHandle ? (
        <li
            className="relative"
            ref={setNodeRef}
            style={style}
        >
            <div
                {...attributes}
                {...listeners}
                className="group absolute left-0 right-0 z-10 cursor-move touch-none pt-1"
            >
                <Bars3Icon className="invisible m-auto h-4 w-4 stroke-gray-300 group-hover:visible"/>
            </div>
            {children}
        </li>
    ) : (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {children}
        </li>
    );
};

export default DraggableListItem;
