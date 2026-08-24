import React, { useRef, useState } from 'react';

interface EditableElementProps {
  element: any;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

const EditableElement: React.FC<EditableElementProps> = ({ element, onUpdate, onDelete }) => {
  const [tool, setTool] = useState<'move' | 'resize' | 'rotate'>('move');
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const rotateRef = useRef<{ startX: number; startY: number; origRotation: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool === 'move') {
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
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else if (tool === 'rotate') {
      rotateRef.current = { startX: e.clientX, startY: e.clientY, origRotation: element.rotation };
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!rotateRef.current) return;
        const dx = moveEvent.clientX - rotateRef.current.startX;
        onUpdate(element.id, { rotation: rotateRef.current.origRotation + dx / 2 });
      };
      const handleMouseUp = () => {
        rotateRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else if (tool === 'resize') {
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: element.width,
        origY: element.height,
      };
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = moveEvent.clientX - dragRef.current.startX;
        const dy = moveEvent.clientY - dragRef.current.startY;
        onUpdate(element.id, { width: dragRef.current.origX + dx, height: dragRef.current.origY + dy });
      };
      const handleMouseUp = () => {
        dragRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
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
        border: '2px solid #007bff',
        cursor: tool === 'move' ? 'move' : (tool === 'rotate' ? 'grab' : 'nwse-resize'),
        zIndex: 100,
        userSelect: 'none',
        background: element.type === 'text' ? 'rgba(255,255,255,0.1)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Ferramentas do elemento */}
      <div style={{ position: 'absolute', top: -30, left: 0, display: 'flex', gap: 5 }}>
        <button onClick={(e) => { e.stopPropagation(); setTool('move'); }} style={toolBtnStyle(tool === 'move')}>↔️</button>
        <button onClick={(e) => { e.stopPropagation(); setTool('resize'); }} style={toolBtnStyle(tool === 'resize')}>↗️</button>
        <button onClick={(e) => { e.stopPropagation(); setTool('rotate'); }} style={toolBtnStyle(tool === 'rotate')}>🔄</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(element.id); }} style={toolBtnStyle(false, true)}>X</button>
      </div>

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
    </div>
  );
};

const toolBtnStyle = (isActive: boolean, isDelete = false) => ({
  background: isDelete ? 'red' : (isActive ? '#007bff' : '#fff'),
  color: isDelete ? 'white' : (isActive ? 'white' : '#333'),
  border: '1px solid #ccc',
  borderRadius: '3px',
  padding: '2px 4px',
  fontSize: '12px',
  cursor: 'pointer',
});

export default EditableElement;
