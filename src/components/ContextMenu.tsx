import { useEffect, useRef } from 'react';
import { Plus, Edit3, Trash2, Copy, Clipboard, ListTree } from 'lucide-react';
import { ContextMenuPosition } from '@/types/todo';

interface ContextMenuProps {
  position: ContextMenuPosition;
  onClose: () => void;
  onAddTask: () => void;
  onAddSubTask?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: () => void;
  onPaste: () => void;
  hasCopiedTask: boolean;
  isSubTask: boolean;
}

const ContextMenu = ({
  position,
  onClose,
  onAddTask,
  onAddSubTask,
  onEdit,
  onDelete,
  onCopy,
  onPaste,
  hasCopiedTask,
  isSubTask,
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    { icon: Plus, label: 'إضافة مهمة جديدة', action: onAddTask, show: true },
    { icon: ListTree, label: 'إضافة مهمة فرعية', action: onAddSubTask, show: !isSubTask && onAddSubTask },
    { icon: Edit3, label: 'تعديل', action: onEdit, show: true },
    { icon: Copy, label: 'نسخ', action: onCopy, show: true },
    { icon: Clipboard, label: 'لصق', action: onPaste, show: hasCopiedTask },
    { icon: Trash2, label: 'حذف', action: onDelete, show: true, danger: true },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] bg-popover border-2 border-border rounded-lg shadow-2xl py-1 min-w-[200px] animate-fade-in backdrop-blur-sm"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {menuItems.map((item, index) => {
        if (!item.show) return null;
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => {
              item.action?.();
              onClose();
            }}
            className={`w-full px-4 py-2.5 text-right flex items-center gap-3 transition-smooth hover:bg-secondary ${
              item.danger ? 'text-destructive hover:bg-destructive/10' : 'text-foreground'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
