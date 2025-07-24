/**
 * 서브 라벨 붙이는 용
 * @param label 메인 라벨
 * @param subText (서브 텍스트) 없을 경우 소괄호도 삭제
 * @returns label(subLabel)
 */
export const AppendSubText = ({ label, subText }: { label: string; subText?: string }) => {
  return <>{subText ? `${label}(${subText})` : label}</>;
};
