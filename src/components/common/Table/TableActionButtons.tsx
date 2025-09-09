import { IconButton } from '../UI/Buttons/IconButton';

interface ITableActionButtonProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

// 폰트 및 스타일 수정 필요
export const TableActionButtons = ({ onEdit, onDelete }: ITableActionButtonProps) => (
  <div className="flex gap-2">
    {onEdit && <IconButton icon="Edit" title="수정" onClick={onEdit} />}
    {onDelete && <IconButton icon="Delete" title="삭제" onClick={onDelete} />}
  </div>
);
