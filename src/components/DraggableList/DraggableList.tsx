import {
    closestCorners,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {restrictToParentElement} from '@dnd-kit/modifiers';
import DraggableListItem from './DraggableListItem/DraggableListItem';
import {FC, ReactNode} from "react";

type DraggableListProps = {
    data: any,
    classNameList?: string,
    renderItemContent: (item:any,index:any)=>ReactNode, //TODO разобраться с типом
    onDragEnd: (event:DragEndEvent) => void , //TODO разобраться с типом
    withDragHandle?: boolean,
}

const DraggableList: FC<DraggableListProps> = ({
                                                   data,
                                                   classNameList,
                                                   renderItemContent,
                                                   onDragEnd,
                                                   withDragHandle = false,
                                               }) => {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            collisionDetection={closestCorners}
            modifiers={[restrictToParentElement]}
        >
            <ul className={classNameList}>
                <SortableContext
                    items={data}
                    strategy={verticalListSortingStrategy}
                >
                    {data.map((item, index) => (
                        <DraggableListItem
                            key={item?.id || index}
                            index={item?.id || index}
                            withDragHandle={withDragHandle}
                        >
                            {renderItemContent && renderItemContent(item, index)}
                        </DraggableListItem>
                    ))}
                </SortableContext>
            </ul>
        </DndContext>
    );
};

export default DraggableList;
