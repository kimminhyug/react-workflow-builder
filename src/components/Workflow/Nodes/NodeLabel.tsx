import { Icon } from '../../common/UI';

interface INodeLabelProps {
  label: string;
  iconName: string;
}
export const NodeLabel: React.FC<INodeLabelProps> = ({ label, iconName }) => {
  return (
    <div className="label">
      <Icon iconName={iconName} /> {label}
    </div>
  );
};
