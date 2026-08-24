import React, { useRef } from 'react';

interface EditableElementProps {
  element: any;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

const EditableElement: React.FC<EditableElementProps> = ({ element, onUpdate, onDelete }) => {
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: element.x,
      origY: element.y,
    };
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      onUpdate(element.id, { x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
      window.removeEventListener('mouseMove', handleMouseMove);
      window.removeEventListener('mouseUp', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleResize = (e: React.MouseEvent, direction: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left') => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const origWidth = element.width;
    const origHeight = element.height;
    const origX = element.x;
    const origY = element.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (direction === 'bottom-right') {
        onUpdate(element.id, { width: origWidth + dx, height: origHeight + dy });
      } else if (direction === 'bottom-left') {
        onUpdate(element.id, { width: origWidth - dx, height: origHeight + dy, x: origX + dx });
      } else if (direction === 'top-right') {
        onUpdate(element.id, { width: origWidth + dx, height: origHeight - dy, y: origY + dy });
      } else if (direction === 'top-left') {
        onUpdate(element.id, { width: origWidth - dx, height: origHeight - dy, x: origX + dx, y: origY + dy });
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation}deg)`,
        opacity: element.opacity,
        border: '2px dashed #007bff',
        cursor: 'move',
        zIndex: 100,
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{ width: '100%', textAlign: element.align }}>
        {element.type === 'text' && (
          <textarea
            value={element.content}
            onChange={(e) => onUpdate(element.id, { content: e.target.value })}
            style={{
              width: '100%',
              height: '100%',
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
          <img src={element.content} alt="img" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        )}
      </div>

      <div
        onMouseDown={(e) => handleResize(e, 'bottom-right')}
        style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, background: 'blue', cursor: 'nwse-resize' }}
      />
      <div
        onMouseDown={(e) => handleResize(e, 'bottom-left')}
        style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12, background: 'blue', cursor: 'nesw-resize' }}
      />
      <div
        onMouseDown={(e) => handleResize(e, 'top-right')}
        style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, background: 'blue', cursor: 'nesw-resize' }}
      />
      <div
        onMouseDown={(e) => handleResize(e, 'top-left')}
        style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, background: 'blue', cursor: 'nwse-resize' }}
      />

      <button
        onClick={() => onDelete(element.id)}
        style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer' }}
      >
        X
      </button>
    </div>
  );
};

export default EditableElement;
