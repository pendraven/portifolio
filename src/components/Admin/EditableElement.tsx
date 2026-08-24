import React from 'react';
import { Rnd } from 'react-rnd';

interface EditableElementProps {
  element: any;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  isBook?: boolean;
}

const EditableElement: React.FC<EditableElementProps> = ({ element, onUpdate, onDelete, isBook }) => {
  return (
    <Rnd
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      onDragStop={(e, d) => onUpdate(element.id, { x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate(element.id, {
          width: ref.style.width,
          height: ref.style.height,
          ...position,
        });
      }}
      style={{
        border: '2px dashed #007bff',
        background: element.type === 'text' ? 'transparent' : '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        transform: `rotate(${element.rotation}deg)`,
        opacity: element.opacity,
        zIndex: 100,
      }}
    >
      <div style={{ width: '100%', textAlign: element.align }}>
        {element.type === 'text' && (
          <textarea
            value={element.content}
            onChange={(e) => onUpdate(element.id, { content: e.target.value })}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontFamily: element.fontFamily,
              fontSize: element.fontSize,
              color: element.color,
              textAlign: element.align,
              resize: 'none',
              outline: 'none',
            }}
          />
        )}
        {element.type === 'image' && (
          <img src={element.content} alt="img" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        )}
      </div>
      <button
        onClick={() => onDelete(element.id)}
        style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer' }}
      >
        X
      </button>
    </Rnd>
  );
};

export default EditableElement;