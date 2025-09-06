import { IconButton } from '@fluentui/react';

interface ITableActionButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

// 폰트 및 스타일 수정 필요
export const TableActionButtons = ({ onEdit, onDelete }: ITableActionButtonProps) => (
  <div className="flex gap-2">
    {onEdit && <IconButton iconProps={{ iconName: 'Edit' }} title="수정" onClick={onEdit} />}
    {onDelete && <IconButton iconProps={{ iconName: 'Delete' }} title="삭제" onClick={onDelete} />}
  </div>
);
