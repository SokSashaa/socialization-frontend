import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import DraggableListItem from './DraggableListItem/DraggableListItem';

const DraggableList = ({
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
